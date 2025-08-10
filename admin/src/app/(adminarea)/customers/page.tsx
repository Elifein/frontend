'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, Mail, CheckCircle, Loader2, Trash2, ArrowUpDown } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Badge } from '../../../components/ui/badge';
import { Checkbox } from '../../../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import axiosInstance from '../../../lib/axiosInstance';
import { toast } from 'sonner';

// Type definitions based on API response
interface User {
  user_id: string;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
}

interface EndUsersStats {
  verified_users_count: number;
  verified_users: User[];
}

interface ApiResponse {
  status: number;
  data: EndUsersStats;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make API call
      const response = await axiosInstance.get('/endusers-stats/');
      console.log('API Response:', response); // Debug: Log full response

      // Handle [status, data] response structure
      const responseData = response.data;
      if (!Array.isArray(responseData) || responseData.length < 2) {
        throw new Error('Invalid API response format: Expected [status, data]');
      }

      const [status, data] = responseData;
      console.log('Status:', status, 'Data:', data); // Debug: Log status and data

      if (status !== 200) {
        throw new Error(`API request failed with status: ${status}`);
      }

      // Ensure verified_users is an array, fallback to empty array if undefined
      const verifiedUsers = Array.isArray(data?.verified_users)
        ? data.verified_users
        : [];
      console.log('Verified Users:', verifiedUsers); // Debug: Log verified users

      setUsers(verifiedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch users';
      setError(errorMessage);
      toast.error(errorMessage);
      setUsers([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = Array.isArray(users) ? users.filter((user) => {
    const matchesSearch =
      `${user.user_firstname} ${user.user_lastname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.user_id.toLowerCase().includes(searchQuery.toLowerCase());

    // Since all users are verified, only apply status filter if explicitly set to 'verified'
    const matchesStatus = statusFilter === 'all' || statusFilter === 'verified';

    return matchesSearch && matchesStatus;
  }) : [];

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.user_id));
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the user
    console.log(`Deleting user: ${userToDelete}`);
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleBulkDelete = () => {
    // In a real app, you would call an API to delete multiple users
    console.log(`Deleting users: ${selectedUsers.join(', ')}`);
    setSelectedUsers([]);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchUsers}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage your verified user database</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Verification Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" className="h-10 w-10">
          <Filter className="h-4 w-4" />
          <span className="sr-only">More filters</span>
        </Button>
      </div>

      {selectedUsers.length > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-md bg-muted p-2">
          <span className="text-sm">
            {selectedUsers.length} {selectedUsers.length === 1 ? 'user' : 'users'} selected
          </span>
          <Button variant="outline" size="sm" onClick={handleBulkDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      )}

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all users"
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  User
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Verification Status</TableHead>
              {/* <TableHead className="text-right">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No verified users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.user_id)}
                      onCheckedChange={() => toggleUserSelection(user.user_id)}
                      aria-label={`Select ${user.user_firstname} ${user.user_lastname}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {user.user_firstname} {user.user_lastname}
                    </div>
                    {/* <div className="text-sm text-muted-foreground">
                      {user.user_id}
                    </div> */}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.user_email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Verified
                    </Badge>
                  </TableCell>
                  {/* <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteUser(user.user_id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to{' '}
          <strong>{filteredUsers.length}</strong> of{' '}
          <strong>{users.length}</strong> verified users
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the user and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
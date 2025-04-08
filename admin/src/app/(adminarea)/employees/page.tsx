'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  PhoneIcon,
  Shield,
  Calendar,
  ArrowUpDown,
  UserPlus,
  Key,
} from 'lucide-react';

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
import { Label } from '../../../components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Switch } from '../../../components/ui/switch';

// Sample employees data
const employees = [
  {
    id: 'EMP-001',
    name: 'John Anderson',
    email: 'john.anderson@example.com',
    phone: '(555) 123-4567',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Admin',
    department: 'Management',
    status: 'Active',
    dateJoined: '2022-03-15',
    permissions: ['all'],
  },
  {
    id: 'EMP-002',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '(555) 234-5678',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Manager',
    department: 'Sales',
    status: 'Active',
    dateJoined: '2022-05-10',
    permissions: ['products', 'orders', 'customers'],
  },
  {
    id: 'EMP-003',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    phone: '(555) 345-6789',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Staff',
    department: 'Support',
    status: 'Active',
    dateJoined: '2022-08-22',
    permissions: ['orders', 'customers'],
  },
  {
    id: 'EMP-004',
    name: 'Sarah Johnson',
    email: 'sjohnson@example.com',
    phone: '(555) 456-7890',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Staff',
    department: 'Warehouse',
    status: 'Active',
    dateJoined: '2023-01-05',
    permissions: ['products', 'orders'],
  },
  {
    id: 'EMP-005',
    name: 'David Kim',
    email: 'dkim@example.com',
    phone: '(555) 567-8901',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Manager',
    department: 'Marketing',
    status: 'Inactive',
    dateJoined: '2022-06-15',
    permissions: ['products', 'customers', 'marketing'],
  },
  {
    id: 'EMP-006',
    name: 'Lisa Patel',
    email: 'lpatel@example.com',
    phone: '(555) 678-9012',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Staff',
    department: 'Finance',
    status: 'Active',
    dateJoined: '2022-11-08',
    permissions: ['orders', 'finance'],
  },
];

// Available roles
const roles = [
  { id: 'admin', name: 'Admin', description: 'Full access to all systems' },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Manage specific departments',
  },
  {
    id: 'staff',
    name: 'Staff',
    description: 'Limited access based on job function',
  },
];

// Available departments
const departments = [
  'Management',
  'Sales',
  'Marketing',
  'Support',
  'Warehouse',
  'Finance',
  'IT',
];

// Available permissions
const permissions = [
  { id: 'all', name: 'Full Access', description: 'Access to all features' },
  {
    id: 'products',
    name: 'Products',
    description: 'Manage products and inventory',
  },
  { id: 'orders', name: 'Orders', description: 'Process and manage orders' },
  {
    id: 'customers',
    name: 'Customers',
    description: 'Access customer information',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Manage marketing campaigns',
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Access financial information',
  },
  { id: 'reports', name: 'Reports', description: 'View and generate reports' },
];

export default function EmployeesPage() {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'staff',
    department: '',
    permissions: [] as string[],
    sendInvite: true,
    temporaryPassword: true,
  });

  const filteredEmployees = employees.filter((employee) => {
    // Search filter
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Role filter
    const matchesRole =
      roleFilter === 'all' ||
      employee.role.toLowerCase() === roleFilter.toLowerCase();

    // Department filter
    const matchesDepartment =
      departmentFilter === 'all' || employee.department === departmentFilter;

    // Status filter
    const matchesStatus =
      statusFilter === 'all' ||
      employee.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });

  const toggleEmployeeSelection = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map((employee) => employee.id));
    }
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployeeToDelete(employeeId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the employee
    console.log(`Deleting employee: ${employeeToDelete}`);

    // Close dialog and reset state
    setIsDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const handleBulkDelete = () => {
    // In a real app, you would call an API to delete multiple employees
    console.log(`Deleting employees: ${selectedEmployees.join(', ')}`);
    setSelectedEmployees([]);
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would call an API to add the employee
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and close dialog
      setNewEmployee({
        name: '',
        email: '',
        phone: '',
        role: 'staff',
        department: '',
        permissions: [],
        sendInvite: true,
        temporaryPassword: true,
      });
      setIsAddEmployeeDialogOpen(false);
    } catch (err) {
      console.error('Failed to add employee', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionChange = (permissionId: string) => {
    setNewEmployee((prev) => {
      // If "all" is selected, clear other permissions
      if (permissionId === 'all') {
        return {
          ...prev,
          permissions: prev.permissions.includes('all') ? [] : ['all'],
        };
      }

      // If another permission is selected, remove "all" if it exists
      const newPermissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions.filter((id) => id !== 'all'), permissionId];

      return {
        ...prev,
        permissions: newPermissions,
      };
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-muted-foreground">
            Manage your team members and their access
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employees..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button onClick={() => setIsAddEmployeeDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>

        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedEmployees.length > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-md bg-muted p-2">
          <span className="text-sm">
            {selectedEmployees.length}{' '}
            {selectedEmployees.length === 1 ? 'employee' : 'employees'} selected
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
                  checked={
                    selectedEmployees.length === filteredEmployees.length &&
                    filteredEmployees.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all employees"
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Employee
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Department</TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedEmployees.includes(employee.id)}
                      onCheckedChange={() =>
                        toggleEmployeeSelection(employee.id)
                      }
                      aria-label={`Select ${employee.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={employee.avatar}
                          alt={employee.name}
                        />
                        <AvatarFallback>
                          {employee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{employee.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant={
                        employee.role === 'Admin'
                          ? 'default'
                          : employee.role === 'Manager'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {employee.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {employee.department}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{employee.dateJoined}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        employee.status === 'Active' ? 'default' : 'secondary'
                      }
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/employees/${employee.id}`}
                            className="flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/employees/${employee.id}/permissions`}
                            className="flex items-center"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Permissions
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/employees/${employee.id}/reset-password`}
                            className="flex items-center"
                          >
                            <Key className="mr-2 h-4 w-4" />
                            Reset Password
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to{' '}
          <strong>{filteredEmployees.length}</strong> of{' '}
          <strong>{employees.length}</strong> employees
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this employee?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove the
              employee account and revoke all access.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Employee Dialog */}
      <Dialog
        open={isAddEmployeeDialogOpen}
        onOpenChange={setIsAddEmployeeDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Create a new employee account and set their role and permissions.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddEmployee}>
            <Tabs defaultValue="details" className="mt-2">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="role">Role & Department</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newEmployee.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sendInvite">Send invitation email</Label>
                    <Switch
                      id="sendInvite"
                      checked={newEmployee.sendInvite}
                      onCheckedChange={(checked) =>
                        setNewEmployee((prev) => ({
                          ...prev,
                          sendInvite: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="temporaryPassword">
                      Create temporary password
                    </Label>
                    <Switch
                      id="temporaryPassword"
                      checked={newEmployee.temporaryPassword}
                      onCheckedChange={(checked) =>
                        setNewEmployee((prev) => ({
                          ...prev,
                          temporaryPassword: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="role" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Role</Label>
                    <RadioGroup
                      value={newEmployee.role}
                      onValueChange={(value) =>
                        setNewEmployee((prev) => ({ ...prev, role: value }))
                      }
                      className="space-y-3"
                    >
                      {roles.map((role) => (
                        <div
                          key={role.id}
                          className="flex items-start space-x-2 rounded-md border p-3"
                        >
                          <RadioGroupItem
                            value={role.id}
                            id={`role-${role.id}`}
                            className="mt-1"
                          />
                          <Label
                            htmlFor={`role-${role.id}`}
                            className="flex flex-col gap-1 font-normal"
                          >
                            <span className="font-medium">{role.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {role.description}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={newEmployee.department}
                      onValueChange={(value) =>
                        setNewEmployee((prev) => ({
                          ...prev,
                          department: value,
                        }))
                      }
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="permissions" className="space-y-4 pt-4">
                <div className="space-y-3">
                  <Label className="mb-2 block">Permissions</Label>
                  {permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-start space-x-2 rounded-md border p-3"
                    >
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={newEmployee.permissions.includes(
                          permission.id
                        )}
                        onCheckedChange={() =>
                          handlePermissionChange(permission.id)
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor={`permission-${permission.id}`}
                        className="flex flex-col gap-1 font-normal"
                      >
                        <span className="font-medium">{permission.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {permission.description}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {newEmployee.role === 'admin'
                        ? 'Admins automatically have access to all features.'
                        : 'Select the specific permissions for this employee.'}
                    </span>
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddEmployeeDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Employee'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  PhoneIcon,
  MapPin,
  ShoppingBag,
  ArrowUpDown,
  Download,
  Upload,
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

// Sample customers data
const customers = [
  {
    id: 'CUST-001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    totalSpent: 349.97,
    totalOrders: 3,
    lastOrder: '2023-06-12',
    status: 'Active',
    dateJoined: '2023-01-15',
  },
  {
    id: 'CUST-002',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    location: 'Los Angeles, CA',
    totalSpent: 129.5,
    totalOrders: 1,
    lastOrder: '2023-06-11',
    status: 'Active',
    dateJoined: '2023-05-22',
  },
  {
    id: 'CUST-003',
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '(555) 456-7890',
    location: 'Chicago, IL',
    totalSpent: 549.98,
    totalOrders: 4,
    lastOrder: '2023-06-10',
    status: 'Active',
    dateJoined: '2022-11-03',
  },
  {
    id: 'CUST-004',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '(555) 234-5678',
    location: 'Houston, TX',
    totalSpent: 45.75,
    totalOrders: 1,
    lastOrder: '2023-06-09',
    status: 'Inactive',
    dateJoined: '2023-03-17',
  },
  {
    id: 'CUST-005',
    name: 'David Wilson',
    email: 'dwilson@example.com',
    phone: '(555) 876-5432',
    location: 'Miami, FL',
    totalSpent: 189.0,
    totalOrders: 2,
    lastOrder: '2023-06-08',
    status: 'Active',
    dateJoined: '2023-02-28',
  },
  {
    id: 'CUST-006',
    name: 'Jessica Taylor',
    email: 'jtaylor@example.com',
    phone: '(555) 345-6789',
    location: 'Seattle, WA',
    totalSpent: 112.5,
    totalOrders: 1,
    lastOrder: '2023-06-07',
    status: 'Active',
    dateJoined: '2023-04-11',
  },
  {
    id: 'CUST-007',
    name: 'Robert Martinez',
    email: 'rmartinez@example.com',
    phone: '(555) 654-3210',
    location: 'Denver, CO',
    totalSpent: 67.25,
    totalOrders: 1,
    lastOrder: '2023-06-06',
    status: 'Inactive',
    dateJoined: '2023-01-09',
  },
  {
    id: 'CUST-008',
    name: 'Amanda Lee',
    email: 'alee@example.com',
    phone: '(555) 789-0123',
    location: 'Boston, MA',
    totalSpent: 454.99,
    totalOrders: 3,
    lastOrder: '2023-06-05',
    status: 'Active',
    dateJoined: '2022-12-14',
  },
];

export default function CustomersPage() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    // Search filter
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === 'all' ||
      customer.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map((customer) => customer.id));
    }
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomerToDelete(customerId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the customer
    console.log(`Deleting customer: ${customerToDelete}`);

    // Close dialog and reset state
    setIsDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  const handleBulkDelete = () => {
    // In a real app, you would call an API to delete multiple customers
    console.log(`Deleting customers: ${selectedCustomers.join(', ')}`);
    setSelectedCustomers([]);
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would call an API to add the customer
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and close dialog
      setNewCustomer({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
      });
      setIsAddCustomerDialogOpen(false);
    } catch (err) {
      console.error('Failed to add customer', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button onClick={() => setIsAddCustomerDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" className="h-10 w-10">
          <Filter className="h-4 w-4" />
          <span className="sr-only">More filters</span>
        </Button>

        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>

      {selectedCustomers.length > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-md bg-muted p-2">
          <span className="text-sm">
            {selectedCustomers.length}{' '}
            {selectedCustomers.length === 1 ? 'customer' : 'customers'} selected
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
                    selectedCustomers.length === filteredCustomers.length &&
                    filteredCustomers.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all customers"
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Customer
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead>
                <div className="flex items-center justify-end">
                  Total Spent
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={() =>
                        toggleCustomerSelection(customer.id)
                      }
                      aria-label={`Select ${customer.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {customer.id}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{customer.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{customer.location}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span>{customer.totalOrders}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Last: {customer.lastOrder}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    <Badge
                      variant={
                        customer.status === 'Active' ? 'default' : 'secondary'
                      }
                    >
                      {customer.status}
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
                            href={`/customers/${customer.id}`}
                            className="flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/customers/${customer.id}/orders`}
                            className="flex items-center"
                          >
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            View Orders
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteCustomer(customer.id)}
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
          <strong>{filteredCustomers.length}</strong> of{' '}
          <strong>{customers.length}</strong> customers
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
              Are you sure you want to delete this customer?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              customer and all associated data.
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
              Delete Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog
        open={isAddCustomerDialogOpen}
        onOpenChange={setIsAddCustomerDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter the customer details below to create a new customer account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCustomer}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newCustomer.name}
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
                    value={newCustomer.email}
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
                  value={newCustomer.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={newCustomer.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={newCustomer.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={newCustomer.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={newCustomer.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={newCustomer.country}
                  onValueChange={(value) =>
                    setNewCustomer((prev) => ({ ...prev, country: value }))
                  }
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddCustomerDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Customer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

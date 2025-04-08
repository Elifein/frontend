'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Shield,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../components/ui/tabs';
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../../components/ui/radio-group';
import { Switch } from '../../../../components/ui/switch';
import { Checkbox } from '../../../../components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../../../components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/dialog';
import router from 'next/router';

// Sample employee data - in a real app, this would be fetched from an API
const employeeData = {
  id: 'EMP-001',
  name: 'John Anderson',
  email: 'john.anderson@example.com',
  phone: '(555) 123-4567',
  avatar: '/placeholder.svg?height=100&width=100',
  role: 'admin',
  department: 'Management',
  status: 'Active',
  dateJoined: '2022-03-15',
  permissions: ['all'],
  address: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'United States',
  emergencyContact: {
    name: 'Jane Anderson',
    relationship: 'Spouse',
    phone: '(555) 987-6543',
  },
  lastLogin: '2023-06-15 09:32:45',
  notes: 'Senior administrator with full system access.',
};

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

export default function EditEmployeePage() {
  const params = useParams();
  const id = params?.id as string;
  const [employee, setEmployee] = useState<typeof employeeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch employee data
  useEffect(() => {
    // In a real app, you would fetch the employee data from an API
    // For this example, we'll use the sample data
    setTimeout(() => {
      if (id === 'EMP-001') {
        setEmployee(employeeData);
      } else {
        setError('Employee not found');
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!employee) return;

    const { name, value } = e.target;
    setEmployee((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePermissionChange = (permissionId: string) => {
    if (!employee) return;

    setEmployee((prev) => {
      if (!prev) return prev;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    setIsSubmitting(true);

    try {
      // In a real app, you would call an API to update the employee
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error); // optional, good for debugging
      setError('Failed to update employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      // In a real app, you would call an API to delete the employee
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to employees page after successful deletion
      router.push('/employees');
    } catch (error) {
      console.error(error); // optional, good for debugging
      setError('Failed to delete employee');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">
              Loading employee data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/employees">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Employee</h1>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/employees">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Employee</h1>
        </div>

        <div className="flex gap-2">
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </DialogTrigger>
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
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Deleting...' : 'Delete Employee'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button type="submit" form="employee-form" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            Employee information has been updated successfully.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          {/* Employee Profile Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Employee Profile</CardTitle>
              <CardDescription>ID: {employee.id}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-medium">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.email}</p>
              <div className="mt-2">
                <Badge status={employee.status} />
              </div>
              <div className="mt-4 w-full text-sm">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Department:</span>
                  <span>{employee.department}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Role:</span>
                  <span>
                    {roles.find((r) => r.id === employee.role)?.name ||
                      employee.role}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Joined:</span>
                  <span>{employee.dateJoined}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Last Login:</span>
                  <span>{employee.lastLogin}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={employee.status}
                    onValueChange={(value) =>
                      setEmployee((prev) =>
                        prev ? { ...prev, status: value } : prev
                      )
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="resetPassword">Reset Password</Label>
                  <Button variant="outline" size="sm">
                    Send Reset Link
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                  <Switch id="twoFactor" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <form id="employee-form" onSubmit={handleSubmit}>
            <Card>
              <Tabs defaultValue="details">
                <CardHeader className="pb-3">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="role">Role</TabsTrigger>
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={employee.name}
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
                          value={employee.email}
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
                        value={employee.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={employee.address}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={employee.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={employee.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={employee.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={employee.country}
                        onValueChange={(value) =>
                          setEmployee((prev) =>
                            prev ? { ...prev, country: value } : prev
                          )
                        }
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">
                            United Kingdom
                          </SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-base font-medium mb-4">
                        Emergency Contact
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyName">Name</Label>
                          <Input
                            id="emergencyName"
                            name="emergencyContact.name"
                            value={employee.emergencyContact.name}
                            onChange={(e) =>
                              setEmployee((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      emergencyContact: {
                                        ...prev.emergencyContact,
                                        name: e.target.value,
                                      },
                                    }
                                  : prev
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyRelationship">
                            Relationship
                          </Label>
                          <Input
                            id="emergencyRelationship"
                            name="emergencyContact.relationship"
                            value={employee.emergencyContact.relationship}
                            onChange={(e) =>
                              setEmployee((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      emergencyContact: {
                                        ...prev.emergencyContact,
                                        relationship: e.target.value,
                                      },
                                    }
                                  : prev
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="emergencyPhone">Phone Number</Label>
                        <Input
                          id="emergencyPhone"
                          name="emergencyContact.phone"
                          value={employee.emergencyContact.phone}
                          onChange={(e) =>
                            setEmployee((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    emergencyContact: {
                                      ...prev.emergencyContact,
                                      phone: e.target.value,
                                    },
                                  }
                                : prev
                            )
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="role" className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Role</Label>
                      <RadioGroup
                        value={employee.role}
                        onValueChange={(value) =>
                          setEmployee((prev) =>
                            prev ? { ...prev, role: value } : prev
                          )
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

                    <div className="space-y-2 pt-4">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={employee.department}
                        onValueChange={(value) =>
                          setEmployee((prev) =>
                            prev ? { ...prev, department: value } : prev
                          )
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
                  </TabsContent>

                  <TabsContent value="permissions" className="space-y-4">
                    <div className="space-y-3">
                      <Label className="mb-2 block">Permissions</Label>
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-start space-x-2 rounded-md border p-3"
                        >
                          <Checkbox
                            id={`permission-${permission.id}`}
                            checked={employee.permissions.includes(
                              permission.id
                            )}
                            onCheckedChange={() =>
                              handlePermissionChange(permission.id)
                            }
                            className="mt-1"
                            disabled={
                              employee.role === 'admin' &&
                              permission.id === 'all'
                            }
                          />
                          <Label
                            htmlFor={`permission-${permission.id}`}
                            className="flex flex-col gap-1 font-normal"
                          >
                            <span className="font-medium">
                              {permission.name}
                            </span>
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
                          {employee.role === 'admin'
                            ? 'Admins automatically have access to all features.'
                            : 'Select the specific permissions for this employee.'}
                        </span>
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="notes" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={employee.notes}
                        onChange={(e) =>
                          setEmployee((prev) =>
                            prev ? { ...prev, notes: e.target.value } : prev
                          )
                        }
                        rows={8}
                        placeholder="Add notes about this employee..."
                      />
                      <p className="text-sm text-muted-foreground">
                        These notes are only visible to administrators.
                      </p>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}

// Badge component for employee status
function Badge({ status }: { status: string }) {
  let variant = 'default';

  if (status === 'Inactive') {
    variant = 'secondary';
  } else if (status === 'Suspended') {
    variant = 'destructive';
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
      ${
        variant === 'default'
          ? 'bg-green-100 text-green-800'
          : variant === 'secondary'
            ? 'bg-gray-100 text-gray-800'
            : 'bg-red-100 text-red-800'
      }`}
    >
      {status}
    </span>
  );
}

// Textarea component
function Textarea({
  id,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      id={id}
      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

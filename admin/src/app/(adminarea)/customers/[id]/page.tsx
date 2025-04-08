'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  CreditCard,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

import { Button } from '../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../components/ui/tabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar';
import { Badge } from '../../../../components/ui/badge';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
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

// Sample customer data - in a real app, this would be fetched from an API
const customerData = {
  id: 'CUST-001',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '(555) 123-4567',
  avatar: '/placeholder.svg?height=100&width=100',
  status: 'Active',
  dateJoined: '2023-01-15',
  lastLogin: '2023-06-15 09:32:45',
  totalSpent: 349.97,
  totalOrders: 3,
  addresses: [
    {
      id: '1',
      type: 'Home',
      default: true,
      address: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    {
      id: '2',
      type: 'Work',
      default: false,
      address: '456 Business Ave',
      apartment: 'Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
    },
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'Visa',
      default: true,
      lastFour: '4242',
      expiryDate: '04/25',
    },
    {
      id: '2',
      type: 'Mastercard',
      default: false,
      lastFour: '5678',
      expiryDate: '08/24',
    },
  ],
  orders: [
    {
      id: 'ORD-001',
      date: '2023-06-12',
      status: 'Delivered',
      total: 129.99,
      items: 2,
    },
    {
      id: 'ORD-002',
      date: '2023-05-28',
      status: 'Delivered',
      total: 89.99,
      items: 1,
    },
    {
      id: 'ORD-003',
      date: '2023-04-15',
      status: 'Processing',
      total: 129.99,
      items: 3,
    },
  ],
  notes: 'Prefers email communication. Interested in premium products.',
};

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [customer, setCustomer] = useState<typeof customerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<
    typeof customerData | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch customer data
  useEffect(() => {
    // In a real app, you would fetch the customer data from an API
    // For this example, we'll use the sample data
    setTimeout(() => {
      if (id === 'CUST-001') {
        setCustomer(customerData);
        setEditedCustomer(customerData);
      } else {
        setError('Customer not found');
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editedCustomer) return;

    const { name, value } = e.target;
    setEditedCustomer((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedCustomer) return;

    setIsSubmitting(true);

    try {
      // In a real app, you would call an API to update the customer
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCustomer(editedCustomer);
      setIsEditing(false);
      setSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error); // optional, good for debugging
      setError('Failed to update customer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      // In a real app, you would call an API to delete the customer
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to customers page after successful deletion
      router.push('/customers');
    } catch (error) {
      console.error(error); // optional, good for debugging
      setError('Failed to delete customer');
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
              Loading customer data...
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
            <Link href="/customers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Customer Details</h1>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!customer || !editedCustomer) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/customers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Customer Details</h1>
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
                  Are you sure you want to delete this customer?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  customer account and all associated data.
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
                  {isSubmitting ? 'Deleting...' : 'Delete Customer'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="customer-form"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Customer
            </Button>
          )}
        </div>
      </div>

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            Customer information has been updated successfully.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {customer.email}
                </p>
                <Badge
                  variant={
                    customer.status === 'Active' ? 'default' : 'secondary'
                  }
                  className="mt-2"
                >
                  {customer.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {customer.dateJoined}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.totalOrders} orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>${customer.totalSpent.toFixed(2)} spent</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Customer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="notes"
                  value={editedCustomer.notes}
                  onChange={handleInputChange}
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Add notes about this customer..."
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Customer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {customer.notes || 'No notes available.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2">
          {isEditing ? (
            <form id="customer-form" onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={editedCustomer.name}
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
                        value={editedCustomer.email}
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
                      value={editedCustomer.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        name="status"
                        value={editedCustomer.status}
                        onChange={(e) =>
                          setEditedCustomer((prev) =>
                            prev ? { ...prev, status: e.target.value } : prev
                          )
                        }
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          ) : (
            <Tabs defaultValue="orders">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      Showing all {customer.orders.length} orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {customer.orders.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">
                          No orders found.
                        </p>
                      ) : (
                        <div className="rounded-md border">
                          {customer.orders.map((order, index) => (
                            <div
                              key={order.id}
                              className={`p-4 ${index !== 0 ? 'border-t' : ''}`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{order.id}</h3>
                                    <OrderStatusBadge status={order.status} />
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {order.date} • ${order.total.toFixed(2)} •{' '}
                                    {order.items} items
                                  </p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/orders/${order.id}`}>
                                    View Details
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Addresses</CardTitle>
                    <CardDescription>
                      Customer`&apos;`s shipping and billing addresses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {customer.addresses.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">
                          No addresses found.
                        </p>
                      ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                          {customer.addresses.map((address) => (
                            <div
                              key={address.id}
                              className="rounded-md border p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">{address.type}</h3>
                                {address.default && (
                                  <Badge variant="outline">Default</Badge>
                                )}
                              </div>
                              <div className="space-y-1 text-sm">
                                <p>{address.address}</p>
                                {address.apartment && (
                                  <p>{address.apartment}</p>
                                )}
                                <p>
                                  {address.city}, {address.state}{' '}
                                  {address.zipCode}
                                </p>
                                <p>{address.country}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Customer`&apos;`s saved payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {customer.paymentMethods.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">
                          No payment methods found.
                        </p>
                      ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                          {customer.paymentMethods.map((method) => (
                            <div
                              key={method.id}
                              className="rounded-md border p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">
                                  {method.type} •••• {method.lastFour}
                                </h3>
                                {method.default && (
                                  <Badge variant="outline">Default</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Expires: {method.expiryDate}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}

// Order status badge component
function OrderStatusBadge({ status }: { status: string }) {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' =
    'default';

  switch (status) {
    case 'Processing':
      variant = 'secondary';
      break;
    case 'Shipped':
      variant = 'default';
      break;
    case 'Delivered':
      variant = 'success';
      break;
    case 'Cancelled':
      variant = 'destructive';
      break;
    default:
      variant = 'outline';
  }

  return <Badge variant={variant}>{status}</Badge>;
}

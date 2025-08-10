'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Filter, MoreHorizontal, Eye, Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Checkbox } from '../../../components/ui/checkbox';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import axiosInstance from '../../../lib/axiosInstance';
import { toast } from 'sonner';

// Type definitions based on your backend response
interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  selling_price: number;
  category_slug: string;
  slug: string;
  image_url: string;
}

interface Order {
  order_id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  custom_notes: string;
  items: OrderItem[];
  created_at: string;
  payment_id: string | null;
  razorpay_order_id: string;
  payment_status: string | null;
  user_firstname : string | null;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/orders/');
      console.log('Orders response:', response.data);
      
      setOrders(response.data);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch orders';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on status
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase());

  // Calculate statistics
  const totalOrders = orders.length;
  const processingOrders = orders.filter(order => order.status.toLowerCase() === 'pending').length;
  const confirmedOrders = orders.filter(order => order.status.toLowerCase() === 'confirmed').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.order_id));
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'shipped':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Get customer name from user_id (you might want to fetch user details separately)
  const getCustomerInfo = (userId: string) => {
    return {
      name: `Customer ${userId}`,
      email: `${userId}@example.com` // You might want to fetch real user data
    };
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchOrders}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-muted/40">
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold">Orders</h1>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={fetchOrders}
                disabled={loading}
              >
                <Filter className="h-4 w-4" />
                Refresh
              </Button>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Order Statistics */}
          <div className="grid gap-4 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  All time orders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{processingOrders}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting fulfillment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{confirmedOrders}</div>
                <p className="text-xs text-muted-foreground">
                  Payment completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{totalRevenue.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total earnings
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Orders table */}
          <div className="rounded-md border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        selectedOrders.length === filteredOrders.length &&
                        filteredOrders.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all orders"
                    />
                  </TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      {statusFilter === 'all' ? 'No orders found' : `No ${statusFilter} orders found`}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => {
                    const customerInfo = getCustomerInfo(order.user_id);
                    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
                    
                    return (
                      <TableRow key={order.order_id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedOrders.includes(order.order_id)}
                            onCheckedChange={() => toggleOrderSelection(order.order_id)}
                            aria-label={`Select order ${order.order_id}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{order.order_id}</TableCell>
                        <TableCell>
                         
                          <div className="text-sm text-muted-foreground">
                            {order.user_firstname}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(order.created_at)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {totalItems}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={order.payment_status === 'completed' ? 'default' : 'secondary'}
                          >
                            {order.payment_status || 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{order.total_amount.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Update Status
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredOrders.length}</strong> of{' '}
              <strong>{totalOrders}</strong> orders
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import withAuth from '../../../lib/withauth';
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
  user_firstname: string | null;
  user_email: string;
}

interface DashboardStats {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats[]>([
    {
      title: 'Total Revenue',
      value: '₹0.00',
      change: '+0%',
      changeType: 'neutral',
    },
    {
      title: 'Orders',
      value: '0',
      change: '+0%',
      changeType: 'neutral',
    },
    {
      title: 'Customers',
      value: '0',
      change: '+0%',
      changeType: 'neutral',
    },
    {
      title: 'Conversion Rate',
      value: '0%',
      change: '+0%',
      changeType: 'neutral',
    },
  ]);

  // Function to fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/orders/');
      console.log('Dashboard orders response:', response.data);
      
      setOrders(response.data);
      calculateStats(response.data);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch orders';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate dashboard statistics
  const calculateStats = (ordersData: Order[]) => {
    if (!ordersData || ordersData.length === 0) {
      return;
    }

    // Calculate total revenue
    const totalRevenue = ordersData.reduce((sum, order) => {
      return sum + (order.total_amount || 0);
    }, 0);

    // Get total orders count
    const totalOrders = ordersData.length;

    // Get unique customers count
    const uniqueCustomers = new Set(ordersData.map(order => order.user_email)).size;

    // Calculate delivered/completed orders for conversion rate
    const completedOrders = ordersData.filter(order => 
      order.status?.toLowerCase() === 'delivered' || 
      order.status?.toLowerCase() === 'completed'
    ).length;
    const conversionRate = totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : '0';

    // Get current month and previous month data for comparison
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const currentMonthOrders = ordersData.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });

    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const previousMonthOrders = ordersData.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate.getMonth() === previousMonth && orderDate.getFullYear() === previousMonthYear;
    });

    // Calculate month-over-month changes
    const currentMonthRevenue = currentMonthOrders.reduce((sum, order) => sum + order.total_amount, 0);
    const previousMonthRevenue = previousMonthOrders.reduce((sum, order) => sum + order.total_amount, 0);
    
    const revenueChange = previousMonthRevenue > 0 
      ? (((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100).toFixed(1)
      : '0';

    const ordersChange = previousMonthOrders.length > 0
      ? (((currentMonthOrders.length - previousMonthOrders.length) / previousMonthOrders.length) * 100).toFixed(1)
      : '0';

    // Calculate customers change (approximate)
    const currentMonthCustomers = new Set(currentMonthOrders.map(order => order.user_email)).size;
    const previousMonthCustomers = new Set(previousMonthOrders.map(order => order.user_email)).size;
    const customersChange = previousMonthCustomers > 0
      ? (((currentMonthCustomers - previousMonthCustomers) / previousMonthCustomers) * 100).toFixed(1)
      : '0';

    // Calculate conversion rate change
    const currentMonthCompletedOrders = currentMonthOrders.filter(order => 
      order.status?.toLowerCase() === 'delivered' || 
      order.status?.toLowerCase() === 'completed'
    ).length;
    const previousMonthCompletedOrders = previousMonthOrders.filter(order => 
      order.status?.toLowerCase() === 'delivered' || 
      order.status?.toLowerCase() === 'completed'
    ).length;

    const currentMonthConversionRate = currentMonthOrders.length > 0 
      ? (currentMonthCompletedOrders / currentMonthOrders.length) * 100 
      : 0;
    const previousMonthConversionRate = previousMonthOrders.length > 0 
      ? (previousMonthCompletedOrders / previousMonthOrders.length) * 100 
      : 0;
    
    const conversionRateChange = previousMonthConversionRate > 0
      ? (((currentMonthConversionRate - previousMonthConversionRate) / previousMonthConversionRate) * 100).toFixed(1)
      : '0';

    // Update stats
    setStats([
      {
        title: 'Total Revenue',
        value: `₹${totalRevenue.toFixed(2)}`,
        change: `${Number(revenueChange) >= 0 ? '+' : ''}${revenueChange}%`,
        changeType: Number(revenueChange) > 0 ? 'positive' : Number(revenueChange) < 0 ? 'negative' : 'neutral',
      },
      {
        title: 'Orders',
        value: totalOrders.toString(),
        change: `${Number(ordersChange) >= 0 ? '+' : ''}${ordersChange}%`,
        changeType: Number(ordersChange) > 0 ? 'positive' : Number(ordersChange) < 0 ? 'negative' : 'neutral',
      },
      {
        title: 'Customers',
        value: uniqueCustomers.toString(),
        change: `${Number(customersChange) >= 0 ? '+' : ''}${customersChange}%`,
        changeType: Number(customersChange) > 0 ? 'positive' : Number(customersChange) < 0 ? 'negative' : 'neutral',
      },
      {
        title: 'Conversion Rate',
        value: `${conversionRate}%`,
        change: `${Number(conversionRateChange) >= 0 ? '+' : ''}${conversionRateChange}%`,
        changeType: Number(conversionRateChange) > 0 ? 'positive' : Number(conversionRateChange) < 0 ? 'negative' : 'neutral',
      },
    ]);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Get recent orders (last 5)
  const recentOrders = orders
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

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
      case 'delivered':
      case 'completed':
      case 'confirmed':
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
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
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button onClick={fetchOrders} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Refresh
            </Button>
          </div>

          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div
                    className={`flex items-center text-sm ${
                      stat.changeType === 'positive'
                        ? 'text-green-500'
                        : stat.changeType === 'negative'
                        ? 'text-red-500'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stat.change}
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent orders */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Link href="/admin/orders">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <CardDescription>
                  Overview of the latest customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent orders found
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.order_id}>
                          <TableCell className="font-medium">
                            {order.order_id}
                          </TableCell>
                          <TableCell>
                            <div>{order.user_firstname || 'Unknown'}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.user_email}
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(order.created_at)}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            ₹{order.total_amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard);
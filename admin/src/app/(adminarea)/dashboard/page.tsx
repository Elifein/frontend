'use client';

import Link from 'next/link';

import { Plus } from 'lucide-react';

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

// Sample data for the dashboard
const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    date: '2023-06-12',
    status: 'Delivered',
    total: 129.99,
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Johnson',
    date: '2023-06-11',
    status: 'Processing',
    total: 79.5,
  },
  {
    id: 'ORD-003',
    customer: 'Michael Brown',
    date: '2023-06-10',
    status: 'Shipped',
    total: 249.99,
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    date: '2023-06-09',
    status: 'Delivered',
    total: 45.75,
  },
  {
    id: 'ORD-005',
    customer: 'David Wilson',
    date: '2023-06-08',
    status: 'Cancelled',
    total: 189.0,
  },
];

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,456.89',
    change: '+12.5%',
    changeType: 'positive',
  },
  {
    title: 'Orders',
    value: '356',
    change: '+8.2%',
    changeType: 'positive',
  },
  {
    title: 'Customers',
    value: '1,245',
    change: '+18.7%',
    changeType: 'positive',
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '-0.4%',
    changeType: 'negative',
  },
];

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-muted/40">
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {/* <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button> */}
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
                        : 'text-red-500'
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
                  <Link href="/orders">
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
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'Delivered'
                                ? 'default'
                                : order.status === 'Processing'
                                  ? 'secondary'
                                  : order.status === 'Shipped'
                                    ? 'outline'
                                    : 'destructive'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          ${order.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

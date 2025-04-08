'use client';

import { useState } from 'react';

import { ShoppingCart, Filter, MoreHorizontal, Eye } from 'lucide-react';

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

// Sample orders data
const orders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    email: 'john.smith@example.com',
    date: '2023-06-12',
    status: 'Delivered',
    total: 129.99,
    items: 3,
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    date: '2023-06-11',
    status: 'Processing',
    total: 79.5,
    items: 2,
  },
  {
    id: 'ORD-003',
    customer: 'Michael Brown',
    email: 'mbrown@example.com',
    date: '2023-06-10',
    status: 'Shipped',
    total: 249.99,
    items: 4,
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    email: 'emily.davis@example.com',
    date: '2023-06-09',
    status: 'Delivered',
    total: 45.75,
    items: 1,
  },
  {
    id: 'ORD-005',
    customer: 'David Wilson',
    email: 'dwilson@example.com',
    date: '2023-06-08',
    status: 'Cancelled',
    total: 189.0,
    items: 3,
  },
  {
    id: 'ORD-006',
    customer: 'Jessica Taylor',
    email: 'jtaylor@example.com',
    date: '2023-06-07',
    status: 'Delivered',
    total: 112.5,
    items: 2,
  },
  {
    id: 'ORD-007',
    customer: 'Robert Martinez',
    email: 'rmartinez@example.com',
    date: '2023-06-06',
    status: 'Processing',
    total: 67.25,
    items: 1,
  },
  {
    id: 'ORD-008',
    customer: 'Amanda Lee',
    email: 'alee@example.com',
    date: '2023-06-05',
    status: 'Shipped',
    total: 154.99,
    items: 3,
  },
];

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order.id));
    }
  };

  return (
    <div className="flex h-screen bg-muted/40">
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold">Orders</h1>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
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
                <div className="text-2xl font-bold">{orders.length}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    orders.filter((order) => order.status === 'Processing')
                      .length
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting fulfillment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Shipped</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {orders.filter((order) => order.status === 'Shipped').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  In transit to customers
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
                  $
                  {orders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +8.2% from last month
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
                        selectedOrders.length === orders.length &&
                        orders.length > 0
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
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() => toggleOrderSelection(order.id)}
                        aria-label={`Select order ${order.id}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>{order.customer}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.date}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.items}
                    </TableCell>
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
                    <TableCell>${order.total.toFixed(2)}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>8</strong> of{' '}
              <strong>24</strong> orders
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
        </main>
      </div>
    </div>
  );
}

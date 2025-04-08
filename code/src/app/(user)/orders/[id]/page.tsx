'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  Download,
  ChevronRight,
} from 'lucide-react';
import { useParams } from 'next/navigation';

import { Button } from '../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { Badge, badgeVariants } from '../../../../components/ui/badge';
import { Separator } from '../../../../components/ui/separator';
import { CartProvider } from '../../../../components/cart-provider';
import { VariantProps } from 'class-variance-authority';

// Sample order data - replace with actual API call in production
const orderData = {
  id: 'ORD-001',
  date: '2023-06-12',
  time: '14:35:28',
  status: 'Delivered',
  total: 129.99,
  subtotal: 119.99,
  tax: 10.0,
  shipping: 0.0,
  discount: 0.0,
  paymentMethod: 'Credit Card',
  paymentStatus: 'Paid',
  notes: 'Please leave package at the front door',
  items: [
    {
      id: '1',
      name: 'Minimalist Desk Lamp',
      price: 49.99,
      quantity: 1,
      image: '/images/placeholder.svg?height=80&width=80',
      sku: 'LAMP-001',
    },
    {
      id: '2',
      name: 'Leather Weekender Bag',
      price: 79.99,
      quantity: 1,
      image: '/images/placeholder.svg?height=80&width=80',
      sku: 'BAG-002',
    },
  ],
  customer: {
    id: 'CUST-001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
  },
  shippingAddress: {
    name: 'John Smith',
    address: '123 Main Street',
    apartment: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  },
  billingAddress: {
    name: 'John Smith',
    address: '123 Main Street',
    apartment: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  },
  timeline: [
    {
      status: 'Order Placed',
      date: '2023-06-12',
      time: '14:35:28',
      note: 'Order was placed by customer',
    },
    {
      status: 'Payment Received',
      date: '2023-06-12',
      time: '14:36:05',
      note: 'Payment was processed successfully',
    },
    {
      status: 'Processing',
      date: '2023-06-13',
      time: '09:10:22',
      note: 'Order is being processed',
    },
    {
      status: 'Shipped',
      date: '2023-06-14',
      time: '11:25:18',
      note: 'Order has been shipped via USPS',
    },
    {
      status: 'Delivered',
      date: '2023-06-16',
      time: '15:42:33',
      note: 'Package was delivered',
    },
  ],
};

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [order, setOrder] = useState<typeof orderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      if (id === 'ORD-001') {
        setOrder(orderData);
      } else {
        setError('Order not found');
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
            <div className="container mx-auto max-w-7xl px-4 py-8">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">
                    Loading order details...
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </CartProvider>
    );
  }

  if (error || !order) {
    return (
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
            <div className="container mx-auto max-w-7xl px-4 py-8">
              <div className="mb-6 flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold">Order Details</h1>
              </div>
              <div className="rounded-md border bg-destructive/10 p-4 text-destructive">
                <h2 className="font-semibold">Error</h2>
                <p>{error || 'Failed to load order details'}</p>
              </div>
            </div>
          </main>
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="container mx-auto max-w-7xl px-4 py-8">
            {/* Breadcrumbs */}
            <div className="mb-6 flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <Link href="/dashboard" className="hover:text-foreground">
                My Account
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <Link
                href="/dashboard?tab=orders"
                className="hover:text-foreground"
              >
                Orders
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <span className="text-foreground">{order.id}</span>
            </div>

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href="/dashboard?tab=orders">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold">Order {order.id}</h1>
                <OrderStatusBadge status={order.status} />
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/orders/${order.id}/invoice`}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="h-16 w-16 overflow-hidden rounded-md border">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{item.name}</h4>
                              <span className="font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>
                                SKU: {item.sku} • Qty: {item.quantity}
                              </span>
                              <span>${item.price.toFixed(2)} each</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <Separator />
                  <div className="p-6 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>
                        {order.shipping === 0
                          ? 'Free'
                          : `$${order.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-${order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-base">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="relative border-l border-muted">
                      {order.timeline.map((event, index) => (
                        <li key={index} className="mb-6 ml-6">
                          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground/20">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </span>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{event.status}</h3>
                            <Badge variant="outline">
                              {event.date} {event.time}
                            </Badge>
                          </div>
                          {event.note && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {event.note}
                            </p>
                          )}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        <strong>Date:</strong> {order.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        <strong>Time:</strong> {order.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span>
                        <strong>Payment:</strong> {order.paymentMethod}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </div>
                    {order.notes && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium">Order Notes</h4>
                          <p className="text-muted-foreground">{order.notes}</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />{' '}
                        Shipping Address
                      </h4>
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.address}</p>
                      {order.shippingAddress.apartment && (
                        <p>{order.shippingAddress.apartment}</p>
                      )}
                      <p>
                        {order.shippingAddress.city},{' '}
                        {order.shippingAddress.state}{' '}
                        {order.shippingAddress.zipCode}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />{' '}
                        Billing Address
                      </h4>
                      <p>{order.billingAddress.name}</p>
                      <p>{order.billingAddress.address}</p>
                      {order.billingAddress.apartment && (
                        <p>{order.billingAddress.apartment}</p>
                      )}
                      <p>
                        {order.billingAddress.city},{' '}
                        {order.billingAddress.state}{' '}
                        {order.billingAddress.zipCode}
                      </p>
                      <p>{order.billingAddress.country}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CartProvider>
  );
}

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

function OrderStatusBadge({ status }: { status: string }) {
  const statusToVariant: Record<string, BadgeVariant> = {
    Processing: 'secondary',
    Shipped: 'default',
    Delivered: 'success',
    Cancelled: 'destructive',
  };

  const variant = statusToVariant[status] ?? 'outline';

  return <Badge variant={variant}>{status}</Badge>;
}

function PaymentStatusBadge({ status }: { status: string }) {
  const statusToVariant: Record<string, BadgeVariant> = {
    Paid: 'success',
    Pending: 'warning',
    Refunded: 'secondary',
    Failed: 'destructive',
  };

  const variant = statusToVariant[status] ?? 'outline';

  return <Badge variant={variant}>{status}</Badge>;
}

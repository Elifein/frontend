'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  User,
  Package,
  ShoppingBag,
  CreditCard,
  Heart,
  LogOut,
  Settings,
  Bell,
} from 'lucide-react';

import { Button } from '../../../components/ui/button';

import { Separator } from '../../../components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar';
import Image from 'next/image';

// Sample user data
const user = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/images/placeholder.svg?height=40&width=40',
  joinDate: 'January 2023',
};

// Sample order data
const orders = [
  {
    id: 'ORD-001',
    date: '2023-06-12',
    status: 'Delivered',
    total: 129.99,
    items: [
      {
        id: '1',
        name: 'Minimalist Desk Lamp',
        price: 49.99,
        quantity: 1,
        image: '/images/placeholder.svg?height=80&width=80',
      },
      {
        id: '2',
        name: 'Leather Weekender Bag',
        price: 79.99,
        quantity: 1,
        image: '/images/placeholder.svg?height=80&width=80',
      },
    ],
  },
  {
    id: 'ORD-002',
    date: '2023-05-28',
    status: 'Delivered',
    total: 89.99,
    items: [
      {
        id: '3',
        name: 'Wireless Earbuds',
        price: 89.99,
        quantity: 1,
        image: '/images/placeholder.svg?height=80&width=80',
      },
    ],
  },
  {
    id: 'ORD-003',
    date: '2023-04-15',
    status: 'Delivered',
    total: 74.98,
    items: [
      {
        id: '4',
        name: 'Ceramic Coffee Mug',
        price: 24.99,
        quantity: 2,
        image: '/images/placeholder.svg?height=80&width=80',
      },
      {
        id: '5',
        name: 'Cotton T-Shirt',
        price: 24.99,
        quantity: 1,
        image: '/images/placeholder.svg?height=80&width=80',
      },
    ],
  },
];

// Sample address data
const addresses = [
  {
    id: '1',
    type: 'Home',
    default: true,
    name: 'John Doe',
    address: '123 Main Street',
    apartment: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    phone: '(555) 123-4567',
  },
  {
    id: '2',
    type: 'Work',
    default: false,
    name: 'John Doe',
    address: '456 Business Ave',
    apartment: 'Suite 200',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    country: 'United States',
    phone: '(555) 987-6543',
  },
];

// Sample payment methods
const paymentMethods = [
  {
    id: '1',
    type: 'Visa',
    default: true,
    lastFour: '4242',
    expiryDate: '04/25',
    name: 'John Doe',
  },
  {
    id: '2',
    type: 'Mastercard',
    default: false,
    lastFour: '5678',
    expiryDate: '08/24',
    name: 'John Doe',
  },
];

// Sample wishlist items
const wishlistItems = [
  {
    id: '1',
    name: 'Smart Watch',
    price: 199.99,
    image: '/images/placeholder.svg?height=80&width=80',
    inStock: true,
  },
  {
    id: '2',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: '/images/placeholder.svg?height=80&width=80',
    inStock: true,
  },
  {
    id: '3',
    name: 'Adjustable Standing Desk',
    price: 349.99,
    image: '/images/placeholder.svg?height=80&width=80',
    inStock: false,
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const accountNavigation = [
    { name: 'Overview', href: '/account', icon: User, id: 'overview' },
    {
      name: 'Orders',
      href: '/account/orders',
      icon: ShoppingBag,
      id: 'orders',
    },
    {
      name: 'Addresses',
      href: '/account/addresses',
      icon: Package,
      id: 'addresses',
    },
    {
      name: 'Payment Methods',
      href: '/account/payment',
      icon: CreditCard,
      id: 'payment',
    },
    {
      name: 'Wishlist',
      href: '/account/wishlist',
      icon: Heart,
      id: 'wishlist',
    },
    {
      name: 'Settings',
      href: '/account/settings',
      icon: Settings,
      id: 'settings',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="text-foreground">My Account</span>
          </div>

          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            {/* Sidebar Navigation */}
            <aside className="hidden md:block">
              <div className="flex items-center gap-3 mb-8">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <nav className="flex flex-col space-y-1">
                {accountNavigation.map((item) => (
                  <Button
                    key={item.name}
                    variant={activeTab === item.id ? 'secondary' : 'ghost'}
                    className="justify-start"
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                ))}
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </nav>
            </aside>

            {/* Mobile Navigation */}
            <div className="md:hidden mb-6">
              <Tabs
                defaultValue="overview"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="more">More</TabsTrigger>
                </TabsList>

                {activeTab === 'more' && (
                  <div className="mt-4 space-y-1">
                    {accountNavigation.slice(3).map((item) => (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setActiveTab(item.id)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Button>
                    ))}
                    <Separator className="my-2" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </Tabs>
            </div>

            {/* Main Content */}
            <div>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Account Overview</h1>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden md:flex"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Recent Orders
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {orders.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last order on {orders[0].date}
                        </p>
                        <Button
                          variant="link"
                          className="px-0 mt-2"
                          onClick={() => setActiveTab('orders')}
                        >
                          View Orders
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Package className="mr-2 h-4 w-4" />
                          Shipping Addresses
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {addresses.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {addresses.filter((a) => a.default).length} default
                          address
                        </p>
                        <Button
                          variant="link"
                          className="px-0 mt-2"
                          onClick={() => setActiveTab('addresses')}
                        >
                          Manage Addresses
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Heart className="mr-2 h-4 w-4" />
                          Wishlist
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {wishlistItems.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {wishlistItems.filter((item) => item.inStock).length}{' '}
                          items in stock
                        </p>
                        <Button
                          variant="link"
                          className="px-0 mt-2"
                          onClick={() => setActiveTab('wishlist')}
                        >
                          View Wishlist
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <div className="rounded-md border">
                      {orders.slice(0, 2).map((order, index) => (
                        <div
                          key={order.id}
                          className={`p-4 ${index !== 0 ? 'border-t' : ''}`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{order.id}</h3>
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Ordered on {order.date} • $
                                {order.total.toFixed(2)}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Order
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {orders.length > 2 && (
                      <div className="text-center">
                        <Button
                          variant="link"
                          onClick={() => setActiveTab('orders')}
                        >
                          View All Orders
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Account Details</h2>
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                              Name
                            </div>
                            <div>{user.name}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                              Email
                            </div>
                            <div>{user.email}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                              Member Since
                            </div>
                            <div>{user.joinDate}</div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => setActiveTab('settings')}
                        >
                          Edit Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">Order History</h1>

                  <div className="rounded-md border">
                    {orders.map((order, index) => (
                      <div
                        key={order.id}
                        className={`p-6 ${index !== 0 ? 'border-t' : ''}`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{order.id}</h3>
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Ordered on {order.date} • $
                              {order.total.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                            <Button variant="outline" size="sm">
                              View Invoice
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4"
                            >
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                <Image
                                  src={item.image || '/placeholder.svg'}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                />
                              </div>
                              <div className="flex flex-1 flex-col">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} • $
                                  {item.price.toFixed(2)} each
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                Buy Again
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Addresses</h1>
                    <Button>Add New Address</Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map((address) => (
                      <Card key={address.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">
                              {address.type}
                            </CardTitle>
                            {address.default && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                Default
                              </span>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1">
                            <p>{address.name}</p>
                            <p>{address.address}</p>
                            {address.apartment && <p>{address.apartment}</p>}
                            <p>
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p>{address.country}</p>
                            <p>{address.phone}</p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!address.default && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                            {!address.default && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Payment Methods</h1>
                    <Button>Add Payment Method</Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {paymentMethods.map((method) => (
                      <Card key={method.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">
                              {method.type} •••• {method.lastFour}
                            </CardTitle>
                            {method.default && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                Default
                              </span>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1">
                            <p>{method.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Expires {method.expiryDate}
                            </p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            {!method.default && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                            {!method.default && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">My Wishlist</h1>

                  <div className="rounded-md border">
                    {wishlistItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`p-4 ${index !== 0 ? 'border-t' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || '/placeholder.svg'}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              width={64}
                              height={64}
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex items-center justify-between">
                              <p className="font-medium">
                                ${item.price.toFixed(2)}
                              </p>
                              <span
                                className={`text-xs ${item.inStock ? 'text-green-600' : 'text-red-500'}`}
                              >
                                {item.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" disabled={!item.inStock}>
                              Add to Cart
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">Account Settings</h1>

                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="firstName"
                              className="text-sm font-medium"
                            >
                              First Name
                            </label>
                            <input
                              id="firstName"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              defaultValue="John"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="lastName"
                              className="text-sm font-medium"
                            >
                              Last Name
                            </label>
                            <input
                              id="lastName"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              defaultValue="Doe"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue={user.email}
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="text-sm font-medium"
                          >
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue="(555) 123-4567"
                          />
                        </div>
                        <Button>Save Changes</Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>Change your password</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="currentPassword"
                            className="text-sm font-medium"
                          >
                            Current Password
                          </label>
                          <input
                            id="currentPassword"
                            type="password"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="newPassword"
                            className="text-sm font-medium"
                          >
                            New Password
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium"
                          >
                            Confirm New Password
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <Button>Update Password</Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>
                        Manage your notification preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Order Updates</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive updates about your orders
                            </p>
                          </div>
                          <div className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                            <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Promotional Emails</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about new products and deals
                            </p>
                          </div>
                          <div className="flex h-6 w-11 items-center rounded-full bg-muted p-1">
                            <div className="h-4 w-4 rounded-full bg-muted-foreground transition-transform"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Account Activity</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications about account activity
                            </p>
                          </div>
                          <div className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                            <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Delete Account</CardTitle>
                      <CardDescription>
                        Permanently delete your account and all data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

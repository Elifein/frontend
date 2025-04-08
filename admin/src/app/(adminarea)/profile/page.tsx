'use client';

import { Separator } from '../../../components/ui/separator';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Shield,
  Key,
  Save,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../../components/ui/alert';
import { Switch } from '../../../components/ui/switch';

// Sample admin data
const adminData = {
  id: 'ADMIN-001',
  name: 'Admin User',
  email: 'admin@example.com',
  avatar: '/placeholder.svg?height=100&width=100',
  phone: '(555) 987-6543',
  role: 'Administrator',
  lastLogin: '2023-06-15 09:32:45',
  twoFactorEnabled: false,
  notifications: {
    email: true,
    browser: false,
    orders: true,
    products: true,
    customers: false,
  },
};

export default function AdminProfilePage() {
  const [admin, setAdmin] = useState(adminData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key: string, checked: boolean) => {
    setAdmin((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked,
      },
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would call an API to update the profile
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error); // optional, good for debugging
      setError('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would call an API to update the password
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error); // optional, good for debugging
      setPasswordError('Failed to update password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
      </div>

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            Your changes have been saved successfully.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={admin.avatar} alt={admin.name} />
                <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-medium">{admin.name}</h3>
              <p className="text-sm text-muted-foreground">{admin.role}</p>
              <div className="mt-4 w-full text-sm">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">ID:</span>
                  <span>{admin.id}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Last Login:</span>
                  <span>{admin.lastLogin}</span>
                </div>
              </div>
              <Button variant="outline" className="mt-6 w-full">
                Change Avatar
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="flex items-center border rounded-md pl-3 overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={admin.name}
                          onChange={handleInputChange}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center border rounded-md pl-3 overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={admin.email}
                          onChange={handleInputChange}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center border rounded-md pl-3 overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          value={admin.phone}
                          onChange={handleInputChange}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordSubmit}>
                  <CardContent className="space-y-4">
                    {passwordError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{passwordError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="flex items-center border rounded-md pl-3 overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="flex items-center border rounded-md pl-3 overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 8 characters long
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <div className="flex items-center border rounded-md pl-3 overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Updating...' : 'Update Password'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Protect your account with an additional security layer
                      </p>
                    </div>
                    <Switch
                      checked={admin.twoFactorEnabled}
                      onCheckedChange={(checked) =>
                        setAdmin((prev) => ({
                          ...prev,
                          twoFactorEnabled: checked,
                        }))
                      }
                    />
                  </div>

                  {!admin.twoFactorEnabled && (
                    <div className="rounded-md bg-muted p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <p>
                          Two-factor authentication adds an extra layer of
                          security to your account by requiring more than just a
                          password to sign in.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
                {admin.twoFactorEnabled && (
                  <CardFooter>
                    <Button variant="outline">Configure 2FA</Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">
                      Notification Channels
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={admin.notifications.email}
                        onCheckedChange={(checked) =>
                          handleNotificationChange('email', checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Browser Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications in your browser
                        </p>
                      </div>
                      <Switch
                        checked={admin.notifications.browser}
                        onCheckedChange={(checked) =>
                          handleNotificationChange('browser', checked)
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notification Types</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Order Updates</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications about new and updated orders
                        </p>
                      </div>
                      <Switch
                        checked={admin.notifications.orders}
                        onCheckedChange={(checked) =>
                          handleNotificationChange('orders', checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Product Updates</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications about product inventory and changes
                        </p>
                      </div>
                      <Switch
                        checked={admin.notifications.products}
                        onCheckedChange={(checked) =>
                          handleNotificationChange('products', checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Customer Activity</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications about new customers and customer actions
                        </p>
                      </div>
                      <Switch
                        checked={admin.notifications.customers}
                        onCheckedChange={(checked) =>
                          handleNotificationChange('customers', checked)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

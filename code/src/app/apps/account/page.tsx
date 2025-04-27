import { Button } from "../../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-serif text-gray-800">My Account</h1>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account">Account Details</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-[#1a7ec2] hover:bg-[#1a4e78]">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Addresses</CardTitle>
                <CardDescription>Manage your shipping and billing addresses.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-medium">Default Shipping Address</h3>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">John Doe</p>
                      <p>123 Main Street</p>
                      <p>Apt 4B</p>
                      <p>Boston, MA 02108</p>
                      <p>United States</p>
                      <p>(555) 123-4567</p>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-medium">Default Billing Address</h3>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">John Doe</p>
                      <p>123 Main Street</p>
                      <p>Apt 4B</p>
                      <p>Boston, MA 02108</p>
                      <p>United States</p>
                      <p>(555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#1a7ec2] hover:bg-[#1a4e78]">Add New Address</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved payment methods.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-medium">Visa ending in 4242</h3>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>Expires: 12/2025</p>
                    <p className="font-medium">John Doe</p>
                    <p>123 Main Street</p>
                    <p>Boston, MA 02108</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#1a7ec2] hover:bg-[#1a4e78]">Add Payment Method</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Email Preferences</CardTitle>
                <CardDescription>Manage your email notification preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Confirmations</h3>
                      <p className="text-sm text-gray-500">Receive emails about your orders</p>
                    </div>
                    <div className="flex items-center h-5">
                      <input
                        id="order-confirmations"
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#1a7ec2] border-gray-300 rounded focus:ring-[#1a7ec2]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotions and Sales</h3>
                      <p className="text-sm text-gray-500">Receive emails about promotions and sales</p>
                    </div>
                    <div className="flex items-center h-5">
                      <input
                        id="promotions"
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#1a7ec2] border-gray-300 rounded focus:ring-[#1a7ec2]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Products</h3>
                      <p className="text-sm text-gray-500">Receive emails about new products</p>
                    </div>
                    <div className="flex items-center h-5">
                      <input
                        id="new-products"
                        type="checkbox"
                        className="w-4 h-4 text-[#1a7ec2] border-gray-300 rounded focus:ring-[#1a7ec2]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Newsletter</h3>
                      <p className="text-sm text-gray-500">Receive our weekly newsletter</p>
                    </div>
                    <div className="flex items-center h-5">
                      <input
                        id="newsletter"
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#1a7ec2] border-gray-300 rounded focus:ring-[#1a7ec2]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-[#1a7ec2] hover:bg-[#1a4e78]">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

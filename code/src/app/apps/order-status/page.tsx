import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"

export default function OrderStatusPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-serif text-gray-800">Order Status</h1>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="lookup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lookup">Look Up Order</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>
          <TabsContent value="lookup">
            <Card>
              <CardHeader>
                <CardTitle>Look Up Your Order</CardTitle>
                <CardDescription>
                  Enter your order number and email address to check the status of your order.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="orderNumber" className="block font-medium">
                    Order Number
                  </label>
                  <Input id="orderNumber" placeholder="Enter your order number" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Enter the email used for your order" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#1a7ec2] hover:bg-[#1a4e78]">Look Up Order</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Order History</CardTitle>
                <CardDescription>
                  Sign in to view your complete order history. If you&apos;re not signed in, please do so to access your
                  orders.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-md text-center">
                  <p className="mb-4">You need to be signed in to view your order history.</p>
                  <Button className="bg-[#1a7ec2] hover:bg-[#1a4e78]">Sign In</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">How do I track my order?</h3>
              <p className="text-sm text-gray-600">
                Once your order has shipped, you will receive a shipping confirmation email with tracking information.
                You can also look up your order using the form above.
              </p>
            </div>
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">When will my order ship?</h3>
              <p className="text-sm text-gray-600">
                Most orders are processed within 1-2 business days. Delivery times vary based on shipping method and
                destination.
              </p>
            </div>
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Can I change or cancel my order?</h3>
              <p className="text-sm text-gray-600">
                If you need to change or cancel your order, please contact our customer service team as soon as
                possible. We&apos;ll do our best to accommodate your request if the order hasn&apos;t shipped yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

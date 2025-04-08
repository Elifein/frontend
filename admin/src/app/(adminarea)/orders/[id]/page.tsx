// // "use client"

// // import type React from "react"

// // import { useState, useEffect } from "react"
// // import Link from "next/link"
// // import Image from "next/image"
// // import { useRouter } from "next/navigation"
// // import {
// //   ArrowLeft,
// //   CreditCard,
// //   User,
// //   Calendar,
// //   Clock,
// //   CheckCircle2,
// //   AlertCircle,
// //   Printer,
// //   Download,
// //   Mail,
// // } from "lucide-react"

// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import { Separator } from "@/components/ui/separator"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// // // Sample order data - in a real app, this would be fetched from an API
// // const orderData = {
// //   id: "ORD-001",
// //   date: "2023-06-12",
// //   time: "14:35:28",
// //   status: "Processing",
// //   total: 129.99,
// //   subtotal: 119.99,
// //   tax: 10.0,
// //   shipping: 0.0,
// //   discount: 0.0,
// //   paymentMethod: "Credit Card",
// //   paymentStatus: "Paid",
// //   notes: "Please leave package at the front door",
// //   items: [
// //     {
// //       id: "1",
// //       name: "Minimalist Desk Lamp",
// //       price: 49.99,
// //       quantity: 1,
// //       image: "/images/placeholder.svg?height=80&width=80",
// //       sku: "LAMP-001",
// //     },
// //     {
// //       id: "2",
// //       name: "Leather Weekender Bag",
// //       price: 79.99,
// //       quantity: 1,
// //       image: "/images/placeholder.svg?height=80&width=80",
// //       sku: "BAG-002",
// //     },
// //   ],
// //   customer: {
// //     id: "CUST-001",
// //     name: "John Smith",
// //     email: "john.smith@example.com",
// //     phone: "(555) 123-4567",
// //   },
// //   shippingAddress: {
// //     name: "John Smith",
// //     address: "123 Main Street",
// //     apartment: "Apt 4B",
// //     city: "New York",
// //     state: "NY",
// //     zipCode: "10001",
// //     country: "United States",
// //   },
// //   billingAddress: {
// //     name: "John Smith",
// //     address: "123 Main Street",
// //     apartment: "Apt 4B",
// //     city: "New York",
// //     state: "NY",
// //     zipCode: "10001",
// //     country: "United States",
// //   },
// //   timeline: [
// //     {
// //       status: "Order Placed",
// //       date: "2023-06-12",
// //       time: "14:35:28",
// //       note: "Order was placed by customer",
// //     },
// //     {
// //       status: "Payment Received",
// //       date: "2023-06-12",
// //       time: "14:36:05",
// //       note: "Payment was processed successfully",
// //     },
// //     {
// //       status: "Processing",
// //       date: "2023-06-12",
// //       time: "15:10:22",
// //       note: "Order is being processed",
// //     },
// //   ],
// // }

// // export default function OrderDetailPage({ params }: { params: { id: string } }) {
// //   const router = useRouter()
// //   const { id } = params

// //   const [order, setOrder] = useState<typeof orderData | null>(null)
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [error, setError] = useState("")
// //   const [newStatus, setNewStatus] = useState("")
// //   const [statusNote, setStatusNote] = useState("")
// //   const [isUpdating, setIsUpdating] = useState(false)
// //   const [updateSuccess, setUpdateSuccess] = useState(false)

// //   // Fetch order data
// //   useEffect(() => {
// //     // In a real app, you would fetch the order data from an API
// //     // For this example, we'll use the sample data
// //     setTimeout(() => {
// //       if (id === "ORD-001") {
// //         setOrder(orderData)
// //       } else {
// //         setError("Order not found")
// //       }
// //       setIsLoading(false)
// //     }, 1000)
// //   }, [id])

// //   // Update order status
// //   const handleStatusUpdate = async () => {
// //     if (!newStatus) {
// //       return
// //     }

// //     setIsUpdating(true)

// //     try {
// //       // In a real app, you would call an API to update the order status
// //       await new Promise((resolve) => setTimeout(resolve, 1000))

// //       // Update local state
// //       if (order) {
// //         const updatedTimeline = [
// //           ...order.timeline,
// //           {
// //             status: newStatus,
// //             date: new Date().toISOString().split("T")[0],
// //             time: new Date().toTimeString().split(" ")[0],
// //             note: statusNote || `Order status updated to ${newStatus}`,
// //           },
// //         ]

// //         setOrder({
// //           ...order,
// //           status: newStatus,
// //           timeline: updatedTimeline,
// //         })

// //         setNewStatus("")
// //         setStatusNote("")
// //         setUpdateSuccess(true)

// //         // Clear success message after 3 seconds
// //         setTimeout(() => {
// //           setUpdateSuccess(false)
// //         }, 3000)
// //       }
// //     } catch (err) {
// //       setError("Failed to update order status")
// //     } finally {
// //       setIsUpdating(false)
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="container mx-auto max-w-7xl px-4 py-8">
// //         <div className="flex items-center justify-center h-64">
// //           <div className="text-center">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// //             <p className="mt-4 text-muted-foreground">Loading order details...</p>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (error) {
// //     return (
// //       <div className="container mx-auto max-w-7xl px-4 py-8">
// //         <div className="mb-6 flex items-center gap-2">
// //           <Button variant="outline" size="icon" asChild>
// //             <Link href="/admin/orders">
// //               <ArrowLeft className="h-4 w-4" />
// //             </Link>
// //           </Button>
// //           <h1 className="text-2xl font-bold">Order Details</h1>
// //         </div>

// //         <Alert variant="destructive">
// //           <AlertCircle className="h-4 w-4" />
// //           <AlertTitle>Error</AlertTitle>
// //           <AlertDescription>{error}</AlertDescription>
// //         </Alert>
// //       </div>
// //     )
// //   }

// //   if (!order) {
// //     return null
// //   }

// //   return (
// //     <div className="container mx-auto max-w-7xl px-4 py-8">
// //       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
// //         <div className="flex items-center gap-2">
// //           <Button variant="outline" size="icon" asChild>
// //             <Link href="/admin/orders">
// //               <ArrowLeft className="h-4 w-4" />
// //             </Link>
// //           </Button>
// //           <h1 className="text-2xl font-bold">Order {order.id}</h1>
// //           <Badge
// //             variant={
// //               order.status === "Delivered"
// //                 ? "default"
// //                 : order.status === "Processing"
// //                   ? "secondary"
// //                   : order.status === "Shipped"
// //                     ? "outline"
// //                     : order.status === "Cancelled"
// //                       ? "destructive"
// //                       : "default"
// //             }
// //           >
// //             {order.status}
// //           </Badge>
// //         </div>

// //         <div className="flex flex-wrap gap-2">
// //           <Button variant="outline" size="sm">
// //             <Printer className="mr-2 h-4 w-4" />
// //             Print
// //           </Button>
// //           <Button variant="outline" size="sm">
// //             <Download className="mr-2 h-4 w-4" />
// //             Download Invoice
// //           </Button>
// //           <Button variant="outline" size="sm">
// //             <Mail className="mr-2 h-4 w-4" />
// //             Email Customer
// //           </Button>
// //         </div>
// //       </div>

// //       {updateSuccess && (
// //         <Alert className="mb-6 bg-green-50 border-green-200">
// //           <CheckCircle2 className="h-4 w-4 text-green-600" />
// //           <AlertTitle className="text-green-800">Success</AlertTitle>
// //           <AlertDescription className="text-green-700">Order status has been updated successfully.</AlertDescription>
// //         </Alert>
// //       )}

// //       <div className="grid gap-6 md:grid-cols-3">
// //         <div className="md:col-span-2 space-y-6">
// //           {/* Order Items */}
// //           <Card>
// //             <CardHeader className="pb-3">
// //               <CardTitle>Order Items</CardTitle>
// //               <CardDescription>
// //                 {order.items.length} {order.items.length === 1 ? "item" : "items"} in this order
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 {order.items.map((item) => (
// //                   <div key={item.id} className="flex items-center gap-4">
// //                     <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
// //                       <Image
// //                         src={item.image || "/images/placeholder.svg"}
// //                         alt={item.name}
// //                         width={64}
// //                         height={64}
// //                         className="h-full w-full object-cover"
// //                       />
// //                     </div>
// //                     <div className="flex flex-1 flex-col">
// //                       <div className="flex justify-between">
// //                         <h4 className="font-medium">{item.name}</h4>
// //                         <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
// //                       </div>
// //                       <div className="flex justify-between text-sm text-muted-foreground">
// //                         <div>
// //                           <span>SKU: {item.sku}</span>
// //                           <span className="mx-2">•</span>
// //                           <span>Qty: {item.quantity}</span>
// //                         </div>
// //                         <span>${item.price.toFixed(2)} each</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </CardContent>
// //             <Separator />
// //             <CardFooter className="flex justify-between pt-6">
// //               <div className="space-y-1 text-sm">
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Subtotal:</span>
// //                   <span>${order.subtotal.toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Tax:</span>
// //                   <span>${order.tax.toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Shipping:</span>
// //                   <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
// //                 </div>
// //                 {order.discount > 0 && (
// //                   <div className="flex justify-between text-green-600">
// //                     <span>Discount:</span>
// //                     <span>-${order.discount.toFixed(2)}</span>
// //                   </div>
// //                 )}
// //               </div>
// //               <div className="text-right">
// //                 <div className="text-sm text-muted-foreground">Total</div>
// //                 <div className="text-xl font-bold">${order.total.toFixed(2)}</div>
// //               </div>
// //             </CardFooter>
// //           </Card>

// //           {/* Order Timeline */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Order Timeline</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <ol className="relative border-l border-muted">
// //                 {order.timeline.map((event, index) => (
// //                   <li key={index} className="mb-6 ml-6">
// //                     <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground/20">
// //                       <CheckCircle2 className="h-4 w-4 text-primary" />
// //                     </span>
// //                     <div className="flex items-center gap-2">
// //                       <h3 className="font-medium">{event.status}</h3>
// //                       <Badge variant="outline" className="ml-2">
// //                         {event.date} {event.time}
// //                       </Badge>
// //                     </div>
// //                     {event.note && <p className="text-sm text-muted-foreground mt-1">{event.note}</p>}
// //                   </li>
// //                 ))}
// //               </ol>
// //             </CardContent>
// //           </Card>

// //           {/* Update Status */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Update Order Status</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 <div className="grid gap-4 sm:grid-cols-2">
// //                   <div className="space-y-2">
// //                     <label htmlFor="status" className="text-sm font-medium">
// //                       New Status
// //                     </label>
// //                     <Select value={newStatus} onValueChange={setNewStatus}>
// //                       <SelectTrigger>
// //                         <SelectValue placeholder="Select status" />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         <SelectItem value="Processing">Processing</SelectItem>
// //                         <SelectItem value="Shipped">Shipped</SelectItem>
// //                         <SelectItem value="Delivered">Delivered</SelectItem>
// //                         <SelectItem value="Cancelled">Cancelled</SelectItem>
// //                         <SelectItem value="Refunded">Refunded</SelectItem>
// //                       </SelectContent>
// //                     </Select>
// //                   </div>

// //                   <div className="space-y-2">
// //                     <label htmlFor="note" className="text-sm font-medium">
// //                       Note (Optional)
// //                     </label>
// //                     <Textarea
// //                       id="note"
// //                       placeholder="Add a note about this status update"
// //                       value={statusNote}
// //                       onChange={(e) => setStatusNote(e.target.value)}
// //                     />
// //                   </div>
// //                 </div>

// //                 <Button onClick={handleStatusUpdate} disabled={!newStatus || isUpdating}>
// //                   {isUpdating ? "Updating..." : "Update Status"}
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         <div className="space-y-6">
// //           {/* Order Summary */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Order Summary</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 <div className="flex items-center gap-2">
// //                   <Calendar className="h-4 w-4 text-muted-foreground" />
// //                   <div className="text-sm">
// //                     <span className="font-medium">Date: </span>
// //                     {order.date}
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                   <Clock className="h-4 w-4 text-muted-foreground" />
// //                   <div className="text-sm">
// //                     <span className="font-medium">Time: </span>
// //                     {order.time}
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                   <CreditCard className="h-4 w-4 text-muted-foreground" />
// //                   <div className="text-sm">
// //                     <span className="font-medium">Payment: </span>
// //                     {order.paymentMethod}
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                   <Badge variant={order.paymentStatus === "Paid" ? "default" : "destructive"} className="rounded-sm">
// //                     {order.paymentStatus}
// //                   </Badge>
// //                 </div>

// //                 {order.notes && (
// //                   <>
// //                     <Separator />
// //                     <div className="space-y-2">
// //                       <h4 className="text-sm font-medium">Order Notes</h4>
// //                       <p className="text-sm text-muted-foreground">{order.notes}</p>
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Customer Information */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Customer</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 <div className="flex items-center gap-3">
// //                   <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
// //                     <User className="h-5 w-5 text-muted-foreground" />
// //                   </div>
// //                   <div>
// //                     <h3 className="font-medium">{order.customer.name}</h3>
// //                     <p className="text-sm text-muted-foreground">Customer ID: {order.customer.id}</p>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-2">
// //                   <div className="flex items-center gap-2">
// //                     <Mail className="h-4 w-4 text-muted-foreground" />
// //                     <span className="text-sm">{order.customer.email}</span>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <Phone className="h-4 w-4 text-muted-foreground" />
// //                     <span className="text-sm">{order.customer.phone}</span>
// //                   </div>
// //                 </div>

// //                 <Button variant="outline" size="sm" className="w-full" asChild>
// //                   <Link href={`/admin/customers/${order.customer.id}`}>View Customer</Link>
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Shipping & Billing */}
// //           <Card>
// //             <CardHeader className="pb-3">
// //               <CardTitle>Addresses</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <Tabs defaultValue="shipping">
// //                 <TabsList className="grid w-full grid-cols-2">
// //                   <TabsTrigger value="shipping">Shipping</TabsTrigger>
// //                   <TabsTrigger value="billing">Billing</TabsTrigger>
// //                 </TabsList>
// //                 <TabsContent value="shipping" className="pt-4">
// //                   <div className="space-y-1">
// //                     <div className="font-medium">{order.shippingAddress.name}</div>
// //                     <div className="text-sm">{order.shippingAddress.address}</div>
// //                     {order.shippingAddress.apartment && (
// //                       <div className="text-sm">{order.shippingAddress.apartment}</div>
// //                     )}
// //                     <div className="text-sm">
// //                       {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
// //                     </div>
// //                     <div className="text-sm">{order.shippingAddress.country}</div>
// //                   </div>
// //                 </TabsContent>
// //                 <TabsContent value="billing" className="pt-4">
// //                   <div className="space-y-1">
// //                     <div className="font-medium">{order.billingAddress.name}</div>
// //                     <div className="text-sm">{order.billingAddress.address}</div>
// //                     {order.billingAddress.apartment && <div className="text-sm">{order.billingAddress.apartment}</div>}
// //                     <div className="text-sm">
// //                       {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
// //                     </div>
// //                     <div className="text-sm">{order.billingAddress.country}</div>
// //                   </div>
// //                 </TabsContent>
// //               </Tabs>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // // Phone icon component
// // function Phone(props: React.SVGProps<SVGSVGElement>) {
// //   return (
// //     <svg
// //       {...props}
// //       xmlns="http://www.w3.org/2000/svg"
// //       width="24"
// //       height="24"
// //       viewBox="0 0 24 24"
// //       fill="none"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     >
// //       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
// //     </svg>
// //   )
// // }

// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import { ArrowLeft, Calendar, Clock, Package, Truck, CheckCircle2, Download, ChevronRight } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"

// // import { CartProvider } from "@/components/cart-provider"

// // Sample order data - in a real app, this would be fetched from an API
// const orderData = {
//   id: "ORD-001",
//   date: "2023-06-12",
//   time: "14:35:28",
//   status: "Delivered",
//   total: 129.99,
//   subtotal: 119.99,
//   tax: 10.0,
//   shipping: 0.0,
//   discount: 0.0,
//   paymentMethod: "Credit Card",
//   paymentStatus: "Paid",
//   notes: "Please leave package at the front door",
//   items: [
//     {
//       id: "1",
//       name: "Minimalist Desk Lamp",
//       price: 49.99,
//       quantity: 1,
//       image: "/placeholder.svg?height=80&width=80",
//       sku: "LAMP-001",
//     },
//     {
//       id: "2",
//       name: "Leather Weekender Bag",
//       price: 79.99,
//       quantity: 1,
//       image: "/placeholder.svg?height=80&width=80",
//       sku: "BAG-002",
//     },
//   ],
//   customer: {
//     id: "CUST-001",
//     name: "John Smith",
//     email: "john.smith@example.com",
//     phone: "(555) 123-4567",
//   },
//   shippingAddress: {
//     name: "John Smith",
//     address: "123 Main Street",
//     apartment: "Apt 4B",
//     city: "New York",
//     state: "NY",
//     zipCode: "10001",
//     country: "United States",
//   },
//   billingAddress: {
//     name: "John Smith",
//     address: "123 Main Street",
//     apartment: "Apt 4B",
//     city: "New York",
//     state: "NY",
//     zipCode: "10001",
//     country: "United States",
//   },
//   timeline: [
//     {
//       status: "Order Placed",
//       date: "2023-06-12",
//       time: "14:35:28",
//       note: "Order was placed by customer",
//     },
//     {
//       status: "Payment Received",
//       date: "2023-06-12",
//       time: "14:36:05",
//       note: "Payment was processed successfully",
//     },
//     {
//       status: "Processing",
//       date: "2023-06-13",
//       time: "09:10:22",
//       note: "Order is being processed",
//     },
//     {
//       status: "Shipped",
//       date: "2023-06-14",
//       time: "11:25:18",
//       note: "Order has been shipped via USPS",
//     },
//     {
//       status: "Delivered",
//       date: "2023-06-16",
//       time: "15:42:33",
//       note: "Package was delivered",
//     },
//   ],
// }

// export default function OrderDetailPage({ params }: { params: { id: string } }) {
//   const router = useRouter()
//   const { id } = params

//   const [order, setOrder] = useState<typeof orderData | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState("")

//   // Fetch order data
//   useEffect(() => {
//     // In a real app, you would fetch the order data from an API
//     // For this example, we'll use the sample data
//     setTimeout(() => {
//       if (id === "ORD-001") {
//         setOrder(orderData)
//       } else {
//         setError("Order not found")
//       }
//       setIsLoading(false)
//     }, 1000)
//   }, [id])

//   if (isLoading) {
//     return (
//       // <CartProvider>
//         <div className="flex min-h-screen flex-col">
//           <header className="sticky top-0 z-40 border-b bg-background">
//             <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center">
//               {/* <MainNav /> */}
//             </div>
//           </header>
//           <main className="flex-1">
//             <div className="container mx-auto max-w-7xl px-4 py-8">
//               <div className="flex items-center justify-center h-64">
//                 <div className="text-center">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//                   <p className="mt-4 text-muted-foreground">Loading order details...</p>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       // </CartProvider>
//     )
//   }

//   if (error || !order) {
//     return (
//       // <CartProvider>
//         <div className="flex min-h-screen flex-col">
//           <header className="sticky top-0 z-40 border-b bg-background">
//             <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center">
//               {/* <MainNav /> */}
//             </div>
//           </header>
//           <main className="flex-1">
//             <div className="container mx-auto max-w-7xl px-4 py-8">
//               <div className="mb-6 flex items-center gap-2">
//                 <Button variant="outline" size="icon" asChild>
//                   <Link href="/user/dashboard">
//                     <ArrowLeft className="h-4 w-4" />
//                   </Link>
//                 </Button>
//                 <h1 className="text-2xl font-bold">Order Details</h1>
//               </div>

//               <div className="rounded-md border bg-destructive/10 p-4 text-destructive">
//                 <h2 className="font-semibold">Error</h2>
//                 <p>{error || "Failed to load order details"}</p>
//               </div>
//             </div>
//           </main>
//         </div>
//       // </CartProvider>
//     )
//   }

//   return (
//     // <CartProvider>
//       <div className="flex min-h-screen flex-col">
//         <header className="sticky top-0 z-40 border-b bg-background">
//           <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center">
//             {/* <MainNav /> */}
//           </div>
//         </header>
//         <main className="flex-1">
//           <div className="container mx-auto max-w-7xl px-4 py-8">
//             <div className="mb-6 flex items-center text-sm text-muted-foreground">
//               <Link href="/" className="hover:text-foreground">
//                 Home
//               </Link>
//               <ChevronRight className="mx-1 h-4 w-4" />
//               <Link href="/user/dashboard" className="hover:text-foreground">
//                 My Account
//               </Link>
//               <ChevronRight className="mx-1 h-4 w-4" />
//               <Link href="/user/dashboard?tab=orders" className="hover:text-foreground">
//                 Orders
//               </Link>
//               <ChevronRight className="mx-1 h-4 w-4" />
//               <span className="text-foreground">{order.id}</span>
//             </div>

//             <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex items-center gap-2">
//                 <Button variant="outline" size="icon" asChild>
//                   <Link href="/user/dashboard?tab=orders">
//                     <ArrowLeft className="h-4 w-4" />
//                   </Link>
//                 </Button>
//                 <h1 className="text-2xl font-bold">Order {order.id}</h1>
//                 <OrderStatusBadge status={order.status} />
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 <Button variant="outline" size="sm" asChild>
//                   <Link href={`/user/orders/${order.id}/invoice`}>
//                     <Download className="mr-2 h-4 w-4" />
//                     Download Invoice
//                   </Link>
//                 </Button>
//               </div>
//             </div>

//             <div className="grid gap-6 md:grid-cols-3">
//               <div className="md:col-span-2 space-y-6">
//                 {/* Order Items */}
//                 <Card>
//                   <CardHeader className="pb-3">
//                     <CardTitle>Order Items</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {order.items.map((item) => (
//                         <div key={item.id} className="flex items-center gap-4">
//                           <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
//                             <Image
//                               src={item.image || "/placeholder.svg"}
//                               alt={item.name}
//                               width={64}
//                               height={64}
//                               className="h-full w-full object-cover"
//                             />
//                           </div>
//                           <div className="flex flex-1 flex-col">
//                             <div className="flex justify-between">
//                               <h4 className="font-medium">{item.name}</h4>
//                               <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
//                             </div>
//                             <div className="flex justify-between text-sm text-muted-foreground">
//                               <div>
//                                 <span>SKU: {item.sku}</span>
//                                 <span className="mx-2">•</span>
//                                 <span>Qty: {item.quantity}</span>
//                               </div>
//                               <span>${item.price.toFixed(2)} each</span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                   <Separator />
//                   <div className="p-6">
//                     <div className="space-y-1 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Subtotal:</span>
//                         <span>${order.subtotal.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Tax:</span>
//                         <span>${order.tax.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Shipping:</span>
//                         <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
//                       </div>
//                       {order.discount > 0 && (
//                         <div className="flex justify-between text-green-600">
//                           <span>Discount:</span>
//                           <span>-${order.discount.toFixed(2)}</span>
//                         </div>
//                       )}
//                       <Separator className="my-2" />
//                       <div className="flex justify-between font-bold">
//                         <span>Total:</span>
//                         <span>${order.total.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>

//                 {/* Order Timeline */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Order Timeline</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ol className="relative border-l border-muted">
//                       {order.timeline.map((event, index) => (
//                         <li key={index} className="mb-6 ml-6">
//                           <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground/20">
//                             <CheckCircle2 className="h-4 w-4 text-primary" />
//                           </span>
//                           <div className="flex items-center gap-2">
//                             <h3 className="font-medium">{event.status}</h3>
//                             <Badge variant="outline" className="ml-2">
//                               {event.date} {event.time}
//                             </Badge>
//                           </div>
//                           {event.note && <p className="text-sm text-muted-foreground mt-1">{event.note}</p>}
//                         </li>
//                       ))}
//                     </ol>
//                   </CardContent>
//                 </Card>
//               </div>

//               <div className="space-y-6">
//                 {/* Order Summary */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Order Summary</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-2">
//                         <Calendar className="h-4 w-4 text-muted-foreground" />
//                         <div className="text-sm">
//                           <span className="font-medium">Date: </span>
//                           {order.date}
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Clock className="h-4 w-4 text-muted-foreground" />
//                         <div className="text-sm">
//                           <span className="font-medium">Time: </span>
//                           {order.time}
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Package className="h-4 w-4 text-muted-foreground" />
//                         <div className="text-sm">
//                           <span className="font-medium">Payment: </span>
//                           {order.paymentMethod}
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <PaymentStatusBadge status={order.paymentStatus} />
//                       </div>

//                       {order.notes && (
//                         <>
//                           <Separator />
//                           <div className="space-y-2">
//                             <h4 className="text-sm font-medium">Order Notes</h4>
//                             <p className="text-sm text-muted-foreground">{order.notes}</p>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Shipping Information */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Shipping Information</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-2">
//                         <Truck className="h-4 w-4 text-muted-foreground" />
//                         <h3 className="text-sm font-medium">Shipping Address</h3>
//                       </div>

//                       <div className="space-y-1 text-sm">
//                         <p className="font-medium">{order.shippingAddress.name}</p>
//                         <p>{order.shippingAddress.address}</p>
//                         {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
//                         <p>
//                           {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
//                         </p>
//                         <p>{order.shippingAddress.country}</p>
//                       </div>

//                       <Separator />

//                       <div className="flex items-center gap-2">
//                         <Package className="h-4 w-4 text-muted-foreground" />
//                         <h3 className="text-sm font-medium">Billing Address</h3>
//                       </div>

//                       <div className="space-y-1 text-sm">
//                         <p className="font-medium">{order.billingAddress.name}</p>
//                         <p>{order.billingAddress.address}</p>
//                         {order.billingAddress.apartment && <p>{order.billingAddress.apartment}</p>}
//                         <p>
//                           {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
//                         </p>
//                         <p>{order.billingAddress.country}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </main>

//       </div>
//     // </CartProvider>
//   )
// }

// // Order status badge component
// function OrderStatusBadge({ status }: { status: string }) {
//   let variant = "default"

//   switch (status) {
//     case "Processing":
//       variant = "secondary"
//       break
//     case "Shipped":
//       variant = "default"
//       break
//     case "Delivered":
//       variant = "success"
//       break
//     case "Cancelled":
//       variant = "destructive"
//       break
//     default:
//       variant = "outline"
//   }

//   return <Badge variant={variant as any}>{status}</Badge>
// }

// // Payment status badge component
// function PaymentStatusBadge({ status }: { status: string }) {
//   let variant = "default"

//   switch (status) {
//     case "Paid":
//       variant = "success"
//       break
//     case "Pending":
//       variant = "warning"
//       break
//     case "Refunded":
//       variant = "secondary"
//       break
//     case "Failed":
//       variant = "destructive"
//       break
//     default:
//       variant = "outline"
//   }

//   return <Badge variant={variant as any}>{status}</Badge>
// }

import React from 'react';

const OrderDetailPage = () => {
  return <div>OrderDetailPage</div>;
};

export default OrderDetailPage;

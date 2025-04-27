// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { useCart } from '../../lib/cart-context';
// import { useAuth } from '../../lib/auth-context';
// import { Button } from '../../components/ui/button';
// import { Textarea } from '../../components/ui/textarea';
// import axiosInstance from '../../lib/axiosInstance';

// export default function CheckoutPage() {
//   const { cart, cartCount, clearCart } = useCart();
//   const { isLoggedIn, checkAuth } = useAuth();
//   const router = useRouter();
//   const [customNotes, setCustomNotes] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';

//   const totalPrice = cart.reduce((total, item) => {
//     const price = parseFloat(item.selling_price);
//     return total + (isNaN(price) ? 0 : price * item.quantity);
//   }, 0);

//   const handleCheckout = async () => {
//     setIsLoading(true);
//     try {
//       const isAuthenticated = await checkAuth();
//       if (!isAuthenticated) {
//         // Redirect to login with return URL
//         router.push(`/apps/login?returnUrl=/checkout`);
//         return;
//       }

//       // Create order (replace with your actual API endpoint)
//       await axiosInstance.post('/orders/create', {
//         cart,
//         customNotes,
//         total: totalPrice.toFixed(2),
//       });

//       // Clear cart after successful order
//       clearCart();

//       // Redirect to order confirmation (replace with your confirmation page)
//       router.push('/checkout/confirm');
//     } catch (error) {
//       console.error('Checkout error:', error);
//       alert('Failed to process checkout. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (cartCount === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-600">
//         Your cart is empty.{' '}
//         <a href="/" className="text-[#1a7ec2] hover:underline">
//           Continue shopping
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-serif text-gray-800">Checkout</h2>
//         <div className="border-t border-gray-300 flex-grow ml-4"></div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Cart Summary */}
//         <div className="w-full md:w-2/3">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
//           <div className="flex flex-col gap-4">
//             {cart.map((item) => {
//               const price = parseFloat(item.selling_price);
//               return (
//                 <div key={item.product_id} className="flex gap-4 border-b pb-4">
//                   <div className="w-[150px] h-[150px]">
//                     <Image
//                       src={item.image_url || FALLBACK_IMAGE}
//                       alt={item.product_name || 'Product'}
//                       width={150}
//                       height={150}
//                       className="w-full h-full object-cover"
//                       style={{ objectFit: 'cover' }}
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <a
//                       href={`/${item.category_slug}/${item.slug}`}
//                       className="text-sm hover:underline"
//                     >
//                       {item.product_name || 'Unknown Product'}
//                     </a>
//                     <div className="text-sm text-gray-600 mt-1">By Elifein</div>
//                     <div className="mt-2">
//                       <span className="text-red-600 font-bold">
//                         ₹{isNaN(price) ? 'N/A' : price.toFixed(2)}
//                       </span>
//                       <span className="text-gray-600 ml-2">x {item.quantity}</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-4 text-right">
//             <div className="text-lg font-bold text-[#1a4e78]">
//               Total: ₹{totalPrice.toFixed(2)}
//             </div>
//           </div>
//         </div>

//         {/* Custom Notes and Checkout */}
//         <div className="w-full md:w-1/3">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
//           <div className="mb-4">
//             <label htmlFor="customNotes" className="block text-sm text-gray-600 mb-2">
//               Custom Notes (Optional)
//             </label>
//             <Textarea
//               id="customNotes"
//               value={customNotes}
//               onChange={(e) => setCustomNotes(e.target.value)}
//               placeholder="Enter any delivery instructions or special requests..."
//               className="w-full border-gray-300 focus:ring-[#1a7ec2]"
//               rows={5}
//             />
//           </div>
//           <Button
//             onClick={handleCheckout}
//             disabled={isLoading || cartCount === 0}
//             className="w-full bg-[#1a7ec2] hover:bg-[#1a4e78] text-white"
//           >
//             {isLoading ? 'Processing...' : 'Checkout'}
//           </Button>
//           {!isLoggedIn && (
//             <p className="mt-2 text-sm text-gray-600">
//               You need to{' '}
//               <a href="/apps/login?returnUrl=/checkout" className="text-[#1a7ec2] hover:underline">
//                 log in
//               </a>{' '}
//               or{' '}
//               <a href="/apps/register" className="text-[#1a7ec2] hover:underline">
//                 create an account
//               </a>{' '}
//               to proceed.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { useCart } from '../../lib/cart-context';
// import { useAuth } from '../../lib/auth-context';
// import { Button } from '../../components/ui/button';
// import { Textarea } from '../../components/ui/textarea';

// export default function CheckoutPage() {
//   const { cart, cartCount, clearCart } = useCart();
//   const { isLoggedIn, checkAuth } = useAuth();
//   const router = useRouter();
//   const [customNotes, setCustomNotes] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';

//   const totalPrice = cart.reduce((total, item) => {
//     const price = parseFloat(item.selling_price);
//     console.log('Calculating price for item:', { item, price });
//     return total + (isNaN(price) ? 0 : price * item.quantity);
//   }, 0);

//   const handleCheckout = async () => {
//     setIsLoading(true);
//     console.log('Starting checkout:', { isLoggedIn, cartCount, totalPrice, customNotes });
//     try {
//       const isAuthenticated = await checkAuth();
//       console.log('Authentication check result:', isAuthenticated);
//       if (!isAuthenticated) {
//         console.log('Not authenticated, redirecting to login');
//         router.push(`/apps/login?returnUrl=/checkout`);
//         return;
//       }

//       // Simulate order creation with dummy data
//       const order = {
//         cart,
//         customNotes,
//         total: totalPrice.toFixed(2),
//         timestamp: Date.now(),
//       };
//       console.log('Creating order:', order);
//       // Store order in localStorage for debugging
//       const orders = JSON.parse(localStorage.getItem('orders') || '[]');
//       orders.push(order);
//       localStorage.setItem('orders', JSON.stringify(orders));
//       // Mock delay to simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Clear cart
//       console.log('Clearing cart');
//       clearCart();

//       // Redirect to order confirmation
//       console.log('Redirecting to /checkout/confirm');
//       router.push('/checkout/confirm');
//     } catch (error) {
//       console.error('Checkout error:', error);
//       alert('Failed to process checkout. Please check console for details.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (cartCount === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center text-gray-600">
//         Your cart is empty.{' '}
//         <a href="/" className="text-[#1a7ec2] hover:underline">
//           Continue shopping
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-serif text-gray-800">Checkout</h2>
//         <div className="border-t border-gray-300 flex-grow ml-4"></div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Cart Summary */}
//         <div className="w-full md:w-2/3">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
//           <div className="flex flex-col gap-4">
//             {cart.map((item) => {
//               const price = parseFloat(item.selling_price);
//               return (
//                 <div key={item.product_id} className="flex gap-4 border-b pb-4">
//                   <div className="w-[150px] h-[150px]">
//                     <Image
//                       src={item.image_url || FALLBACK_IMAGE}
//                       alt={item.product_name || 'Product'}
//                       width={150}
//                       height={150}
//                       className="w-full h-full object-cover"
//                       style={{ objectFit: 'cover' }}
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <a
//                       href={`/${item.category_slug}/${item.slug}`}
//                       className="text-sm hover:underline"
//                     >
//                       {item.product_name || 'Unknown Product'}
//                     </a>
//                     <div className="text-sm text-gray-600 mt-1">By Elifein</div>
//                     <div className="mt-2">
//                       <span className="text-red-600 font-bold">
//                         ₹{isNaN(price) ? 'N/A' : price.toFixed(2)}
//                       </span>
//                       <span className="text-gray-600 ml-2">x {item.quantity}</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-4 text-right">
//             <div className="text-lg font-bold text-[#1a7ec2]">
//               Total: ₹{totalPrice.toFixed(2)}
//             </div>
//           </div>
//         </div>

//         {/* Custom Notes and Checkout */}
//         <div className="w-full md:w-1/3">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
//           <div className="mb-4">
//             <label htmlFor="customNotes" className="block text-sm text-gray-600 mb-2">
//               Custom Notes (Optional)
//             </label>
//             <Textarea
//               id="customNotes"
//               value={customNotes}
//               onChange={(e) => setCustomNotes(e.target.value)}
//               placeholder="Enter any delivery instructions or special requests..."
//               className="w-full border-gray-300 focus:ring-[#1a7ec2]"
//               rows={5}
//             />
//           </div>
//           <Button
//             onClick={handleCheckout}
//             disabled={isLoading || cartCount === 0}
//             className="w-full bg-[#1a7ec2] hover:bg-[#1a4e78] text-white"
//           >
//             {isLoading ? 'Processing...' : 'Checkout'}
//           </Button>
//           {!isLoggedIn && (
//             <p className="mt-2 text-sm text-gray-600">
//               You need to{' '}
//               <a href="/apps/login?returnUrl=/checkout" className="text-[#1a7ec2] hover:underline">
//                 log in
//               </a>{' '}
//               or{' '}
//               <a href="/apps/register" className="text-[#1a7ec2] hover:underline">
//                 create an account
//               </a>{' '}
//               to proceed.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../../lib/cart-context';
import { useAuth } from '../../lib/auth-context';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartCount, clearCart } = useCart();
  const { isLoggedIn, checkAuth } = useAuth();
  const router = useRouter();
  const [customNotes, setCustomNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.selling_price);
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push(`/apps/login?returnUrl=/checkout`);
        return;
      }

      // Simulate order creation with dummy data
      const order = {
        cart,
        customNotes,
        total: totalPrice.toFixed(2),
        timestamp: Date.now(),
      };
      // Store order in localStorage for debugging
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      // Mock delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear cart
      clearCart();

      // Redirect to order confirmation
      router.push('/checkout/confirm');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process checkout. Please check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        Your cart is empty.{' '}
        <Link href="/" className="text-[#1a7ec2] hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif text-gray-800">Checkout</h2>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Summary */}
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
          <div className="flex flex-col gap-4">
            {cart.map((item) => {
              const price = parseFloat(item.selling_price);
              return (
                <div key={item.product_id} className="flex gap-4 border-b pb-4">
                  <div className="w-[150px] h-[150px]">
                    <Image
                      src={item.image_url || FALLBACK_IMAGE}
                      alt={item.product_name || 'Product'}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/${item.category_slug}/${item.slug}`}
                      className="text-sm hover:underline"
                    >
                      {item.product_name || 'Unknown Product'}
                    </Link>
                    <div className="text-sm text-gray-600 mt-1">By Elifein</div>
                    <div className="mt-2">
                      <span className="text-red-600 font-bold">
                        ₹{isNaN(price) ? 'N/A' : price.toFixed(2)}
                      </span>
                      <span className="text-gray-600 ml-2">x {item.quantity}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-right">
            <div className="text-lg font-bold text-[#1a7ec2]">
              Total: ₹{totalPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Custom Notes and Checkout */}
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
          <div className="mb-4">
            <label htmlFor="customNotes" className="block text-sm text-gray-600 mb-2">
              Custom Notes (Optional)
            </label>
            <Textarea
              id="customNotes"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Enter any delivery instructions or special requests..."
              className="w-full border-gray-300 focus:ring-[#1a7ec2]"
              rows={5}
            />
          </div>
          <Button
            onClick={handleCheckout}
            disabled={isLoading || cartCount === 0}
            className="w-full bg-[#1a7ec2] hover:bg-[#1a4e78] text-white"
          >
            {isLoading ? 'Processing...' : 'Checkout'}
          </Button>
          {!isLoggedIn && (
            <p className="mt-2 text-sm text-gray-600">
              You need to{' '}
              <Link href="/apps/login?returnUrl=/checkout" className="text-[#1a7ec2] hover:underline">
                log in
              </Link>{' '}
              or{' '}
              <Link href="/apps/register" className="text-[#1a7ec2] hover:underline">
                create an account
              </Link>{' '}
              to proceed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

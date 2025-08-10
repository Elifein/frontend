'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../../lib/cart-context';
import { useAuth } from '../../lib/auth-context';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';
import Link from 'next/link';
import axiosInstance from '../../lib/axiosInstance';
import { RazorpayOptions } from '@/src/razorpay';

// Import the HOC for protection
import withUserAuth from '../../lib/withUserAuth';

function CheckoutPageComponent() {
  const { cart, cartCount, clearCart } = useCart();
  const { user, token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [customNotes, setCustomNotes] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.selling_price);
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Helper function to get user_id from multiple possible sources
  const getUserId = () => {
    // First, try to get from user context
    if (user?.user_id) {
      return user.user_id;
    }

    // Fallback: try to get from localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.user_id) {
          return parsedUser.user_id;
        }
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
    }

    // Another fallback: check for user_login_id if that's what you're using
    if (user?.user_login_id) {
      return user.user_login_id;
    }

    return null;
  };

  const handleCheckout = async () => {
    if (!shippingAddress.trim()) {
      alert('Please provide a shipping address');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (totalPrice <= 0) {
      alert('Invalid order total');
      return;
    }

    // Get user ID from available sources
    const userId = getUserId();
    
    if (!userId) {
      console.error('User ID not found in context or localStorage');
      alert('User authentication error. Please login again.');
      const returnUrl = encodeURIComponent('/checkout');
      router.push(`/apps/login?returnUrl=${returnUrl}`);
      return;
    }

    setCheckoutLoading(true);
    try {
      console.log('Checkout debug:', {
        token: !!token,
        user: !!user,
        userId: userId, // Log the user ID we're using
        shippingAddress,
        cartItems: cart.length,
        totalPrice
      });

      if (!token || !isAuthenticated) {
        console.log('withUserAuth should have handled this, but user is not authenticated');
        const returnUrl = encodeURIComponent('/checkout');
        router.push(`/apps/login?returnUrl=${returnUrl}`);
        return;
      }

      // Prepare order data with explicit user_id
      const orderData = {
        user_id: userId, // Explicitly include user_id
        shipping_address: shippingAddress,
        custom_notes: customNotes,
        items: cart.map(item => ({
          product_id: item.product_id,
          product_name: item.product_name,
          quantity: item.quantity,
          selling_price: parseFloat(item.selling_price),
          category_slug: item.category_slug,
          slug: item.slug,
          image_url: item.image_url
        })),
        total_amount: totalPrice
      };

      console.log('Order data with user_id:', orderData);
      console.log('Using token:', token.substring(0, 20) + '...');

      // Create order via API - token will be added automatically by interceptor
      const response = await axiosInstance.post('/orders', orderData);

      console.log('Order API response:', response.data);

      const order = response.data;

      // Initialize Razorpay checkout
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: totalPrice * 100, // Convert to paise
        currency: 'INR',
        order_id: order.razorpay_order_id,
        name: 'Your Store Name',
        description: 'Order Payment',
        image: '/logo.png',
        handler: async function (response: { 
          razorpay_payment_id: string; 
          razorpay_order_id: string; 
          razorpay_signature: string 
        }) {
          try {
            // Verify payment - token will be added automatically by interceptor
            await axiosInstance.post('/orders/verify-payment', response);
            
            clearCart();
            router.push('/checkout/confirm');
          } catch (error: any) {
            console.error('Payment verification failed:', error.response?.data || error.message);
            alert('Payment verification failed. Please contact support.');
            setCheckoutLoading(false);
          }
        },
        prefill: {
          name: user?.user_firstname || 'User',
          email: user?.user_email,
          contact: user?.phone || ''
        },
        theme: {
          color: '#1a7ec2'
        },
        modal: {
          ondismiss: () => {
            setCheckoutLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Checkout error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      
      // Show more specific error message
      let errorMessage = 'Failed to process checkout. Please try again.';
      
      if (error.response?.status === 401) {
        errorMessage = 'Authentication failed. Please login again.';
        const returnUrl = encodeURIComponent('/checkout');
        router.push(`/apps/login?returnUrl=${returnUrl}`);
        return;
      } else if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || 'Invalid order data. Please check your information.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      alert(errorMessage);
      setCheckoutLoading(false);
    }
  };

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-serif text-gray-800 mb-4">Your cart is empty</h2>
          <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            href="/" 
            className="inline-block bg-[#1a7ec2] hover:bg-[#1a4e78] text-white px-6 py-2 rounded-md transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif text-gray-800">Checkout</h2>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Customer Information</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p><strong>Name:</strong> {user?.user_firstname || 'Not provided'} {user?.user_lastname || ''}</p>
          <p><strong>Email:</strong> {user?.user_email || 'Not provided'}</p>
          <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
          <p><strong>User ID:</strong> {getUserId() || 'Not found'}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
          <div className="flex flex-col gap-4">
            {cart.map((item) => {
              const price = parseFloat(item.selling_price);
              const itemTotal = isNaN(price) ? 0 : price * item.quantity;
              
              return (
                <div key={item.product_id} className="flex gap-4 border-b pb-4 last:border-b-0">
                  <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] flex-shrink-0">
                    <Image
                      src={item.image_url || FALLBACK_IMAGE}
                      alt={item.product_name || 'Product'}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover rounded-md"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/${item.category_slug}/${item.slug}`}
                      className="text-sm hover:underline block truncate font-medium"
                    >
                      {item.product_name || 'Unknown Product'}
                    </Link>
                    <div className="text-sm text-gray-600 mt-1">By Elifein</div>
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-red-600 font-bold">
                        ₹{isNaN(price) ? 'N/A' : price.toFixed(2)}
                      </span>
                      <span className="text-gray-600">× {item.quantity}</span>
                      <span className="text-sm font-semibold text-gray-800">
                        = ₹{itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-xl font-bold text-[#1a7ec2]">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Shipping Information
            </h3>
            
            <div className="mb-6">
              <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Address
              </label>
              <Textarea
                id="shippingAddress"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your complete shipping address..."
                className="w-full border-gray-300 focus:ring-[#1a7ec2] focus:border-[#1a7ec2]"
                rows={4}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="customNotes" className="block text-sm font-medium text-gray-700 mb-2">
                Order Notes (Optional)
              </label>
              <Textarea
                id="customNotes"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Enter any delivery instructions, special requests, or notes about your order..."
                className="w-full border-gray-300 focus:ring-[#1a7ec2] focus:border-[#1a7ec2]"
                rows={4}
              />
            </div>

            <div className="bg-white rounded-lg p-4 mb-4 border">
              <h4 className="font-medium text-gray-800 mb-2">Order Summary</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Items ({cartCount}):</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-[#1a7ec2]">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleCheckout}
              disabled={checkoutLoading || cartCount === 0 || !shippingAddress.trim()}
              className="w-full bg-[#1a7ec2] hover:bg-[#1a4e78] text-white py-3"
            >
              {checkoutLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </>
              ) : (
                'Proceed to Payment'
              )}
            </Button>

            <div className="mt-4 text-xs text-gray-600 space-y-1">
              <p>✓ Secure checkout with Razorpay</p>
              <p>✓ Free shipping on all orders</p>
              <p>✓ Easy returns within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the component wrapped with authentication
export default withUserAuth(CheckoutPageComponent, { 
  redirectTo: '/apps/login',
  requireAuth: true 
});
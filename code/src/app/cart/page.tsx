'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../lib/cart-context';
import { Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.selling_price);
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif text-gray-800">Your Cart</h2>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          Your cart is empty. <Link href="/" className="text-[#1a7ec2] hover:underline">Continue shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {cart.map((item) => {
              const price = parseFloat(item.selling_price);
              return (
                <div key={item.product_id} className="flex flex-col sm:flex-row gap-4 border-b pb-4">
                  <div className="w-full sm:w-1/6">
                    <div className="relative">
                      <div className="w-[150px] h-[150px] mx-auto">
                        <Image
                          src={item.image_url || FALLBACK_IMAGE}
                          alt={item.product_name || 'Product'}
                          width={150}
                          height={150}
                          className="w-full h-full object-cover"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </div>
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
                    </div>
                    <div className="flex items-center mt-2">
                      <label htmlFor={`quantity-${item.product_id}`} className="mr-2 text-sm">Qty:</label>
                      <select
                        id={`quantity-${item.product_id}`}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value))}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center">
            <Button
              onClick={clearCart}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Clear Cart
            </Button>
            <div className="text-right">
              <div className="text-lg font-bold text-[#1a4e78]">
                Total: ₹{totalPrice.toFixed(2)}
              </div>
              <Button
                onClick={handleCheckout}
                className="mt-2 bg-[#1a7ec2] hover:bg-[#1a4e78]"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
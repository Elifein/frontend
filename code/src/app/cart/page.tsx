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
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-serif text-gray-800">Your Cart</h2>
        <div className="hidden sm:block border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 text-sm sm:text-base">
          Your cart is empty.{' '}
          <Link href="/" className="text-[#1a7ec2] hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-4">
            {cart.map((item) => {
              const price = parseFloat(item.selling_price);
              return (
                <div
                  key={item.product_id}
                  className="flex flex-col sm:flex-row gap-4 border-b pb-4"
                >
                  <div className="w-full sm:w-32 md:w-40">
                    <div className="relative mx-auto w-[120px] h-[120px] sm:w-[100px] sm:h-[100px] md:w-[140px] md:h-[140px]">
                      <Image
                        src={item.image_url || FALLBACK_IMAGE}
                        alt={item.product_name || 'Product'}
                        fill
                        className="object-cover"
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 120px, (max-width: 768px) 100px, 140px"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <Link
                      href={`/${item.category_slug}/${item.slug}`}
                      className="text-sm sm:text-base hover:underline"
                    >
                      {item.product_name || 'Unknown Product'}
                    </Link>
                    <div className="text-xs sm:text-sm text-gray-600">By Elifein</div>
                    <div className="mt-1">
                      <span className="text-red-600 font-bold text-sm sm:text-base">
                        ₹{isNaN(price) ? 'N/A' : price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 mt-2">
                      <label
                        htmlFor={`quantity-${item.product_id}`}
                        className="text-xs sm:text-sm"
                      >
                        Qty:
                      </label>
                      <select
                        id={`quantity-${item.product_id}`}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value))}
                        className="border rounded px-2 py-1 text-xs sm:text-sm w-16 sm:w-20"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <Button
              onClick={clearCart}
              className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto text-sm sm:text-base"
            >
              Clear Cart
            </Button>
            <div className="text-center sm:text-right">
              <div className="text-base sm:text-lg font-bold text-[#1a4e78]">
                Total: ₹{totalPrice.toFixed(2)}
              </div>
              <Button
                onClick={handleCheckout}
                className="mt-2 bg-[#1a7ec2] hover:bg-[#1a4e78] w-full sm:w-auto text-sm sm:text-base"
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
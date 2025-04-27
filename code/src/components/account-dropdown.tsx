"use client"

import { useState } from "react"
import Link from "next/link"
import { User, ChevronDown, LogIn, ShoppingBag, Heart, GiftIcon, History } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export function AccountDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="flex items-center">
            <User className="h-6 w-6 text-[#1a4e78]" />
            <ChevronDown className="h-4 w-4 text-[#1a4e78]" />
          </div>
          <span className="text-xs">ACCOUNT</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isLoggedIn ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/apps/account" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/apps/order-status" className="flex items-center">
                <History className="mr-2 h-4 w-4" />
                <span>Order History</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/Christian/Books/wishlist" className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                <span>Wishlist</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/apps/gift-card" className="flex items-center">
                <GiftIcon className="mr-2 h-4 w-4" />
                <span>Gift Cards</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Sign Out</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/apps/login" className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Sign In</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/apps/login?create=true" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Create Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/apps/order-status" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Track Order</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client";

import Link from "next/link";
import { Search, User, ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 px-4 py-3 bg-[#EFEFEB] dark:bg-black transition-colors">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between bg-white dark:bg-dark rounded-full px-6 py-3 shadow-sm max-w-7xl mx-auto transition-colors">
        
        {/* Left */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            New Drops 🔥
          </Link>

          <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
            Men <span className="text-xs">▾</span>
          </button>

          <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
            Women <span className="text-xs">▾</span>
          </button>
        </div>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="text-2xl font-black tracking-tight text-black dark:text-white">
            KICKS
          </span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-3">
            <ThemeToggle /> 
          {[
            <Search key="s" size={16} />,
            <User key="u" size={16} />,
          ].map((icon, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {icon}
            </button>
          ))}

          <Link href="/cart" className="relative">
            <button className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <ShoppingCart size={16} />
            </button>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange rounded-full text-white text-xs font-bold flex items-center justify-center">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-dark px-4 py-3 rounded-lg shadow-sm transition-colors">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={22} className="text-black dark:text-white" />
        </button>

        <Link href="/">
          <span className="text-xl font-black tracking-tight text-black dark:text-white">
            KICKS
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <User size={18} className="text-black dark:text-white" />
          <Link href="/cart" className="relative">
            <ShoppingCart size={18} className="text-black dark:text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange rounded-full text-white text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-dark mt-2 rounded-xl shadow-lg p-4 flex flex-col gap-3 transition-colors">
          <Link className="text-sm font-medium text-black dark:text-white" href="/">
            New Drops 🔥
          </Link>
          <button className="text-sm font-medium text-black dark:text-white text-left">
            Men
          </button>
          <button className="text-sm font-medium text-black dark:text-white text-left">
            Women
          </button>
        </div>
      )}
    </nav>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Heart, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProducts, getValidImage } from "@/lib/api";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const DELIVERY = 6.99;

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedPage, setRelatedPage] = useState(0);

  useEffect(() => {
    getProducts(8, 0)
      .then(setRelatedProducts)
      .catch(() => {});
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const total = subtotal + (items.length > 0 ? DELIVERY : 0);
  const visibleRelated = relatedProducts.slice(
    relatedPage * 4,
    relatedPage * 4 + 4,
  );
  const totalRelatedPages = Math.ceil(relatedProducts.length / 4);

  return (
    <div className="min-h-screen bg-[#EFEFEB]">
      <div className="px-4 md:px-8 max-w-7xl mx-auto py-6">
        {/* Promo Banner */}
        <div className="mb-6">
          <h2 className="text-xl font-black text-black mb-1">
            Saving to celebrate
          </h2>
          <p className="text-gray-500 text-sm">
            Enjoy up to 60% off thousands of styles during the End of Year sale
            - while supplies last. No code needed.
          </p>
          <p className="text-sm mt-1">
            <span className="underline cursor-pointer hover:text-[#3D5AF1] transition-colors">
              Join us
            </span>
            <span className="text-gray-500"> or </span>
            <span className="underline cursor-pointer hover:text-[#3D5AF1] transition-colors">
              Sign-in
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Your Bag */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl font-black text-black mb-1">Your Bag</h2>
              <p className="text-gray-500 text-sm mb-6">
                Items in your bag not reserved- check out now to make them
                yours.
              </p>

              {items.length === 0 ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-700 mb-2">
                    Your bag is empty
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Add some items to get started.
                  </p>
                  <Link href="/">
                    <button className="bg-black text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors">
                      SHOP NOW
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={getValidImage(item.product.images)}
                          alt={item.product.title}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/100?text=Shoe";
                          }}
                        />
                      </div>
                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-black text-sm text-black uppercase leading-tight">
                            {item.product.title}
                          </h3>
                          <span className="text-[#3D5AF1] font-black text-sm ml-2 whitespace-nowrap">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs">
                          Men&apos;s Road Running Shoes
                        </p>
                        <p className="text-gray-500 text-xs mb-2">
                          {item.color}
                        </p>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1.5">
                            <span className="text-xs text-gray-600">
                              Size {item.size}
                            </span>
                            <span className="text-xs text-gray-400">▾</span>
                          </div>
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                Number(e.target.value),
                              )
                            }
                            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 focus:outline-none focus:border-black cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5].map((q) => (
                              <option key={q} value={q}>
                                Quantity {q}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="text-gray-400 hover:text-red-400 transition-colors">
                            <Heart size={16} />
                          </button>
                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.size)
                            }
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <h2 className="text-xl font-black text-black mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {items.reduce((s, i) => s + i.quantity, 0)} ITEM
                  {items.length !== 1 ? "S" : ""}
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium">
                  {items.length > 0 ? `$${DELIVERY.toFixed(2)}` : "-"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sales Tax</span>
                <span className="font-medium text-gray-400">-</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-black text-base">Total</span>
                <span className="font-black text-base">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full mt-4 bg-black text-white font-black py-4 rounded-xl tracking-widest hover:bg-gray-800 transition-colors text-sm">
              CHECKOUT
            </button>
            <button className="w-full mt-2 text-sm text-gray-500 hover:text-black transition-colors py-2">
              Use a promo code
            </button>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-black text-black">
              You may also like
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setRelatedPage(Math.max(0, relatedPage - 1))}
                disabled={relatedPage === 0}
                className="w-9 h-9 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  setRelatedPage(
                    Math.min(totalRelatedPages - 1, relatedPage + 1),
                  )
                }
                disabled={relatedPage >= totalRelatedPages - 1}
                className="w-9 h-9 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {visibleRelated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {totalRelatedPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalRelatedPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRelatedPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === relatedPage ? "bg-[#3D5AF1]" : "bg-gray-300"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="  bg-[#3D5AF1] rounded-3xl mx-4 md:mx-8 my-8 pt-8 md:pt-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-8 py-6">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase leading-tight mb-2">
              JOIN OUR KICKSPLUS
              <br />
              CLUB & GET 15% OFF
            </h2>
            <p className="text-white/80 text-sm mb-4">
              Sign up for free! Join the community.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 max-w-xs px-4 py-2.5 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white"
              />
              <button className="px-5 py-2.5 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors">
                SUBMIT
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="text-4xl md:text-6xl font-black text-white tracking-tight">
              KICKS<sup className="text-[#F5A623] text-2xl">+</sup>
            </span>
          </div>
        </div>
        <Footer />
      </div>
      <div className="text-center py-4 text-gray-600 text-xs">
        © All rights reserved
      </div>
    </div>
  );
}

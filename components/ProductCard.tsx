"use client";

import Link from "next/link";
import { Product } from "@/types";
import { getValidImage } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  badge?: string;
}

export default function ProductCard({
  product,
  badge = "New",
}: ProductCardProps) {
  const imageUrl = getValidImage(product.images);

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative bg-gray-50 p-6 flex items-center justify-center h-44">
        {badge && (
          <span className="absolute top-0 left-0  rounded-br-xl bg-[#3D5AF1] text-white text-xs font-bold px-2.5 py-1  z-10">
            {badge}
          </span>
        )}
        <img
          src={imageUrl}
          alt={product.title}
          className="h-32 w-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300x200?text=Shoe";
          }}
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="px-4 py-3 flex-1">
          <h3 className="font-black text-sm text-black uppercase leading-tight">
            {product.title}
          </h3>
        </div>
        <Link href={`/product/${product.id}`}>
          <button className="w-full bg-black text-white text-xs font-bold py-3 px-4 hover:bg-gray-800 transition-colors tracking-wide">
            VIEW PRODUCT - <span className="text-orange">${product.price}</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

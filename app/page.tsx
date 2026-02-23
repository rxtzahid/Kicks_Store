"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product, Category } from "@/types";
import { getProducts, getCategories, getValidImage } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { SkeletonGrid } from "@/components/SkeletonCard";
import ErrorState, { EmptyState } from "@/components/ErrorState";
import Footer from "@/components/Footer";

const REVIEWS = [
  {
    name: "Alex M.",
    rating: 5,
    text: "I highly recommend shopping from kicks.",
    avatar: "https://i.pravatar.cc/40?img=1",
    photo:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=250&fit=crop",
  },
  {
    name: "Jordan K.",
    rating: 5,
    text: "I highly recommend shopping from kicks.",
    avatar: "https://i.pravatar.cc/40?img=2",
    photo:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=250&fit=crop",
  },
  {
    name: "Sam T.",
    rating: 5,
    text: "I highly recommend shopping from kicks.",
    avatar: "https://i.pravatar.cc/40?img=3",
    photo:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=250&fit=crop",
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [productPage, setProductPage] = useState(0);
  const [catPage, setCatPage] = useState(0);

  const fetchProducts = async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const data = await getProducts(8, 0);
      setProducts(data);
    } catch {
      setProductsError("Failed to load products");
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      setCategoriesError("Failed to load categories");
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const productsPerPage =
    typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 4;
  const visibleProducts = products.slice(productPage * 4, productPage * 4 + 4);
  const visibleCategories = categories.slice(catPage * 2, catPage * 2 + 2);
  const totalProductPages = Math.ceil(products.length / 4);

  return (
    <div className="min-h-screen bg-[#EFEFEB]">
      {/* Hero Section */}
      <section className="px-4 md:px-8 pt-4 pb-8 max-w-7xl mx-auto">
        <h1 className="text-5xl text-center  md:text-8xl font-black leading-none mb-4 tracking-tight">
          <span className="text-black">DO IT </span>
          <span className="text-[#3D5AF1]">RIGHT</span>
        </h1>
        <div className="relative rounded-3xl bg-[#B8860B] rounded-2xl overflow-hidden h-64 md:h-[750px]">
          {/* Left vertical badge */}
          <div className="absolute left-0 top-10  w-8 p-4 bg-black/40 flex items-center justify-center rounded-r-xl z-10">
            <span
              className="text-white text-[10px] font-bold tracking-widest"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Nike product of the year
            </span>
          </div>
          {/* Main shoe image */}
          <div className="absolute inset-0  flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&h=400&fit=crop"
              alt="Nike Air Max"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          {/* Product info */}
          <div className="absolute bottom-6 left-10 z-10">
            <h2 className="text-white text-2xl md:text-3xl font-black mb-1">
              NIKE AIR MAX
            </h2>
            <p className="text-white/80 text-sm mb-3">
              Nike introducing the new air max for <br></br>
              everyone's comfort
            </p>
            <button className="bg-[#3D5AF1] text-white text-xs font-bold px-4 py-2 rounded-lg  transition-colors">
              SHOP NOW
            </button>
          </div>
          {/* Right thumbnails */}
          <div className="absolute right-4 bottom- flex flex-col gap-2 z-10">
            <div className="w-20 h-16 md:w-28 md:h-20 bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/30">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=150&fit=crop"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-20 h-16 md:w-28 md:h-20 bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/30">
              <img
                src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=150&fit=crop"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Drops Section */}
      <section className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-semibold text-black uppercase leading-tight">
              DON&apos;T MISS OUT
              <br />
              NEW DROPS
            </h2>
          </div>
          <button className="bg-[#3D5AF1] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
            SHOP NEW DROPS
          </button>
        </div>

        {productsLoading ? (
          <SkeletonGrid count={4} />
        ) : productsError ? (
          <ErrorState message={productsError} onRetry={fetchProducts} />
        ) : products.length === 0 ? (
          <EmptyState message="No products available" />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* Pagination dots */}
            {totalProductPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  onClick={() => setProductPage(Math.max(0, productPage - 1))}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-40"
                  disabled={productPage === 0}
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalProductPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setProductPage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === productPage ? "bg-[#3D5AF1]" : "bg-gray-300"}`}
                  />
                ))}
                <button
                  onClick={() =>
                    setProductPage(
                      Math.min(totalProductPages - 1, productPage + 1),
                    )
                  }
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-40"
                  disabled={productPage === totalProductPages - 1}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Categories Section */}
      <section className="bg-[#1C1C1C] mx-4 md:mx-8 rounded-2xl pt-8  my-8">
        <div className="flex items-center justify-between mb-6 px-6">
          <h2 className="text-white text-2xl md:text-3xl font-black uppercase">
            CATEGORIES
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCatPage(Math.max(0, catPage - 1))}
              className="w-9 h-9 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors disabled:opacity-40"
              disabled={catPage === 0}
            >
              <ChevronLeft size={16} className="text-white" />
            </button>
            <button
              onClick={() => setCatPage(catPage + 1)}
              className="w-9 h-9 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors disabled:opacity-40"
              disabled={(catPage + 1) * 2 >= categories.length}
            >
              <ChevronRight size={16} className="text-white" />
            </button>
          </div>
        </div>

        {categoriesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-56 bg-gray-700 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : categoriesError ? (
          <ErrorState message={categoriesError} onRetry={fetchCategories} />
        ) : categories.length === 0 ? (
          <EmptyState message="No categories available" />
        ) : (
          <div className="grid grid-cols-1 place-items-end gap-0 md:grid-cols-2">
            {(visibleCategories.length > 0
              ? visibleCategories
              : [
                  {
                    id: 1,
                    name: "Lifestyle Shoes",
                    image:
                      "https://images.unsplash.com/photo-1607522370275-f6bff4a664de?w=400&h=300&fit=crop",
                  },
                  {
                    id: 2,
                    name: "Basketball Shoes",
                    image:
                      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
                  },
                ]
            ).map((cat) => (
              <div
                key={cat.id}
                className={`relative bg-[#F5F5F0] ${cat.id === 1 ? "rounded-tl-3xl" : ""}  overflow-hidden h-96 w-[30rem] group cursor-pointer`}
              >
                <img
                  src={
                    cat.image ||
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
                  }
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <span className="text-black font-black text-lg uppercase">
                    {cat.name}
                  </span>
                  <button className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center text-sm font-bold hover:bg-gray-800 transition-colors">
                    ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase">
            REVIEWS
          </h2>
          <button className="text-[#3D5AF1] text-sm font-bold hover:underline">
            SEE ALL
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS.map((review, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="bg-white rounded-2xl p-4">
                <h4 className="font-bold text-sm text-black mb-1">
                  Good Quality
                </h4>
                <p className="text-gray-500 text-xs mb-2">{review.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <span key={j} className="text-[#F5A623] text-sm">
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      {review.rating}.0
                    </span>
                  </div>
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-64 mt-8">
                  <img
                    src={review.photo}
                    alt="Review"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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

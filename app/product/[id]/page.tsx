"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { getProduct, getProducts, getValidImage } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { SkeletonGrid } from "@/components/SkeletonCard";
import ErrorState from "@/components/ErrorState";
import Footer from "@/components/Footer";

const SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
const UNAVAILABLE_SIZES = [39, 40];
const COLORS = [
  { name: "Shadow Navy", hex: "#1a2a4a" },
  { name: "Army Green", hex: "#4a5a2a" },
];

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState(38);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedPage, setRelatedPage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prod, related] = await Promise.all([
        getProduct(Number(id)),
        getProducts(8, 0),
      ]);
      setProduct(prod);
      setRelatedProducts(
        related.filter((p) => p.id !== Number(id)).slice(0, 8),
      );
    } catch {
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, selectedSize, COLORS[selectedColor].name);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const productImages = product
    ? [
        getValidImage(product.images),
        product.images[1]
          ? getValidImage([product.images[1]])
          : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
      ]
    : [];

  const visibleRelated = relatedProducts.slice(
    relatedPage * 4,
    relatedPage * 4 + 4,
  );
  const totalRelatedPages = Math.ceil(relatedProducts.length / 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFEFEB] px-4 md:px-8 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-52 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#EFEFEB] flex items-center justify-center">
        <ErrorState
          message={error || "Product not found"}
          onRetry={fetchProduct}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFEFEB]">
      <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        {/* Product Detail - Desktop 2 col, Mobile stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Image Gallery */}
          <div>
            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="bg-white rounded-2xl overflow-hidden h-72 relative">
                <img
                  src={productImages[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x400?text=Shoe";
                  }}
                />
              </div>
              <div className="flex justify-center gap-1.5 mt-3">
                {productImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === activeImage ? "bg-[#3D5AF1]" : "bg-gray-300"}`}
                  />
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 h-16 bg-white rounded-xl overflow-hidden border-2 transition-colors ${i === activeImage ? "border-[#3D5AF1]" : "border-transparent"}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/100?text=Shoe";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop 2x2 Grid */}
            <div className="hidden md:grid grid-cols-2 gap-3">
              {productImages.map((img, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden h-52 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setActiveImage(i)}
                >
                  <img
                    src={img}
                    alt={`Product view ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x200?text=Shoe";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-4">
            <span className="inline-block bg-[#3D5AF1] text-white text-xs font-bold px-3 py-1.5 rounded-full w-fit">
              New Release
            </span>
            <h1 className="text-xl md:text-2xl font-black text-black uppercase">
              {product.title}
            </h1>
            <p className="text-[#3D5AF1] text-2xl font-black">
              ${product.price}.00
            </p>

            {/* Color */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                COLOR
              </p>
              <div className="flex gap-2">
                {COLORS.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === i ? "border-black scale-110" : "border-gray-300"}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  SIZE
                </p>
                <button className="text-xs text-[#3D5AF1] font-bold hover:underline">
                  SIZE CHART
                </button>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-8 gap-2">
                {SIZES.map((size) => {
                  const unavailable = UNAVAILABLE_SIZES.includes(size);
                  const selected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => !unavailable && setSelectedSize(size)}
                      disabled={unavailable}
                      className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                        selected
                          ? "bg-black text-white border-black"
                          : unavailable
                            ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed"
                            : "bg-white text-black border-gray-200 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 font-black text-sm tracking-wide rounded-xl transition-all ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {addedToCart ? "✓ ADDED TO CART" : "ADD TO CART"}
              </button>
              <button className="w-12 h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-red-400 hover:text-red-400 transition-colors">
                <Heart size={18} />
              </button>
            </div>
            <button className="w-full py-3.5 bg-[#3D5AF1] text-white font-black text-sm tracking-wide rounded-xl hover:bg-blue-700 transition-colors">
              BUY IT NOW
            </button>

            {/* About Product */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-black text-black uppercase tracking-wide mb-2">
                ABOUT THE PRODUCT
              </p>
              <p className="text-gray-500 text-xs mb-2">
                {COLORS[selectedColor].name}
              </p>
              <p className="text-gray-600 text-sm mb-3">
                {product.description}
              </p>
              <ul className="space-y-1.5">
                <li className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-[#3D5AF1] mt-0.5">•</span>
                  Pay over time in interest-free installments with Affirm,
                  Klarna or Afterpay.
                </li>
                <li className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-[#3D5AF1] mt-0.5">•</span>
                  Join adiClub to get unlimited free standard shipping, returns,
                  &amp; exchanges.
                </li>
              </ul>
            </div>
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

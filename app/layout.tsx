import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "KICKS - The Biggest Hyperstore in the Universe",
  description: "We got you all covered with our exclusive collections and latest drops.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 
        👉 dark mode controlled by adding/removing "dark" class on <html>
        👉 body contains base colors
      */}
      <body className="bg-white text-black dark:bg-dark dark:text-white transition-colors duration-300">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
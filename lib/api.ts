import axios from "axios";
import { Product, Category } from "@/types";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export const api = axios.create({ baseURL: BASE_URL });

export async function getProducts(limit = 8, offset = 0): Promise<Product[]> {
  const res = await api.get(`/products?offset=${offset}&limit=${limit}`);
  return res.data;
}

export async function getProduct(id: number): Promise<Product> {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export async function getCategories(): Promise<Category[]> {
  const res = await api.get("/categories");
  return res.data;
}

export async function getProductsByCategory(categoryId: number, limit = 8): Promise<Product[]> {
  const res = await api.get(`/categories/${categoryId}/products?limit=${limit}`);
  return res.data;
}

export function getValidImage(images: string[]): string {
  if (!images || images.length === 0) return "/placeholder-shoe.jpg";
  const img = images[0];
  // Clean up API image URLs that sometimes come as JSON arrays
  const cleaned = img.replace(/[\[\]"]/g, "").split(",")[0].trim();
  if (cleaned.startsWith("http")) return cleaned;
  return "/placeholder-shoe.jpg";
}

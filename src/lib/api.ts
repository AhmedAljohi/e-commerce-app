import { api } from './axios';
import { FakestoreProduct } from '@/types/api';

// Product API Functions
export const productApi = {
  // Get all products
  getAllProducts: async (limit?: number): Promise<FakestoreProduct[]> => {
    const url = limit ? `/products?limit=${limit}` : '/products';
    const response = await api.get<FakestoreProduct[]>(url);
    return response.data;
  },

  // Get single product by ID
  getProductById: async (id: string): Promise<FakestoreProduct> => {
    const response = await api.get<FakestoreProduct>(`/products/${id}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (
    category: string
  ): Promise<FakestoreProduct[]> => {
    const response = await api.get<FakestoreProduct[]>(
      `/products/category/${category}`
    );
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/products/categories');
    return response.data;
  },

  // Get products in a specific price range
  getProductsInPriceRange: async (
    min: number,
    max: number
  ): Promise<FakestoreProduct[]> => {
    const products = await productApi.getAllProducts();
    return products.filter(
      (product) => product.price >= min && product.price <= max
    );
  },

  // Search products by title
  searchProducts: async (query: string): Promise<FakestoreProduct[]> => {
    const products = await productApi.getAllProducts();
    return products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  },
};

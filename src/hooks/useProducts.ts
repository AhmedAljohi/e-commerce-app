import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { productApi } from '@/lib/api';
import { FakestoreProduct, transformProduct } from '@/types/api';
import { Product } from '@/types/store';

// Query Keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters?: { limit?: number }) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
  byCategory: (category: string) => [...productKeys.all, 'category', category] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
};

// Hook to fetch all products
export function useProducts(limit?: number): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: productKeys.list({ limit }),
    queryFn: async () => {
      const products = await productApi.getAllProducts(limit);
      return products.map(transformProduct);
    },
  });
}

// Hook to fetch a single product
export function useProduct(id: string): UseQueryResult<Product, Error> {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const product = await productApi.getProductById(id);
      return transformProduct(product);
    },
    enabled: !!id,
  });
}

// Hook to fetch all categories
export function useCategories(): UseQueryResult<string[], Error> {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: productApi.getCategories,
    staleTime: 5 * 60 * 1000, // Categories don't change often, cache for 5 minutes
  });
}

// Hook to fetch products by category
export function useProductsByCategory(category: string): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: productKeys.byCategory(category),
    queryFn: async () => {
      const products = await productApi.getProductsByCategory(category);
      return products.map(transformProduct);
    },
    enabled: !!category,
  });
}

// Hook to search products
export function useSearchProducts(query: string): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: async () => {
      const products = await productApi.searchProducts(query);
      return products.map(transformProduct);
    },
    enabled: query.length > 2, // Only search if query is longer than 2 characters
  });
}

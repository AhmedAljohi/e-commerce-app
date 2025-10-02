"use client";

import { useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/stores';

export function ProductList({ limit }: { limit?: number }) {
  const { data: products, isLoading, error } = useProducts(limit);
  const { addItem } = useCartStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        Error loading products: {error.message}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        No products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="aspect-square relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
              {product.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm">{product.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => addItem(product)}
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import { useCartStore } from '@/stores';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

export function CartButton() {
  const { totalItems, toggleCart } = useCartStore();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleCart}
      className="relative"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  );
}

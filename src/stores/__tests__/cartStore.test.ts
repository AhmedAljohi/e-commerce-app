import { renderHook, act } from '@testing-library/react';
import { useCartStore } from '../cartStore';
import { Product } from '@/types/store';

// Mock product for testing
const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 29.99,
  image: '/test-image.jpg',
  description: 'Test product description',
  category: 'test',
  inStock: true,
  rating: 4.5,
  discount: 10,
};

describe('Cart Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useCartStore.getState().clearCart();
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product).toEqual(mockProduct);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(59.98);
  });

  it('should update quantity of existing item', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalItems).toBe(3);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.removeItem(result.current.items[0].id);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.updateQuantity(result.current.items[0].id, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalItems).toBe(5);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 2);
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should toggle cart open state', () => {
    const { result } = renderHook(() => useCartStore());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggleCart();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleCart();
    });

    expect(result.current.isOpen).toBe(false);
  });
});

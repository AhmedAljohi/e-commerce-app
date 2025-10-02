// Store exports for easy importing
export { useCartStore } from './cartStore';
export { useUserStore } from './userStore';

// Re-export types for convenience
export type {
  Product,
  CartItem,
  User,
  CartState,
  UserState,
  CartActions,
  UserActions,
} from '@/types/store';

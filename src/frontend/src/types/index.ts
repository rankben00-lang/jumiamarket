import {
  type Order,
  type OrderId,
  type OrderItem,
  OrderStatus,
  type Product,
  ProductCategory,
  type ProductId,
  type SellerProfile,
  type Timestamp,
  type UserId,
  type UserProfile,
  UserRole,
  VerificationStatus,
} from "@/backend";
import type { Principal } from "@icp-sdk/core/principal";

export type {
  Product,
  Order,
  OrderItem,
  UserProfile,
  SellerProfile,
  ProductId,
  OrderId,
  UserId,
  Timestamp,
  Principal,
};

export { ProductCategory, OrderStatus, UserRole, VerificationStatus };

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: ProductId) => void;
  updateQuantity: (productId: ProductId, quantity: number) => void;
  clearCart: () => void;
  total: bigint;
  itemCount: number;
}

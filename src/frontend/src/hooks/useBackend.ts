import { createActor } from "@/backend";
import type { ExternalBlob } from "@/backend";
import type { OrderId, OrderItem, ProductId, UserId } from "@/types";
import { OrderStatus, ProductCategory } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";

export function useBackend() {
  const { actor, isFetching } = useActor(createActor);

  return {
    actor,
    isReady: !!actor && !isFetching,

    // Products
    getFeaturedProducts: (limit: bigint) => actor?.getFeaturedProducts(limit),
    listApprovedProducts: () => actor?.listApprovedProducts(),
    listAllProducts: () => actor?.listAllProducts(),
    listMyProducts: () => actor?.listMyProducts(),
    listPendingProducts: () => actor?.listPendingProducts(),
    getProduct: (id: ProductId) => actor?.getProduct(id),
    searchProducts: (keyword: string) => actor?.searchProducts(keyword),
    filterProductsByCategory: (category: ProductCategory) =>
      actor?.filterProductsByCategory(category),
    addProduct: (
      title: string,
      description: string,
      price: bigint,
      category: ProductCategory,
      image: ExternalBlob,
      quantity: bigint,
    ) =>
      actor?.addProduct(title, description, price, category, image, quantity),
    editProduct: (
      id: ProductId,
      title: string,
      description: string,
      price: bigint,
      category: ProductCategory,
      image: ExternalBlob,
      quantity: bigint,
    ) =>
      actor?.editProduct(
        id,
        title,
        description,
        price,
        category,
        image,
        quantity,
      ),
    deleteMyProduct: (id: ProductId) => actor?.deleteMyProduct(id),
    approveProduct: (id: ProductId) => actor?.approveProduct(id),
    rejectProduct: (id: ProductId) => actor?.rejectProduct(id),

    // Orders
    listMyOrders: () => actor?.listMyOrders(),
    listSellerOrders: () => actor?.listSellerOrders(),
    getOrder: (id: OrderId) => actor?.getOrder(id),
    placeOrder: (items: OrderItem[], deliveryAddress: string) =>
      actor?.placeOrder(items, deliveryAddress),
    cancelOrder: (id: OrderId) => actor?.cancelOrder(id),
    updateOrderStatus: (id: OrderId, status: OrderStatus) =>
      actor?.updateOrderStatus(id, status),

    // Users
    registerUser: (name: string, email: string) =>
      actor?.registerUser(name, email),
    getMyProfile: () => actor?.getMyProfile(),
    getUserProfile: (userId: UserId) => actor?.getUserProfile(userId),
    listAllUsers: () => actor?.listAllUsers(),

    // Sellers
    registerAsSeller: (businessName: string, description: string) =>
      actor?.registerAsSeller(businessName, description),
    getMySellerProfile: () => actor?.getMySellerProfile(),
    getSellerProfile: (sellerId: UserId) => actor?.getSellerProfile(sellerId),
    listPendingSellers: () => actor?.listPendingSellers(),
    isApprovedSeller: (principal: UserId) => actor?.isApprovedSeller(principal),
    approveSeller: (sellerId: UserId) => actor?.approveSeller(sellerId),
    rejectSeller: (sellerId: UserId) => actor?.rejectSeller(sellerId),
    getSellerRevenue: () => actor?.getSellerRevenue(),
  };
}

export { ProductCategory, OrderStatus };

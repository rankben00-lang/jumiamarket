import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface SellerProfile {
    createdAt: Timestamp;
    businessName: string;
    description: string;
    sellerId: UserId;
    verificationStatus: VerificationStatus;
}
export type OrderId = bigint;
export type Timestamp = bigint;
export interface OrderItem {
    priceSnapshot: bigint;
    productId: ProductId;
    quantity: bigint;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    deliveryAddress: string;
    total: bigint;
    createdAt: Timestamp;
    buyerId: UserId;
    items: Array<OrderItem>;
}
export type UserId = Principal;
export type ProductId = bigint;
export interface Product {
    id: ProductId;
    status: ProductStatus;
    title: string;
    createdAt: Timestamp;
    description: string;
    quantity: bigint;
    category: ProductCategory;
    sellerId: UserId;
    image: ExternalBlob;
    price: bigint;
}
export interface UserProfile {
    principal: UserId;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    email: string;
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    processing = "processing"
}
export enum ProductCategory {
    Home = "Home",
    Books = "Books",
    Fashion = "Fashion",
    Others = "Others",
    Beauty = "Beauty",
    Electronics = "Electronics",
    Sports = "Sports"
}
export enum UserRole {
    admin = "admin",
    seller = "seller",
    buyer = "buyer"
}
export enum VerificationStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    addProduct(title: string, description: string, price: bigint, category: ProductCategory, image: ExternalBlob, quantity: bigint): Promise<ProductId>;
    approveProduct(id: ProductId): Promise<boolean>;
    approveSeller(sellerId: UserId): Promise<boolean>;
    cancelOrder(id: OrderId): Promise<boolean>;
    deleteMyProduct(id: ProductId): Promise<boolean>;
    editProduct(id: ProductId, title: string, description: string, price: bigint, category: ProductCategory, image: ExternalBlob, quantity: bigint): Promise<boolean>;
    filterProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getFeaturedProducts(limit: bigint): Promise<Array<Product>>;
    getMyProfile(): Promise<UserProfile | null>;
    getMySellerProfile(): Promise<SellerProfile | null>;
    getOrder(id: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getSellerProfile(sellerId: UserId): Promise<SellerProfile | null>;
    getSellerRevenue(): Promise<bigint>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    isApprovedSeller(principal: UserId): Promise<boolean>;
    listAllProducts(): Promise<Array<Product>>;
    listAllUsers(): Promise<Array<UserProfile>>;
    listApprovedProducts(): Promise<Array<Product>>;
    listMyOrders(): Promise<Array<Order>>;
    listMyProducts(): Promise<Array<Product>>;
    listPendingProducts(): Promise<Array<Product>>;
    listPendingSellers(): Promise<Array<SellerProfile>>;
    listSellerOrders(): Promise<Array<Order>>;
    placeOrder(items: Array<OrderItem>, deliveryAddress: string): Promise<OrderId>;
    registerAsSeller(businessName: string, description: string): Promise<boolean>;
    registerUser(name: string, email: string): Promise<boolean>;
    rejectProduct(id: ProductId): Promise<boolean>;
    rejectSeller(sellerId: UserId): Promise<boolean>;
    searchProducts(keyword: string): Promise<Array<Product>>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<boolean>;
}

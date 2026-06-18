export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subCategory: string;
  brand: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  specifications: Record<string, string>;
  features: string[];
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subCategories: SubCategory[];
  productCount: number;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  variant?: Record<string, string>;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  ratings: number[];
  inStockOnly: boolean;
  sortBy: SortOption;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "reviews";

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: "website" | "product";
  twitterCard?: "summary" | "summary_large_image";
}
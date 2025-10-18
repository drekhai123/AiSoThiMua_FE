export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productLogo: string;
  price: number;
  duration: string;
  quantity: number;
  rating?: number;
  review?: string;
  reviewedAt?: Date;
  accountCredentials?: {
    email?: string;
    password?: string;
    twoFactorCode?: string;
    recoveryEmail?: string;
    notes?: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  deliveryEmail?: string;
}

export interface OrderStatusInfo {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}


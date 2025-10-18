export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productLogo: string;
  price: number;
  duration: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod: string;
  deliveryEmail?: string;
}

export interface OrderStatusInfo {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}


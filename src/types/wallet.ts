export type TransactionType = "deposit" | "purchase" | "refund" | "bonus";
export type TransactionStatus = "pending" | "completed" | "failed";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // Số Cá
  amountVND: number; // Số VNĐ (cho deposit)
  description: string;
  status: TransactionStatus;
  createdAt: Date;
  orderId?: string; // Nếu là giao dịch mua hàng
  paymentMethod?: string; // Cho deposit
}

export interface DepositPackage {
  id: string;
  amount: number; // Số Cá
  amountVND: number; // Số VNĐ
  bonus: number; // Số Cá bonus (VD: nạp 100 Cá được thêm 10 Cá)
  popular?: boolean;
}


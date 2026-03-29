export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  specialInstructions?: string;
}

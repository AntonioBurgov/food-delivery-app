import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService, Order } from '../../core/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  selectedOrder: Order | null = null;
  orders: Order[] = [];
  private timers: any[] = [];

  statusSteps = [
    { key: 'Pending', label: 'Order Placed', icon: '📋' },
    { key: 'Confirmed', label: 'Confirmed', icon: '✅' },
    { key: 'Preparing', label: 'Preparing', icon: '👨‍🍳' },
    { key: 'OnTheWay', label: 'On the Way', icon: '🚚' },
    { key: 'Delivered', label: 'Delivered', icon: '🎉' }
  ];

  private statusFlow: Order['status'][] = [
    'Pending', 'Confirmed', 'Preparing', 'OnTheWay', 'Delivered'
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
      if (orders.length > 0 && !this.selectedOrder) {
        this.selectedOrder = orders[0];
      }
      // Start auto-progression for any active orders
      orders.forEach(order => {
        if (order.status !== 'Delivered' && order.status !== 'Cancelled') {
          this.startStatusProgression(order);
        }
      });
    });
  }

  startStatusProgression(order: Order) {
    const timer = setInterval(() => {
      const currentIndex = this.statusFlow.indexOf(order.status);
      if (currentIndex < this.statusFlow.length - 1) {
        order.status = this.statusFlow[currentIndex + 1];

        // Update estimatedDelivery text
        if (order.status === 'OnTheWay') {
          order.estimatedDelivery = '5-10 min';
        } else if (order.status === 'Delivered') {
          order.estimatedDelivery = 'Delivered';
          clearInterval(timer);
        }

        // Force refresh selected order view
        if (this.selectedOrder?.id === order.id) {
          this.selectedOrder = { ...order };
        }

        // Update the order in the list
        this.orders = this.orders.map(o => o.id === order.id ? { ...order } : o);
      } else {
        clearInterval(timer);
      }
    }, 60000); // 60 seconds = 1 minute

    this.timers.push(timer);
  }

  ngOnDestroy() {
    this.timers.forEach(t => clearInterval(t));
  }

  getItemsPreview(items: { name: string; quantity: number; price: number }[]): string {
    return items.map(i => i.name).join(', ');
  }

  getStatusIndex(status: string): number {
    return this.statusSteps.findIndex(s => s.key === status);
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      Pending: '#ff9800', Confirmed: '#2196f3', Preparing: '#9c27b0',
      OnTheWay: '#ff5722', Delivered: '#4caf50', Cancelled: '#f44336'
    };
    return colors[status] || '#888';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      Pending: 'Pending', Confirmed: 'Confirmed', Preparing: 'Preparing',
      OnTheWay: 'On the Way', Delivered: 'Delivered', Cancelled: 'Cancelled'
    };
    return labels[status] || status;
  }

  selectOrder(order: Order) { this.selectedOrder = order; }
  closeDetail() { this.selectedOrder = null; }

  getOrderSubtotal(order: Order): number {
    return order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  isDelivered(order: Order): boolean { return order.status === 'Delivered'; }
  isCancelled(order: Order): boolean { return order.status === 'Cancelled'; }
  isOnTheWay(order: Order): boolean { return order.status === 'OnTheWay'; }
  isNotCancelled(order: Order): boolean { return order.status !== 'Cancelled'; }
}
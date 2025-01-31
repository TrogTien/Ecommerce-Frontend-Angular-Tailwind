import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { OrderResponse } from 'src/app/models/interface/order-response.interface';
import { OrderDetailResponse } from 'src/app/models/interface/orderDetail-response.interface';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() orderId!: string;

  orderRes!: OrderResponse;
  orderDetailsRes: OrderDetailResponse[] = [];

  constructor(
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
  
      forkJoin([
        this.orderService.getOrderById(this.orderId) ,
        this.orderDetailService.getOrderDetailsByOrderId(this.orderId)
      ]).subscribe(([order, orderDetails]) => {
  
        this.orderRes = order;
        this.orderDetailsRes = orderDetails;
  
      })
  
    }
}

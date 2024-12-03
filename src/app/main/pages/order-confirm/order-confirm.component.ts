import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { OrderResponse } from 'src/app/models/interface/order-response.interface';
import { OrderDetailResponse } from 'src/app/models/interface/orderDetail-response.interface';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  @Input() orderId!: string;

  orderRes!: OrderResponse;
  orderDetailsRes: OrderDetailResponse[] = [];

  constructor(
    private _route: ActivatedRoute,
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

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private api: ApiService) { }

  getOrderDetailsByOrderId(orderId: string) {
    return this.api.get(`order_details/order/${orderId}`);
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: ApiService) { }

  postOrder(data: any) {
    return this.apiService.post("orders", data);
  }

  getOrderById(orderId: string) {
    return this.apiService.get(`orders/${orderId}`);
  }
}

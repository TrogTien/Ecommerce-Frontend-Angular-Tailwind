import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: ApiService) { }



  getAllOrders(page = 0, limit = 0, search = ""): Observable<any> {
    const params = new HttpParams()
      .set("page", page)
      .set("limit", limit)
      .set("keyword", search)

    return this.apiService.get("orders", params);
  }

  postOrder(data: any) {
    return this.apiService.post("orders", data);
  }

  getOrderById(orderId: string) {
    return this.apiService.get(`orders/${orderId}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderResponse } from 'src/app/models/interface/order-response.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders: OrderResponse[] = [];

  search: string = "";
  
  page = 1;
  limit = 8;
  totalPages = 1;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders()
  } 

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadOrders()
  }

  loadOrders(): void {
    this.orderService.getAllOrders(this.page - 1, this.limit, this.search).subscribe(data => {
      this.orders = data.orders;
      this.totalPages = data.totalPages;
    })
  }

}

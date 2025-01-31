import { Component, Input } from '@angular/core';
import { OrderResponse } from 'src/app/models/interface/order-response.interface';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {
  @Input() order!: OrderResponse;
}

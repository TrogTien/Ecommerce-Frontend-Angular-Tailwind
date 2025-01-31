import { Component, Input } from '@angular/core';
import { OrderDetailResponse } from 'src/app/models/interface/orderDetail-response.interface';

@Component({
  selector: 'app-order-detail-item',
  templateUrl: './order-detail-item.component.html',
  styleUrls: ['./order-detail-item.component.scss']
})
export class OrderDetailItemComponent {
  @Input() orderDetail!: OrderDetailResponse;
}

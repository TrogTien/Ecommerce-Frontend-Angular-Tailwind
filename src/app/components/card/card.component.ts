import { Component, Input, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/models/interface/product-response.interface';
import { Product } from 'src/app/models/interface/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() productItem: Product | undefined;
  
  imageUrl: string = "";

  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    if (this.productItem?.thumbnail) {
      this.imageUrl = "http://localhost:8088/images/" + this.productItem.thumbnail;
    } else {
      this.imageUrl = "http://localhost:4200/assets/images/product/default-product.jpg";
    }
  }

  addToCart(): void {
    this.cartService.addCart(this.productItem!, 1);
  }

}

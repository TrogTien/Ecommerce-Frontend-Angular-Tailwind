import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ProductResponse } from 'src/app/models/interface/product-response.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() productId!: string;

  product!: ProductResponse ;
  testProductId = 4;
  quantity = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    

    this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    })
    
    
  }

  addToCart(): void {
    this.cartService.addCart(this.product, this.quantity);
  }

  increaseQty(): void {
  
    this.quantity++;
  }

  decreaseQty(): void {
    if (this.quantity > 1)
    this.quantity--;
  }


}

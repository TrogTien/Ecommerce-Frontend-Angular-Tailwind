import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ProductResponse } from 'src/app/models/interface/product-response.interface';
import { Product } from 'src/app/models/interface/product.interface';
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
    const _product: Product = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      thumbnail: this.product.thumbnail,
      description: this.product.description,
      category: null, // Để category là null
      isActive: true
    }
    this.cartService.addCart(_product, this.quantity);
  }

  increaseQty(): void {
  
    this.quantity++;
  }

  decreaseQty(): void {
    if (this.quantity > 1)
    this.quantity--;
  }


}

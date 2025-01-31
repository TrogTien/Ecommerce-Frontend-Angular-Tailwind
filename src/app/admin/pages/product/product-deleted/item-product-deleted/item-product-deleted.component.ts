import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/interface/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'item-product-deleted',
  templateUrl: './item-product-deleted.component.html',
  styleUrls: ['./item-product-deleted.component.scss']
})
export class ItemProductDeletedComponent {
  @Input() productItem!: Product;
    
    imageUrl: string = "";
  
    constructor(private productService: ProductService) {}
    
    ngOnInit(): void {
      if (this.productItem?.thumbnail) {
        this.imageUrl = "http://localhost:8088/images/" + this.productItem.thumbnail;
      } else {
        this.imageUrl = "";
      }
  
  
    }

    onRestoreProduct() {
      this.productService.restoreProduct(this.productItem.id).subscribe(() => {
        console.log("Product has restored!");
      })
    }
}

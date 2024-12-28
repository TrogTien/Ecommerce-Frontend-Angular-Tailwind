import { Component, Input } from '@angular/core';
import { initModals } from 'flowbite';
import { ProductResponse } from 'src/app/models/interface/product-response.interface';
import { Product } from 'src/app/models/interface/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
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

  onDeleteProduct() {
    this.productService.softDeleteProduct(this.productItem?.id).subscribe((res) => {
      console.log(res);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Category } from 'src/app/models/interface/category.interface';
import { ProductResponse } from 'src/app/models/interface/product-response.interface';
import { Product } from 'src/app/models/interface/product.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  categories$: Observable<Category[]> | undefined;

  selectedCategoryId: number = 0;
  search: string = "";

  page = 1;
  limit = 6;
  totalPages = 1;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$;
    this.categories$ = this.categoryService.getAllCategories();

    this.loadProducts();

    // nhan total page 2 lan
    this.products$.pipe(
      take(2)
    ).subscribe(data => {
      this.totalPages = this.productService.totalPages;
      console.log(this.totalPages);
    })
    
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadProducts()
  }

  loadProducts(): void {
    this.productService.getAllActiveProducts(this.page - 1, this.limit, this.search, this.selectedCategoryId).subscribe()
  }

  

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }


}

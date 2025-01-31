import { Component, OnInit } from '@angular/core';
import { initDropdowns } from 'flowbite/lib/esm/components/dropdown';
import { Observable, take } from 'rxjs';
import { Category } from 'src/app/models/interface/category.interface';
import { Product } from 'src/app/models/interface/product.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-deleted',
  templateUrl: './product-deleted.component.html',
  styleUrls: ['./product-deleted.component.scss']
})
export class ProductDeletedComponent implements OnInit {
products$!: Observable<Product[]>;
  categories$: Observable<Category[]> | undefined;

  selectedCategoryId: number = 0;
  search: string = "";

  categoryName: string = "All Categories"


  page = 1;
  limit = 8;
  totalPages = 1;
  arrPage = [1,2,3,4,5];

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
  
      initDropdowns();
  }

  loadProducts(): void {
    this.productService.getAllDeletedProducts(this.page - 1, this.limit, this.search, this.selectedCategoryId).subscribe()
  }

  onChangeCategory(category?: Category): void {
    this.categoryName = category?.name ?? "All Categories";
    this.selectedCategoryId = category?.id ?? 0;

    this.loadProducts();

  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadProducts()
  }

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }
}

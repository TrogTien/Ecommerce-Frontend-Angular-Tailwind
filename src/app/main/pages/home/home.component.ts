import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Category } from 'src/app/models/interface/category.interface';
import { ProductResponse } from 'src/app/models/interface/product-response.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<ProductResponse[]> | undefined;
  categories$: Observable<Category[]> | undefined;

  selectedCategoryId: number = 0;
  search: string = "";

  page = 1;
  limit = 6;
  totalPages = 1;
  arrPage = [1,2,3,4,5];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$;
    this.categories$ = this.categoryService.category$;

    this.productService.initProducts(this.page - 1, this.limit).subscribe();   
    this.categoryService.getAllCategories().subscribe();

    // nhan total page 2 lan
    this.products$.pipe(
      take(2)
    ).subscribe(data => {
      this.totalPages = this.productService.totalPages;
      // console.log(this.totalPages);
    })
    
  }
  // (click) button = Tim
  onSearch(): void {
    this.productService.getAllProducts(this.page - 1, this.limit, this.search, this.selectedCategoryId).subscribe()
  }

  onPageChange(event: Event): void {
    event.preventDefault();

    const content = event.target as HTMLElement;

    this.page = Number(content.textContent)

    this.productService.getAllProducts(this.page - 1, this.limit, this.search, this.selectedCategoryId).subscribe()
  }

  nextPage(): void {
    if (this.arrPage[this.arrPage.length - 1] < this.totalPages) {

      
      const startNewPage = this.arrPage[this.arrPage.length - 1] + 1;

      this.arrPage = Array.from({ length: 5}, (_, i) => startNewPage + i);
      this.page = startNewPage;
      console.log(this.page);
      this.productService.getAllProducts(this.page - 1, this.limit).subscribe()
    }

  }

  previousPage(): void {
    if (this.arrPage[0] > 1) {
      

      const startNewPage = this.arrPage[0] - 5;

      this.arrPage = Array.from({ length: 5}, (_, i) => startNewPage + i);
      this.page = startNewPage + 4;
      
      this.productService.getAllProducts(this.page - 1, this.limit).subscribe()
    }

  }

  trackByProduct(index: number, product: ProductResponse): number {
    return product.id;
  }


}

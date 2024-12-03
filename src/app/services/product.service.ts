import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductResponse } from '../models/interface/product-response.interface';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productSubject = new BehaviorSubject<ProductResponse[]>([]);
  
  products$: Observable<ProductResponse[]> = this.productSubject.asObservable();

  totalPages = 2;

  constructor(private api: ApiService) { }

  getAllProducts(page: number = 0, limit: number = 6, search: string = "", categoryId: number = 0): Observable<ProductResponse[]> {
    
    const params = new HttpParams()
      .set("page", page)
      .set("limit", limit)
      .set("search", search)
      .set("category_id", categoryId);

    return this.api.get("products", params).pipe(
      tap((data: any) => {
        const products = data.products;
        this.totalPages = data.totalPages;
        this.productSubject.next(products);
      })
    );
  }

  initProducts(page: number, limit: number) {
    return this.getAllProducts(page, limit);
  }

  getProduct(id: string): Observable<ProductResponse> {
    return this.api.get(`products/${id}`);
  }

  getProductsByIds(ids: number[]): Observable<ProductResponse[]> {
    let idsString = ids.join(",");
    return this.api.get(`products/by-ids?ids=${idsString}`).pipe(
      tap(products => {
        this.productSubject.next(products);

      })
    )
  }

  
}

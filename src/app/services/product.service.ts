import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductResponse } from '../models/interface/product-response.interface';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { Product } from '../models/interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productSubject = new BehaviorSubject<Product[]>([]);
  
  products$: Observable<Product[]> = this.productSubject.asObservable();

  totalPages = 2;

  constructor(private api: ApiService) { }

  getAllDeletedProducts(page: number = 0, limit: number = 6, search: string = "", categoryId: number = 0): Observable<any> {
    
    const params = new HttpParams()
      .set("page", page)
      .set("limit", limit)
      .set("search", search)
      .set("category_id", categoryId);

    return this.api.get("products/deleted", params).pipe(
      tap((data: any) => {
        const products = data.products;
        this.totalPages = data.totalPages;
        this.productSubject.next(products);
      })
    );
  }

  getAllActiveProducts(page: number = 0, limit: number = 6, search: string = "", categoryId: number = 0): Observable<any> {
    
    const params = new HttpParams()
      .set("page", page)
      .set("limit", limit)
      .set("search", search)
      .set("category_id", categoryId);

    return this.api.get("products/active", params).pipe(
      tap((data: any) => {
        const products = data.products;
        this.totalPages = data.totalPages;
        this.productSubject.next(products);
      })
    );
  }

 
  getProduct(id: string): Observable<ProductResponse> {
    return this.api.get(`products/${id}`);
  }

  

  addProduct(productDTO: any): Observable<any> {
    return this.api.post("products", productDTO);

  }

  updateProduct(productId: string, productDTO: any): Observable<any> {
    return this.api.put(`products/${productId}`, productDTO);
  }

  softDeleteProduct(productId: number): Observable<any> {
    return this.api.delete(`products/${productId}`).pipe(
      tap(() => {
        const restProducts = this.productSubject.value.filter(_product => _product.id != productId);
        this.productSubject.next(restProducts);
      })
    );
  }

  restoreProduct(productId: number, data: any = true): Observable<any> {
    return this.api.put(`products/${productId}/restore`, data).pipe(
      tap(() => {
        const restProducts = this.productSubject.value.filter(_product => _product.id != productId);
        this.productSubject.next(restProducts);
      })
    );
  }

  
}

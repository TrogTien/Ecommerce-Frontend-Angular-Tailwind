import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category } from '../models/interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly categorySubject = new BehaviorSubject<Category[]>([]);

  category$: Observable<Category[]> = this.categorySubject.asObservable();

  constructor(private api: ApiService) { }

  getAllCategories(): Observable<Category[]> {
    return this.api.get("categories").pipe(
      tap(data => {
        this.categorySubject.next(data);
      })
    );
  }

  addCategory(data: any): Observable<any> {
    return this.api.post("categories", data).pipe(
      tap((newCategory) => {
        const currentCategories = this.categorySubject.value;
        this.categorySubject.next([...currentCategories, newCategory]);
      })
    );
  }

  updateCategory(categoryId: number, data: any): Observable<any> {
    return this.api.put(`categories/${categoryId}`, data).pipe(
      tap((updatedCategory) => {
        const currentCategories = [...this.categorySubject.value];
        const index = currentCategories.findIndex(c => c.id === categoryId);

        if (index != -1) {
          currentCategories.splice(index, 1, updatedCategory);
          this.categorySubject.next(currentCategories);
        }
      })
    );
  }

  removeCategory(categoryId: number): Observable<any> {
    return this.api.delete(`categories/${categoryId}`).pipe(
      tap(() => {
        const restCategories = this.categorySubject.value.filter(_category => _category.id != categoryId);
        this.categorySubject.next(restCategories);
      })
    );
  }


}

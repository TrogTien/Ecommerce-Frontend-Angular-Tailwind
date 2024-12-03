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


}

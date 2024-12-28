import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(private api: ApiService) { }

  uploadProductImages(files: any, productId: string): Observable<any> {
    return this.api.post(`product-images/uploads/${productId}`, files)
  }

 

  deleteOneImage(imageUrl: string): Observable<any> {
    return this.api.delete(`product-images/${imageUrl}`);
  }
}

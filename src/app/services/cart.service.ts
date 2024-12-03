import { Injectable } from '@angular/core';
import { Cart } from '../models/interface/cart.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { ProductResponse } from '../models/interface/product-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = "cart"; 

  private readonly cartsSubject = new BehaviorSubject<Cart[]>([]);
  private readonly lengthSubject = new BehaviorSubject<number>(0);

  carts$: Observable<Cart[]> = this.cartsSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private api: ApiService) {}

  nextValue(carts: Cart[]): void {
    this.cartsSubject.next(carts);
  }

  getCart(): Cart[] {
    const storedCart = localStorage.getItem(this.CART_KEY);

    if (storedCart) {
      const parseCart: Cart[] = JSON.parse(storedCart);
      this.cartsSubject.next(parseCart);
      this.lengthSubject.next(parseCart.length);
      
      return JSON.parse(storedCart);
    }

    return [];
  }

  getProductsByIds(ids: number[]): Observable<ProductResponse[]> {
    let idsString = ids.join(",");
    return this.api.get(`products/by-ids?ids=${idsString}`).pipe(
      tap(products => {
        const storedCart = localStorage.getItem(this.CART_KEY);

          if (storedCart) {
            let parseCart: Cart[] = JSON.parse(storedCart);
            parseCart = parseCart.map(cartItem => {
              const product = products.find(p => p.id === cartItem.productId);

              if (product) {
                return {
                  ...cartItem,
                  name: product.name,
                  price: product.price,
                  thumbnail: product.thumbnail

                }
              }

              return cartItem;
            })

            this.saveCart(parseCart);

          }

      })
    )
  }

  

  getIdsInCart(): number[] {
    const storedCart = localStorage.getItem(this.CART_KEY);
    if (storedCart) {
      const parseCart: Cart[] = JSON.parse(storedCart);
      const ids: number[] = parseCart.map(cartItem => cartItem.productId);

      return ids;
    } 

    return [];
  }

  addCart(product: ProductResponse, quantity: number): void {
    const carts = this.getCart();
    const existingProduct = carts.find(cartItem => cartItem.productId === product.id);

    if (existingProduct) {
      existingProduct.qty += quantity;
    } else {

      carts.push({
        productId: product.id,
        name: product.name,
        thumbnail: product.thumbnail,
        qty: quantity,
        price: product.price
      });

    }

    this.saveCart(carts);

  }

  saveCart(carts: Cart[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(carts));
    this.cartsSubject.next(carts);
    this.lengthSubject.next(carts.length);
    console.log("save cart");
  }

  clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
    this.saveCart([]);
  }

  removeItem(productId: number): void {
    let carts: Cart[] = this.cartsSubject.getValue();

    carts = carts.filter(cart => cart.productId !== productId);
    this.saveCart(carts);
  }

  
}

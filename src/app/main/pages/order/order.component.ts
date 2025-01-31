import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Cart } from 'src/app/models/interface/cart.interface';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  carts: Cart[] = [];
  orderForm!: FormGroup<any>;
  userId: number | null = 0;
  subTotal = 0;
  shippingCost = 0;
  tax = 0;
  totalMoney = 0;
  // Rxjs
  destroy$ = new Subject<void>();




  
  
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.cartService.getCart();

    // change qty call saveCart() fewer
    this.cartService.carts$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(carts => this.cartService.saveCart(carts)),
      takeUntil(this.destroy$)
    ).subscribe(carts => this.carts = carts);

    this.orderForm = this.formBuilder.group({
      full_name: ['Nguyen Tien', [Validators.required]],
      phone_number: ['0981344673', [Validators.required, Validators.minLength(9)]],
      email: ['abc@gmail.com', [Validators.email, Validators.required]],
      address: ['Ha Noi', [Validators.required]],
      note: ['Ghi chu'],
      shipping_method: ['express', [Validators.required]],
      payment_method: ['', [Validators.required]],
    })

    // Listen subtotal
    this.cartService.carts$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(cartItem => cartItem.reduce((sum, item) => sum + item.price * item.qty, 0)),
      takeUntil(this.destroy$)
    ).subscribe(val => {
      this.subTotal = val;
      this.updateTotalMoney();
    });
  

    // Listen Shipping cost
    this.orderForm.get('shipping_method')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(this.orderForm.get('shipping_method')?.value), // Giá trị khởi tạo từ FormControl
      map(method => (method === 'express' ? 15 : 10))
    ).subscribe(val => {
      this.shippingCost = val;
      this.updateTotalMoney();
    });

    
  
   

    this.userId = this.tokenService.getUserId();
  }

  updateTotalMoney(): void {
    this.tax = (this.shippingCost + this.subTotal) * 0.1;
    this.totalMoney = this.shippingCost + this.subTotal + this.tax;
  }

  increaseQty(cart: Cart): void {
    cart.qty ++;
    this.cartService.nextValue([...this.carts]);
  }

  decreaseQty(cart: Cart): void {
    if (cart.qty > 1) {
      cart.qty --;
      this.cartService.nextValue([...this.carts]);
    }
  }

  getErrorMessage(formControl: AbstractControl): string {
    if (formControl.hasError('required')) return "Không được để trống";

    if (formControl.hasError('email')) return "Email không hợp lệ";

    if (formControl.hasError('minlength')) {
      const minLength = formControl.errors?.['minlength'].requiredLength;
      return `Tối thiểu ${minLength} ký tự`;
    }

    return "";
  }

  onChange(): void {
    this.cartService.nextValue([...this.carts]);
  }

  onSubmitForm(): void {
    this.shippingMethod.markAsTouched();
    this.paymentMethod.markAsTouched();
    
    if (this.orderForm.valid) {
      const newCarts = this.carts.map(cartItem => ({
        "product_id": cartItem.productId,
        "quantity": cartItem.qty
      }))

      const orderDTO = {
        ...this.orderForm.value,
        "cart_items": newCarts,
        "user_id": this.userId,
        "total_money": this.totalMoney,
        "sub_total": this.subTotal,
        "shipping_cost": this.shippingCost,
        "tax": this.tax
      };
    
      this.orderService.postOrder(orderDTO).subscribe((res) => {
        console.log("Đặt hàng thành công");
        this.cartService.clearCart();
        this.router.navigate(['/order-confirm', res.id]);
      });
      
  

    } else {
      console.warn("Invalid");
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();  
    this.destroy$.complete();  
  }

  // Getter
  get phoneNumber(): AbstractControl {
    return this.orderForm.get('phone_number')!;
  }

  get username(): AbstractControl {
    return this.orderForm.get('full_name')!;
  }

  get email(): AbstractControl {
    return this.orderForm.get('email')!;
  }

  get address(): AbstractControl {
    return this.orderForm.get('address')!;
  }

  get shippingMethod(): AbstractControl {
    return this.orderForm.get('shipping_method')!;
  }

  get paymentMethod(): AbstractControl {
    return this.orderForm.get('payment_method')!;
  }

}

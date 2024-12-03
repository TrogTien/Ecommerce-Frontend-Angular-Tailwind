import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { initPopovers, Popover, PopoverInterface } from 'flowbite';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Cart } from 'src/app/models/interface/cart.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements  AfterViewInit, OnInit, OnDestroy {
  @ViewChild("contentTarget") target! : ElementRef ; 
  @ViewChild("buttonTrigger") trigger! : ElementRef ; 
  
  popover!: Popover;
  carts$!: Observable<Cart[]>;
  isLoggedIn$!: Observable<boolean>;

  destroy$ = new Subject<void>();

  length: number = 0;
  
  isShowNavbar: boolean = false;
  images = [
    {url: '/assets/images/img1.jpg', title: 'San pham 1'},
    {url: '/assets/images/img2.jpg', title: 'San pham 2'},
    {url: '/assets/images/img3.png', title: 'San pham 3'},
    {url: '/assets/images/img4.jpg', title: 'San pham 4'},
  ]

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}
  
  
  ngOnInit(): void {
    const ids: number[] = this.cartService.getIdsInCart();
    this.cartService.getProductsByIds(ids).subscribe();

    this.carts$ = this.cartService.carts$;
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.authService.getProfile().subscribe();

    
    this.cartService.length$.pipe(takeUntil(this.destroy$)).subscribe(length => this.length = length);

  }
  
  ngAfterViewInit(): void {
    const $triggerEl: HTMLElement = this.trigger.nativeElement;
    const $targetEl: HTMLElement = this.target.nativeElement;

    this.popover = new Popover($targetEl, $triggerEl);

  }

  onHideCart(): void {
    this.popover.hide();
  }

  onRemoveCartItem(cartItem: Cart): void {
    this.cartService.removeItem(cartItem.productId);
  }
  
  handleNavBar(): void {
    this.isShowNavbar = !this.isShowNavbar;
  }

  onLogOut(): void {
    this.authService.logout();
    this.router.navigate(["/auth"])
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

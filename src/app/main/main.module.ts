import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderConfirmComponent } from './pages/order-confirm/order-confirm.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CardComponent } from '../components/card/card.component';
import { RatingComponent } from '../components/rating/rating.component';
import { DarkModeComponent } from '../components/dark-mode/dark-mode.component';
import { ImageSliderComponent } from '../components/image-slider/image-slider.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeComponent,
    ProductDetailComponent,
    OrderComponent,
    OrderConfirmComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    RatingComponent,
    DarkModeComponent,
    ImageSliderComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MainModule { }

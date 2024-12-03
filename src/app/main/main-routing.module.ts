import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderConfirmComponent } from './pages/order-confirm/order-confirm.component';

const routes: Routes = [
  { 
    path: '', 
    component: MainLayoutComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full"},
      { path: "home", component: HomeComponent },
      { path: "product-detail/:productId", component: ProductDetailComponent },
      { path: "order", component: OrderComponent },
      { path: "order-confirm/:orderId", component: OrderConfirmComponent },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

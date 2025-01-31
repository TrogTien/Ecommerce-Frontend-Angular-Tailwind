import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CharComponent } from './pages/char/char.component';
import { ProductManagementComponent } from './pages/product/product-management/product-management.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { ProductDeletedComponent } from './pages/product/product-deleted/product-deleted.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { CategoryManagementComponent } from './pages/category/category-management/category-management.component';
import { OrderManagementComponent } from './pages/order/order-management/order-management.component';
import { OrderDetailComponent } from './pages/order/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductManagementComponent },
      { path: 'categories', component: CategoryManagementComponent },
      { path: 'orders', component: OrderManagementComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'charts', component: CharComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'product-deleted', component: ProductDeletedComponent },
      { path: 'orders/:orderId', component: OrderDetailComponent },
      { path: 'edit-product/:productId', component: EditProductComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { OrderManagementComponent } from './pages/order-management/order-management.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CharComponent } from './pages/char/char.component';
import { AddProductComponent } from './pages/product-management/add-product/add-product.component';
import { EditProductComponent } from './pages/product-management/edit-product/edit-product.component';
import { ProductDeletedComponent } from './pages/product-management/product-deleted/product-deleted.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductManagementComponent },
      { path: 'orders', component: OrderManagementComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'charts', component: CharComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'product-deleted', component: ProductDeletedComponent },
      { path: 'edit-product/:productId', component: EditProductComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

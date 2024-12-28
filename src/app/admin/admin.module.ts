import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { MapUsaComponent } from './charts/map-usa/map-usa.component';
import { TableN1Component } from './components/tables/table-n1/table-n1.component';
import { TableN2Component } from './components/tables/table-n2/table-n2.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CharComponent } from './pages/char/char.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { OrderManagementComponent } from './pages/order-management/order-management.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductItemComponent } from './pages/product-management/product-item/product-item.component';
import { AddProductComponent } from './pages/product-management/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditProductComponent } from './pages/product-management/edit-product/edit-product.component';
import { ProductDeletedComponent } from './pages/product-management/product-deleted/product-deleted.component';
import { ItemProductDeletedComponent } from './pages/product-management/product-deleted/item-product-deleted/item-product-deleted.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    MapUsaComponent,
    TableN1Component,
    TableN2Component,
    CalendarComponent,
    CharComponent,
    ProductManagementComponent,
    OrderManagementComponent,
    ProductItemComponent,
    AddProductComponent,
    EditProductComponent,
    ProductDeletedComponent,
    ItemProductDeletedComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }

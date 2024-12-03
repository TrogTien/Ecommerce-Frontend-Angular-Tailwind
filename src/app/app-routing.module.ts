import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './components/example/example.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
 
  
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m =>m.AuthModule)
  }, 
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    // canMatch: [adminGuard],
  },
  { 
    path: 'example', component: ExampleComponent
  },
  {
    path: '', 
    loadChildren: () => import('./main/main.module').then(m =>m.MainModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

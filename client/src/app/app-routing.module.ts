import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddprodComponent } from './components/addprod/addprod.component';
import { CartComponent } from './components/cart/cart.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { Register2Component } from './components/register2/register2.component';

const routes: Routes = [
  {path:"", component:HomepageComponent},
  {path:"cart", component:CartComponent},
  {path:"addprod", component:AddprodComponent},
  {path:"order", component:OrderComponent},
  {path:"register2", component:Register2Component},
  {path:"order", component:OrderComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

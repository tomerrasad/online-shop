import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { Register2Component } from './components/register2/register2.component';
import { LoginComponent } from './components/login/login.component';
import { ProditemComponent } from './components/proditem/proditem.component';
import { ProdlistComponent } from './components/prodlist/prodlist.component';
import { CartlistComponent } from './components/cartlist/cartlist.component';
import { CartitemComponent } from './components/cartitem/cartitem.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersuccessComponent } from './components/ordersuccess/ordersuccess.component';
import { AdmineditComponent } from './components/adminedit/adminedit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AddprodComponent } from './components/addprod/addprod.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterbodyComponent } from './components/registerbody/registerbody.component';
import { PayformComponent } from './components/payform/payform.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HighlightpipePipe } from './pipes/highlightpipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    Register2Component,
    LoginComponent,
    ProditemComponent,
    ProdlistComponent,
    CartlistComponent,
    CartitemComponent,
    CartComponent,
    OrderComponent,
    OrdersuccessComponent,
    AdmineditComponent,
    AddprodComponent,
    SidebarComponent,
    HomepageComponent,
    RegisterbodyComponent,
    PayformComponent,
    HighlightpipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

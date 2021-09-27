import { Component, OnInit } from '@angular/core';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { ProdserviceService } from 'src/app/services/prodservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public status:string
  public numberOfOrders:number
  



  constructor(public _cart:CartserviceService,public _user:UserserviceService,public _products:ProdserviceService) { }
  getFreshData(){
    if (this._cart.cartArr==[]) {
      this.status=`hey ${this._user.firstName} your shopping cart is empty check out our products`
    }else{
      this.status=`hey ${this._user.firstName} you forgot to take care your shopping cart`

    }
    this._cart.getOrders()
    this._products.getNumberOfProducts()
  }


  ngOnInit(): void {
    this.getFreshData()
  }

}

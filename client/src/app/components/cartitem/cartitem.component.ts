import { Input } from '@angular/core';
import { Component, OnInit ,OnChanges} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import CartItemModel from 'src/app/models/cartitem.model';
import ProdModel from 'src/app/models/prod.model';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { ProdserviceService } from 'src/app/services/prodservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {
  public inputValue:string
  

  

  async changeQuantity(plusOrMinus:boolean){
    if (plusOrMinus) {
      let x =this.cart.quantity+1
      this._cart.changeQuantity(x,localStorage.id,this.cart.productId)
      
    }
    else{
      if (this.cart.quantity==1) {
        this._cart.removeFromCart({prodId:this.cart.productId,userId:localStorage.id})
        
      }
      
      let x =this.cart.quantity-1
      this._cart.changeQuantity(x,localStorage.id,this.cart.productId)
      

    }
    this._cart.getCartTotal(localStorage.id)
  }

  constructor(public _cart:CartserviceService,public _user:UserserviceService) { }
  @Input()
  public cart!:CartItemModel
  @Input()
  public name4!:string
  
  
  
  
  ngOnInit(): void {
    console.log(this._cart.cartArr);

  }

}

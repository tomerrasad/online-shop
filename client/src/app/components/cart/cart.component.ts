import { Component, OnInit,OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { ProdserviceService } from 'src/app/services/prodservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    public _cart: CartserviceService,
    public _user: UserserviceService,
    public _prod: ProdserviceService
  ) {}
  name4 = new FormControl('', [Validators.required]);
  public Search: string = null;
  
  
  

  searchProd(){
    this._prod.prodArr = this._prod.fullProdArr.filter(prod=>prod.name === this.name4.value)
  }
  public OnSearched(searchTerm: string) {
    this.Search = searchTerm;
  }
  public onClick(){
    if (!this._cart.cartArr[0]) {
      return
      
    }
    else{
      this._user.wannaPay = 1
    }
  }
  
    
 
 

  ngOnInit(): void {
    this._cart.getCartTotal(localStorage.id);
    
    this._user.token=this._user.parseJwt(localStorage.token).isadmin
    
    
  }
}

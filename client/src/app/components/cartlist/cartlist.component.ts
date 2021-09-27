import { Component, Input, OnInit } from '@angular/core';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit {

  constructor(public _cart:CartserviceService, public _user:UserserviceService) { }

  @Input()
  public name4!:string
  


  ngOnInit(): void {
    this._cart.getCart(localStorage.id)
    
  }

}

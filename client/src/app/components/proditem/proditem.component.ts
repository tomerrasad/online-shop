import { Component, Input, OnInit } from '@angular/core';
import ProdModel from 'src/app/models/prod.model';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { ProdserviceService } from 'src/app/services/prodservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-proditem',
  templateUrl: './proditem.component.html',
  styleUrls: ['./proditem.component.css']
})
export class ProditemComponent implements OnInit {
  public userId:number


  

  constructor(public _prod:ProdserviceService,public _cart:CartserviceService ,public _user:UserserviceService,public _router:Router,) { }
  @Input()
  public prod!:ProdModel

  async listenToEvent(){
    this._prod.prodId = this.prod.id;
    const currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate(["cart"]);
    });
    
    


  }

  ngOnInit(): void {
    this.userId = localStorage.id
    
    
    
  }

}

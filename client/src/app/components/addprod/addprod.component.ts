import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdserviceService } from 'src/app/services/prodservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.css']
})
export class AddprodComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  img = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);




  
  async submitMyData(){
    const blah =await this._prod.addProd(this.name.value,this.category.value,this.img.value,this.price.value)
    
    
   
  }

  constructor(public _prod:ProdserviceService, public _router:Router) { }

  ngOnInit(): void {}
    getErrorMessage() {
      return this.name.hasError('required') ? 'You must enter a value' : '';
    }
    
  

}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { ProdserviceService } from 'src/app/services/prodservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-adminedit',
  templateUrl: './adminedit.component.html',
  styleUrls: ['./adminedit.component.css']
})
export class AdmineditComponent implements OnInit {

  constructor(
    public _cart: CartserviceService,
    public _user: UserserviceService,
    public _prod: ProdserviceService
  ) {}
  name = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  img = new FormControl('', [Validators.required]);
 

  async submitMyData() {
    console.log(
      this.name.value,
      this.category.value,
      this.price.value,
      this.img.value
    );

    const blah = await this._prod.editProd(
      this._prod.prodId,
      this.name.value,
      this.category.value,
      this.img.value,
      this.price.value
    );
    ;
    
  }
  
 
  getErrorMessage() {
    if (this.img.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.price.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.category.hasError('required')) {
      
    }

    return this.name.hasError('required') ? 'You must enter a value' : '';
  }
  
  ngOnInit(): void {
    
      
    
    this._prod.putValuesInInputs(this.name,this.category,this.img,this.price)}
  
    
    
    

  }
    



import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import * as moment from 'moment';

interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-payform',
  templateUrl: './payform.component.html',
  styleUrls: ['./payform.component.css']
})
export class PayformComponent implements OnInit {
  public userId:number
  public deliverys:string[]
  public shippingDetails:any
 
  id = new FormControl('', [Validators.required,Validators.pattern('^([0-9]{4}[\s-]?){3}([0-9]{4})$')]);
  date = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  adrress = new FormControl('', [Validators.required]);
  
  citys: City[] = [
    { value: 'jerusalem', viewValue: 'Jerusalem' },
    { value: 'haifa', viewValue: 'Haifa' },
    { value: 'tel aviv', viewValue: 'Tel aviv' },
    { value: 'ashdod', viewValue: 'Ashdod' },
    { value: 'ashqelon', viewValue: 'Ashqelon' },
    { value: 'beer sheva', viewValue: 'Beer sheva' },
    { value: 'sderot', viewValue: 'Sderot' },
    { value: 'eilat', viewValue: 'Eilat' },
  ];
  getIdErrorMessage() {
    if (this.id.hasError('pattern')) {
      return 'enter valid credit card';
    }
    return this.id.hasError('require') ? 'you cant pay witout your credit card :)' : '';
  }
  getErrorMessage() {
    if (this.date.hasError('require')) {
      return 'required';
    }
    if (this.adrress.hasError('require')) {
      return 'required';
    }
    
    return this.city.hasError('require') ? 'required' : '';
  }
  async submitMyData() {
    const blah = await this._cart.pay(
      localStorage.id,
      this.adrress.value,
      this.city.value,
      moment(this.date.value).format('YYYY-MM-DD'),
      this.id.value,
    );
    
    if (blah==200) {
      this._cart.orderSuccess=true
      
    }
  }
  putInputsValue() {
    
    this.adrress.patchValue(this.shippingDetails[0].address)
    this.city.patchValue(this.shippingDetails[0].city)
  }
  async ValuesForPayment(){
    this.userId = localStorage.id
    this.deliverys =await this._cart.getDeliverys()
    this.shippingDetails = await this._user.getShippingDetails(this.userId)
    
    


  }
  myFilter = (d: Date | null): boolean => {
    if (!d) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (d > today) {
      
      
      return !this.deliverys.find((date: string)=>moment(d).format('YYYY-MM-DD')=== date);
      

    }
    return false;
  };
  

  constructor(public _cart:CartserviceService, public _user:UserserviceService) { }
  

  ngOnInit(): void {
    this.ValuesForPayment()

    
    
    
  }

}


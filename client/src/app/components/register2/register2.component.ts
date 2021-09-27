import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import {
  FormControl,
  Validators,
 
} from '@angular/forms';
import { Router } from '@angular/router';
interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css'],
})
export class Register2Component implements OnInit {
  fname = new FormControl('', [Validators.required]);
  lname = new FormControl('', [Validators.required]);
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

  constructor(
    public _user: UserserviceService,
    public _router: Router
  ) {}

  async submitMyData() {
    const blah = await this._user.Register2(
      this.city.value,
      this.adrress.value,
      this.fname.value,
      this.lname.value,
      this._user.registrationId
    );
    console.log(blah);
    

    if (blah === 'registion accepted') {
      this._user.changeComponent()
    }
  }

  ngOnInit(): void {
    
  }
}

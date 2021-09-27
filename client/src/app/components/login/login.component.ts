import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(public _user:UserserviceService,public _router:Router,) {}
  id = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
  pass = new FormControl('', [Validators.required]);

  
  async submitMyData(){
    const blah =await this._user.login(this.id.value,this.pass.value)
    console.log(blah);
    
    
    
    if (blah.status===200) {
      this._user.registrationId = this.id.value
      this._user.token = this._user.parseJwt(blah.token).isadmin
      localStorage.setItem("token",blah.token)
      localStorage.setItem("id",this._user.parseJwt(blah.token).id)

      this._router.navigateByUrl("cart")}
  }

  ngOnInit(): void {
    
  }
  getIdErrorMessage() {
    if (this.id.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.id.hasError('max')) {
      return 'too long';
    }

    return this.id.hasError('min') ? 'too short' : '';
  }

}

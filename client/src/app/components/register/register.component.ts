import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  id = new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(9),
  ]);
  pass1 = new FormControl('', [Validators.required, Validators.minLength(8)]);
  pass2 = new FormControl('', [Validators.required, Validators.minLength(8)]);

  hide = true;

  constructor(public _user: UserserviceService, public _router: Router) {}
  async submitMyData() {
    console.log(this.id.value,
      this.email.value,
      this.pass1.value,
      this.pass2.value);
    
    const blah = await this._user.Register1(
      this.id.value,
      this.email.value,
      this.pass1.value,
      this.pass2.value
    );
    console.log(blah.some);
    if (blah === 'registion accepted') {
      this._user.changeRegister()
      console.log(this._user.register);
      
    }
  }

  ngOnInit(): void {}
  
  getMailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
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

  getPass1ErrorMessage() {
    if (this.pass1.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.pass1.hasError('minLentgh')) {
      return 'minimum 8 charecters'
    }
    else{
      return ""
    }

    
  }
  getPass2ErrorMessage() {
    if (this.pass2.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.pass1.value !== this.pass2.value) {
      return 'the password dosent match';
    }

    return this.pass1.hasError('minLength') ? 'minimum 8 charecters' : '';
  }
}

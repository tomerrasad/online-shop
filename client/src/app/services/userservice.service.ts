import { Injectable } from '@angular/core';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  public answer: string = '';
  public registrationId: number;
  public firstName: string = '';
  public component: boolean = true;
  public register: boolean = true;
  public token: number;
  public wannaPay:number;
  public admin:boolean;

  constructor(public _router:Router){}

  public async Register2(
    city: string,
    adrress: string,
    fname: string,
    lname: string,
    id: number
  ) {
    try {
      const res = await fetch('http://localhost:1000/register2', {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id,
          city,
          adrress,
          fname,
          lname,
        }),
      });
      const ans = await res.json();
      this.answer = ans.some;
      this.firstName = fname;
      return this.answer;
    } catch (err) {
      return err;
    }
  }
  public async Register1(
    id: number,
    email: string,
    pass1: string,
    pass2: string
  ) {
    try {
      const res = await fetch('http://localhost:1000/register1', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id,
          email,
          pass1,
          pass2,
        }),
      });
      const ans = await res.json();
      this.answer = ans.some;
      this.registrationId = id;
      return ans.some;
    } catch (err) {
      return err;
    }
  }
  public async login(id: number, pass: string) {
    try {
      const res = await fetch('http://localhost:1000/login', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id,
          pass,
        }),
      });
      const ans = await res.json();
      this.answer = ans.some;
      console.log(this.parseJwt(ans.some.token));
      
      this.registrationId = this.parseJwt(ans.some.token);
      return this.answer;
    } catch (err) {
      return err;
    }
  }
  public parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
  public changeComponent() {
    this.component = !this.component;
  }
  public changeRegister() {
    this.register = !this.register;
  }
  public async getShippingDetails(id: number) {
    try {
      const res = await fetch(`http://localhost:1000/shippingdetails/${id}`, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'authorization':`${localStorage.token}` },

      });
      const ans = await res.json();
      return ans;
    } catch (err) {
      return err;
    }
  }
  public async logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    this._router.navigate([""])


  }
  
  
}

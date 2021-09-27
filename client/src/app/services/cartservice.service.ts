import { Injectable } from '@angular/core';
import CartItemModel from '../models/cartitem.model';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
  public cartArr:CartItemModel[]
  public numOfOrders:number=0
  public totalCart:number=0
  public orderSuccess:boolean
  public pdf:any
  public pdfData = [['Product Name', 'Price in $', 'Quantity']];
  public inputValue2:string


  public async createData(){
    for await (const item of this.cartArr) {
      this.pdfData.push([item.name,`${item.price}`,`${item.quantity}`]);
 
   }
    this.pdfData.push([``,``,`total pay:${this.totalCart}$`]);
      


 }


  public async getCart(id:number) {
    try {
      const res = await fetch(`http://localhost:1000/getcart/${id}`, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'authorization':`${localStorage.token}` },

        
      });
      const ans = await res.json();
      
      
      this.cartArr = ans
      
      
      
    } catch (err) {
      return err;
    }
  }
  public async addToCart(prodId:number, userId:number) {
    try {
      const res = await fetch('http://localhost:1000/addtocart', {
        method: 'post',
        headers: { 'content-type': 'application/json', 'authorization':localStorage.token },
        body: JSON.stringify({
          prodId,
          userId

          
          
        }),
      });
      const ans = await res.json();
      this.cartArr=ans
      this.getCartTotal(userId)
      
      
    } catch (err) {
      return err;
    }
  }
  public async removeFromCart({prodId,userId}:{prodId:number, userId:number}){
    try {
      const res = await fetch('http://localhost:1000/deletefromcart', {
        method: 'delete',
        headers: { 'content-type': 'application/json', 'authorization':`${localStorage.token}` },
        body: JSON.stringify({
          prodId,
          userId
          
          
        }),
      });
      const ans = await res.json();
      this.cartArr=ans
      
      
    } catch (err) {
      return err;
    }

  }
  public async pay(userId:number,adrress:string,city:string,date:string,payment:number){
    try {
      const res = await fetch('http://localhost:1000/pay', {
        method: 'post',
        headers: { 'content-type': 'application/json', 'authorization':`${localStorage.token}` },
        body: JSON.stringify({
          userId,
          adrress,
          city,
          date,
          payment
        }),
      });
      const ans = await res.json();
      
      this.cartArr=[]
      this.totalCart=0
      return ans.status
      
      
    } catch (err) {
      return err;
    }

  }
  public async getOrders() {
    try {
      const res = await fetch(`http://localhost:1000/getorders`, {
        method: 'get',
        headers: { 'content-type': 'application/json' },
        
      });
      const ans = await res.json();
      if (!ans.orders) {
        this.numOfOrders = 0
        
      }
      else{
        this.numOfOrders = ans.orders
      }
      
      
      
    } catch (err) {
      return err;
    }
  }
  public async getCartTotal(userId:number){
    try {
      const res = await fetch(`http://localhost:1000/getcarttotal/${userId}`, {
        method: 'get',
        headers: { 'content-type': 'application/json', 'authorization':`${localStorage.token}` },

        
      });
      const ans = await res.json();
      
      
      
      if (!ans[0].number) {
        this.totalCart=0
      }
      else{
        this.totalCart=ans[0].number

      }
      
      
    } catch (err) {
      return err;
    }

  }
  public async changeQuantity(quantity:number,id:number,productId:number){
    try {
      const res = await fetch(`http://localhost:1000/updatecart/${id}`, {
        method: 'put',
        headers: { 'content-type': 'application/json', 'authorization':`${localStorage.token}` },
        body: JSON.stringify({
          quantity,
          productId
        }),
      });
      const ans = await res.json();
      this.cartArr = ans

      
      
      
    } catch (err) {
      return err;
    }

  }
  public async getDeliverys(){
    try {
      const res = await fetch('http://localhost:1000/getdeliverydates', {
        method: 'get',
        headers: { 'content-type': 'application/json', 'authorization':`${localStorage.token}` },
        
      });
      const ans = await res.json();
      return ans
      
      
    } catch (err) {
      return err;
    }

  }
  
  




  constructor() { }
}

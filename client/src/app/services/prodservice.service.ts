import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category.model';
import ProdModel from '../models/prod.model';

@Injectable({
  providedIn: 'root'
})
export class ProdserviceService {

  public prodArr:ProdModel[]
  public numOfProducts:number=0
  public categorysArr:CategoryModel[]
  public colorArr:string[]=["primary","accent","warn"]
  public prodId:number
  public inputInfo:any
  public fullProdArr:ProdModel[]
  public answer:string
  



 


  public async getProds() {
    try {
      const res = await fetch('http://localhost:1000/getprod', {
        method: 'get',
        headers: { 'content-type': 'application/json' },
        
      });
      const ans = await res.json();
      this.fullProdArr = ans

      
    } catch (err) {
      return err;
    }
  }
  public async addProd(name:string, category:string, img:string,price:number ) {
    try {
      const res = await fetch('http://localhost:1000/addprod', {
        method: 'post',
        headers: { 'content-type': 'application/json', 'authorization':`${localStorage.token}` },

        body: JSON.stringify({
          name,
          category,
          img,
          price
          
        }),
      });
      const ans = await res.json();
      this.fillterForCategory(this.prodArr[0].category)
      this.answer = ans.some
      
      
    } catch (err) {
      return err;
    }
  }
  public async removeProd(id:number){
    try {
      const res = await fetch('http://localhost:1000/deleteprod', {
        method: 'delete',
        headers: { 'content-type': 'application/json', 'authorization':`${localStorage.token}` },
        body: JSON.stringify({
          id
          
          
        }),
      });
      const ans = await res.json();
      this.prodArr=ans
      
      
    } catch (err) {
      return err;
    }

  }
  public async editProd(id:number,name:string,category:string,img:string,price:number){
    try {
      const res = await fetch('http://localhost:1000/editprod', {
        method: 'put',
        headers: { 'content-type': 'application/json', 'authorization':`${localStorage.token}` },

        body: JSON.stringify({
          id,
          name,
          category,
          img,
          price
        }),
      });
      const ans = await res.json();
      this.fillterForCategory(this.prodArr[0].category)
      this.answer = ans.some
      
      
      
    } catch (err) {
      return err;
    }

  }
  public async getNumberOfProducts() {
    try {
      const res = await fetch('http://localhost:1000/getnumberofprods', {
        method: 'get',
        headers: { 'content-type': 'application/json' },
        
      });
      const ans = await res.json();
      this.numOfProducts = ans[0].number
      
    } catch (err) {
      return err;
    }
  }
  public async getCategorysArr() {
    try {
      const res = await fetch('http://localhost:1000/categorys', {
        method: 'get',
        headers: { 'content-type': 'application/json' },
        
      });
      const ans = await res.json();
      console.log(ans);
      
      this.categorysArr = ans
      
    } catch (err) {
      return err;
    }
  }
  public async fillterForCategory(name:string) {
    
    
    try {
      const res = await fetch(`http://localhost:1000/categorys/${name}`, {
        method: 'get',
        headers: { 'content-type': 'application/json' },
        
      });
      const ans = await res.json();
      
      
      this.prodArr = ans
    

      
    } catch (err) {
      return err;
    }
  }
  public async getProdById(id:number) {
    try {
      const res = await fetch(`http://localhost:1000/getprod/${id}`, {
        method: 'get',
        headers: { 'content-type': 'application/json' },
        
      });
      const ans = await res.json();
      this.inputInfo = ans
      
    } catch (err) {
      return err;
    }
  }
  async putValuesInInputs(name:any,category:any,img:any,price:any){
    await this.getProdById(this.prodId)
      console.log(this.inputInfo);
     name.setValue(this.inputInfo[0].name)
     category.setValue(this.inputInfo[0].category)
     img.setValue(this.inputInfo[0].img)
     price.setValue(this.inputInfo[0].price)
 
 
   }
  

  constructor() { }
}

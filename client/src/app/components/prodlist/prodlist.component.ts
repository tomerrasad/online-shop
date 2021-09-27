import { Component, OnInit} from '@angular/core';
import { ProdserviceService } from 'src/app/services/prodservice.service';

@Component({
  selector: 'app-prodlist',
  templateUrl: './prodlist.component.html',
  styleUrls: ['./prodlist.component.css']
})
export class ProdlistComponent implements OnInit {
  
  

  constructor(public _prod:ProdserviceService) { }
  
 async getInfo(){
    await this._prod.getProds()
    await this._prod.getCategorysArr()
    this._prod.prodArr =this._prod.fullProdArr.filter(prod=>prod.category === this._prod.fullProdArr[0].category)

  }

  ngOnInit(): void {
    this.getInfo()

  }

}

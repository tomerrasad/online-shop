import { Component, OnInit } from '@angular/core';
import { CartserviceService } from 'src/app/services/cartservice.service';
import {pdfMake} from 'pdfmake/build/pdfmake'
import {pdfFonts} from 'pdfmake/build/vfs_fonts'
import { UserserviceService } from 'src/app/services/userservice.service';



@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.component.html',
  styleUrls: ['./ordersuccess.component.css']
})
export class OrdersuccessComponent implements OnInit {
 
  
  




  constructor(public _cart:CartserviceService, public _user:UserserviceService) { }

  ngOnInit(): void {
    this._cart.createData()
    console.log("im here");
    
    
    
    
  }

  
}

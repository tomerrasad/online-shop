import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // public component:boolean=true
  

  constructor(public _user:UserserviceService) { }
  

  ngOnInit(): void {
    // this.component=this._user.component
  }

}

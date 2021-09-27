import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-registerbody',
  templateUrl: './registerbody.component.html',
  styleUrls: ['./registerbody.component.css']
})
export class RegisterbodyComponent implements OnInit {

  constructor(public _user:UserserviceService) { }

  ngOnInit(): void {
  }

}

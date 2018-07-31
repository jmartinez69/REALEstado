import { Component, OnInit } from '@angular/core';
import { REsessionService } from '../../resession.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: REsessionService) { }

  ngOnInit() {
  }
  login(username:string, password:string){
    console.log("login....");
    this.service.login(username,password).subscribe( user => {
      console.log(user);
    });
  }
}

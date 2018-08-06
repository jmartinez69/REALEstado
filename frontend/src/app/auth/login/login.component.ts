import { Component, OnInit } from '@angular/core';
import { REsessionService } from '../../resession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: REsessionService, public router: Router) { }

  ngOnInit() {
  }
  login(username:string, password:string){
    this.service.login(username,password).subscribe( user => {
    this.router.navigate([""]);
    });
  }
}

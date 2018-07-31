import { Component, OnInit } from '@angular/core';
import { REsessionService } from '../../resession.service';
import { Router } from '@angular/router';
import { StaticInjector } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public service: REsessionService , private router:Router) { }

  ngOnInit() {
  }
  signup(username:string, password:string, email: string){
    console.log("signup....");
    this.service.signup(username,password, email).subscribe( (user:any) =>{
      console.log(`WELCOME USER, register OK`);
      console.log(`User vale lo siguiente: ${user}`);
      this.router.navigate(['/']);
    });
  }
}

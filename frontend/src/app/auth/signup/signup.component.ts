import { Component, OnInit } from '@angular/core';
import { REsessionService } from '../../resession.service';
import { Router } from '@angular/router';
import { StaticInjector } from '@angular/core/src/di/injector';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

const {BASEURL} = environment;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username;
  password;
  email;
  error;

  uploader: FileUploader = new FileUploader({
    url: `${BASEURL}/auth/signup`,
    method: 'POST'
  });
  feedback;


  constructor(public service: REsessionService , private router:Router) { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  signup(username:string, password:string, email: string){
    if((this.uploader._nextIndex==0) && (this.uploader.queue.length==0)){
      console.log("envío sin archivo")
      this.service.signup(username,password, email).subscribe( (user:any) =>{

        this.router.navigate(['/']);
      });
    } else 
    {
      console.log("Envío con archivo")
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('username', username);
        form.append('password', password);
        form.append('email', email);
      };
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = () => {
      this.router.navigate(['/']);
      };
    }

  }
}

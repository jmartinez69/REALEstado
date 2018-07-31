import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import {map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

const {BASEURL} = environment;

interface UserObject{
  username:string,
}


@Injectable({
  providedIn: 'root'
})
export class REsessionService {

  user:UserObject;

  options:object = {withCredentials:true};


  constructor(private http:Http) {
    this.isLogged().subscribe();
  }

  isLogged(){
    return this.http.get(`${BASEURL}/auth/loggedin`,this.options).pipe(
      map( (res:Response) => {
        this.user = res.json();
        console.log(`Login automático de ${this.user.username}`);
        return this.user;
      }),
      catchError(e => {console.log("Debes hacer login primero!"); return of(e)})
    );
  }


  errorHandler(e){
    console.log('SessionServiceError')
    console.log(e.message);
    console.log(e);
    return e;
  }

  signup(username:string, password:string, email: string): Observable<object>{
    return this.http.post(`${BASEURL}/auth/signup`,{username,password, email},this.options).pipe(
      map( (res:Response) => {
        let data = res.json();
        console.log(`Signup: la función retorno el siguiente valor: ${data}`)
//        this.user = data.user;
        this.user = null;
        return this.user;
      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }

  login(username:string, password:string): Observable<object>{
    return this.http.post(`${BASEURL}/auth/login`,{username,password},this.options).pipe(
      map( (res:Response) => {
        let user = res.json();
        this.user = user;
        return this.user;
      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }

  logout(){
    return this.http.post(`${BASEURL}/auth/logout`,this.options).pipe(
      map( (res:Response) => {
        this.user = null;
      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }
}

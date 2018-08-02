import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import {map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { REsessionService } from '../resession.service';

const {BASEURL} = environment;

@Injectable({
  providedIn: 'root'
})
export class REPisosService {
  lat: Number = 40.3925321;
  lon: Number =-3.7004609; 
  constructor(private http:Http, private sessionService:REsessionService) {  }

  getListPisos(){
    const lat =40.3925321;
    const lon =-3.7004609; 

   if (this.sessionService.userIsLogged()){
      return this.http.post(`${BASEURL}/pisos`, {lat , lon}).pipe(
      map( (res:Response) => {
        return res.json();
      }),
      catchError(e => {console.log("Error trayendo la lista de inmuebles!"); return of(e)})
    );
   } else {
      return this.http.get(`${BASEURL}/pisos`).pipe(
      map( (res:Response) => {
        return res.json();
      }),
      catchError(e => {console.log("Error trayendo la lista de inmuebles!"); return of(e)})
    );    
   }
  }

  getPiso(id: string){
    return this.http.get(`${BASEURL}/pisos/${id}`).pipe(
      map( (res:Response) => {
        return res.json();
      }),
      catchError(e => {console.log(`Error trayendo el piso con id ${id}`); return of(e)})
    );
  }
}


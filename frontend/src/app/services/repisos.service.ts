import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import {map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { REsessionService } from '../resession.service';
import { LocalizameService } from './localizame.service';

const {BASEURL} = environment;

@Injectable({
  providedIn: 'root'
})
export class REPisosService {
  lat: Number = 0;
  lng: Number = 0; 

  pisosList;
  constructor(private http:Http, private sessionService:REsessionService, private localizameService: LocalizameService) {  }

  getListPisos(){

     this.lat = this.localizameService.latActual;
     this.lng = this.localizameService.lonActual;

   console.log(`Estoy posicionado en: ${this.lat} y ${this.lng}`)
   if (this.sessionService.userIsLogged()){
      return this.http.post(`${BASEURL}/pisos`, {lat: this.lat , lon:this.lng}).pipe(
      map( (res:Response) => {
        this.pisosList = res.json();
        return res.json();
      }),
      catchError(e => {console.log("Error trayendo la lista de inmuebles!"); return of(e)})
    );
   } else {
     console.log('deslogueado');
      return this.http.get(`${BASEURL}/pisos`).pipe(
      map( (res:Response) => {
        this.pisosList = res.json();
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

  
  addPiso(piso:Object): Observable<object>{
    let user = this.sessionService.user;
    return this.http.post(`${BASEURL}/pisos/add`,{piso , user}).pipe(
      map( (res:Response) => {
        let data = res.json();
        console.log(`Add piso: la función retorno el siguiente valor: ${data}`)
// ======== Colocar aquí limpiar objeto newPiso       
        return data;
      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }
  errorHandler(e){
    console.log('SessionServiceError')
    console.log(e.message);
    console.log(e);
    return e;
  }
}



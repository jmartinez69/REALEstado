import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import {map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

const {BASEURL} = environment;

@Injectable({
  providedIn: 'root'
})
export class REPisosService {

  constructor(private http:Http) { }

  getListPisos(){
    return this.http.get(`${BASEURL}/pisos`).pipe(
      map( (res:Response) => {
 //       this.user = res.json();
 //       console.log(`Login automático de ${this.user.username}`);
        return res.json();
      }),
      catchError(e => {console.log("Error trayendo la lista de inmuebles!"); return of(e)})
    );
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


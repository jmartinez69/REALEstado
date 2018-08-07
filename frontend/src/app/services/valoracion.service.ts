import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { REsessionService } from '../resession.service';
import { REPisosService } from './repisos.service';


const {BASEURL} = environment;

@Injectable({
  providedIn: 'root'
})

export class ValoracionService {

  constructor(private http:Http, public sessionService: REsessionService, public pisoService: REPisosService) { }

  valoracionList;

  getListValoracion(id: string){
       return this.http.get(`${BASEURL}/valoracion/${id}`).pipe(
       map( (res:Response) => {
         this.valoracionList = res.json();
         return res.json();
       }),
       catchError(e => {console.log("Error trayendo la lista de valoracion!"); return of(e)})
     );    
    }

  addValoracion(idPiso: string, idUser: string, valoracion: object ){
    console.log("Dentro de adedValoracion =====");
    return this.http.post(`${BASEURL}/valoracion/add`, {idPiso, idUser , valoracion }).pipe(
      map( (res:Response) => {
        this.valoracionList = res.json();
        return res.json();
      }),
      catchError(e => {console.log("Error insertando publicación de valoración!"); return of(e)})
    );    
   }    
}


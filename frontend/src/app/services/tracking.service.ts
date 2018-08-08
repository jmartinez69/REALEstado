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

export class TrackingService {

  trackingList;

  constructor(private http:Http, private sessionService:REsessionService) { }

  getTracking(idUser: string){
    return this.http.get(`${BASEURL}/tracking/${idUser}`).pipe(
    map( (res:Response) => {
      this.trackingList = res.json();
      return res.json();
    }),
    catchError(e => {console.log("Error trayendo la lista de traking!"); return of(e)})
  );    
 }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import {map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { REsessionService } from '../resession.service';

interface Coords {
  lat: Number;
  lng: Number;
}

@Injectable({
  providedIn: 'root'
})
export class LocalizameService {

  lonActual: Number;
  latActual: Number;

  constructor() {   
     this.geolocate().then(position  => {
      this.lonActual = position.lng;
      this.latActual = position.lat;
 })
}


  geolocate(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Try to get a geolocation object from the web browser
      if (navigator.geolocation) {

        // Get current position
        // The permissions dialog will popup
        navigator.geolocation.getCurrentPosition(function (position) {
          // Create an object to match
          // google's Lat-Lng object format
          console.log("GEOPOSICION A CONTINUACION")
          console.log(position);
          // this.latActual = position.coords.latitude;
          // this.lonActual = position.coords.longitude;

          const myPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log('myPosition: ', myPosition);
          resolve(myPosition);
        }, ()  => reject('Error in the geolocation service.')); // If something else goes wrong
      } else {
        reject('Browser does not support geolocation.'); // Browser says: Nah! I do not support this.

      }
    })
  }





}

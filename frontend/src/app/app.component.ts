import { Component } from '@angular/core';
import { REsessionService } from './resession.service';
import { Router } from '@angular/router';
import { REPisosService } from './services/repisos.service';
import { LocalizameService } from './services/localizame.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'REALEstado';
  setIntervalId: any;

  constructor(public sessionService:REsessionService, public router: Router, public pisosService: REPisosService, public geoLocService: LocalizameService) { 
        this.setIntervalId = setInterval(function(){

       if (sessionService.userIsLogged()){
          geoLocService.geolocate().then(position  => {
          geoLocService.lonActual = position.lng;
          geoLocService.latActual = position.lat;
          sessionService.saveLocation(position.lat, position.lng).subscribe(posActual =>{
            console.log("Salvada la posicion actual");
            console.log(posActual);
          })
        })
            console.log("Guardando geo localizacion")
          }
        },150000);   
   }

  logout(){
    this.sessionService.logout().subscribe(() => {
      this.pisosService.getListPisos();
      clearInterval(this.setIntervalId);
      this.router.navigate([""]);
    });
  }
}
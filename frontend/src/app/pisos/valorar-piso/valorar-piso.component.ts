import { Component, OnInit, Input } from '@angular/core';
import { ValoracionService } from '../../services/valoracion.service';
import { ActivatedRoute } from '@angular/router';
import { REsessionService } from '../../resession.service';
import { TrackingService } from '../../services/tracking.service';

@Component({
  selector: 'app-valorar-piso',
  templateUrl: './valorar-piso.component.html',
  styleUrls: ['./valorar-piso.component.css']
})



export class ValorarPisoComponent implements OnInit {

  @Input() pisoDetalle: any;
  @Input() verValoracion: boolean;
  @Input() pisoID: any;

  addValoracion: object = {
    puntuacion: 0,
    comentario: ""
  };  
  valorPiso: Number = 0;
  addValEnable: Boolean = false;
  puedeValorar: Boolean = true;
  listaValoracion: Array<any> = [];
  avgValoracion: Number =0;
  listaTraking: any = [];

  constructor(public valService: ValoracionService, private route: ActivatedRoute, public sessionService: REsessionService, public trackingService: TrackingService) {
   }



  ngOnInit() {
    if (this.sessionService.userIsLogged()) {
      let idUser=this.sessionService.user._id;
      this.trackingService.getTracking(idUser).subscribe( tracking => {
        console.log(tracking);
        this.listaTraking = tracking;
        if (tracking.length > 0) {
            if (!this.pasoPorAhi(this.listaTraking, this.pisoDetalle.location.coordinates)){
                this.puedeValorar = false;
            }
        } else {
                this.puedeValorar = false;          
        }
      })    
    }

      this.valService.getListValoracion(this.pisoDetalle._id).subscribe(lista => {
      this.listaValoracion = lista;
      console.log("Esta es la lista de valoracion");
      console.log(lista);
      if ( lista.length != 0) {
        let sum = 0;
        for (let i=0; i < lista.length ; i++){
          sum += lista[i].puntuacion;
        }
          this.avgValoracion = parseFloat((sum / lista.length).toFixed(2));
      } else {
        this.avgValoracion = 0;
      }

    }); 
  }
  addValorForm(){
    this.addValEnable = !this.addValEnable;
  }
  newValor(){
    let idPiso=this.pisoDetalle._id;
    let idUser=this.sessionService.user._id;

    this.valService.addValoracion(idPiso, idUser, this.addValoracion).subscribe( comment => {    
      console.log("A continuacion detalle del comentario =========")
      console.log(comment);

      this.addValEnable = !this.addValEnable;  
    });

  }

distanceBPoints(lat1: number,lon1: number, lat2:number, lon2: number) {
  let R = 6371e3; // metres
  let φ1 = lat1 * Math.PI / 180;
  let φ2 = lat2 * Math.PI / 180;
  let Δφ = (lat2-lat1) *  Math.PI / 180;
  let Δλ = (lon2-lon1) * Math.PI / 180;

  let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  let d = R * c;
  return d;
  }
  pasoPorAhi(arrTrack:any, coordPiso: any){
    let distancia = 2000;
    for (let i=0; i < arrTrack[0].geotracking.length; i++){
      distancia=this.distanceBPoints( 
        arrTrack[0].geotracking[i].location[0],
        arrTrack[0].geotracking[i].location[1],
        coordPiso[0],
        coordPiso[1]        
      );
      console.log("Distancia entre los dos puntos es: " + distancia);
      if (distancia <= 1000){
        return true;    
      }
    }
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { REPisosService } from '../../services/repisos.service';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { LocalizameService } from '../../services/localizame.service';

@Component({
  selector: 'app-piso-detalle',
  templateUrl: './piso-detalle.component.html',
  styleUrls: ['./piso-detalle.component.css']
})
export class PisoDetalleComponent implements OnInit {

  pisoDetalle: Object = {
    proposito: "",
    contacto: {
      nombre: "",
      telefono: "",
      email: ""
    },
    direccion: {
      provincia: "",
      localidad: "",
      calle: "",
      numero: 0,
      planta: 0,
      numPiso: ""
    },
    location: {
      type: "Point",
      coordinates: [0, 0]
    },
    fotos: [""],
    precio: 0,
    descripcion: "",
    tipo: "",
    caracteristicas: {
      tamanom2: 0,
      numHab: 0,
      numBan: 0
    }
  };
  pisoID: string;
  zoom: Number = 15;


  constructor(public service:REPisosService, private route: ActivatedRoute, public serviceLoc: LocalizameService) {
    this.route.params
    .subscribe((params) => this.pisoID = params['id']);
    service.getPiso(this.pisoID).subscribe( piso => {    
      this.pisoDetalle = piso;
      console.log("A continuacion piso detalle =========")
      console.log(this.pisoDetalle);
      console.log(this.zoom);

      });

      
    };
  


  ngOnInit() {
  }

}

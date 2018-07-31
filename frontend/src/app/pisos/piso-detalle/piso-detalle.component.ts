import { Component, OnInit } from '@angular/core';
import { REPisosService } from '../../services/repisos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-piso-detalle',
  templateUrl: './piso-detalle.component.html',
  styleUrls: ['./piso-detalle.component.css']
})
export class PisoDetalleComponent implements OnInit {

  pisoDetalle: Object = {};
  pisoID: string;

  constructor(public service:REPisosService, private route: ActivatedRoute) {
    this.route.params
    .subscribe((params) => this.pisoID = params['id']);
    service.getPiso(this.pisoID).subscribe( piso => {    
      this.pisoDetalle = piso;
      console.log("A continuacion piso detalle =========")
      console.log(this.pisoDetalle);
      });
    };
  


  ngOnInit() {
  }

}

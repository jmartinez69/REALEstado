import { Component, OnInit, Input } from '@angular/core';
import { ValoracionService } from '../../services/valoracion.service';
import { ActivatedRoute } from '@angular/router';

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
  formValEnable: Boolean = false;
  listaValoracion: Array<any> = [];

  constructor(public valService: ValoracionService, private route: ActivatedRoute) {
   }



  ngOnInit() {
    console.log(this.pisoDetalle);
      this.valService.getListValoracion(this.pisoDetalle._id).subscribe(lista => {
      this.listaValoracion = lista;
      console.log(lista);
    }); 
  }

}

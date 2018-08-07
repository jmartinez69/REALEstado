import { Component, OnInit, Input } from '@angular/core';
import { ValoracionService } from '../../services/valoracion.service';
import { ActivatedRoute } from '@angular/router';
import { REsessionService } from '../../resession.service';

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
  listaValoracion: Array<any> = [];
  avgValoracion: Number =0;

  constructor(public valService: ValoracionService, private route: ActivatedRoute, public sessionService: REsessionService) {
   }



  ngOnInit() {
    console.log(this.pisoDetalle);
      this.valService.getListValoracion(this.pisoDetalle._id).subscribe(lista => {
      this.listaValoracion = lista;
      console.log(lista);
      let sum = 0;
      for (let i=0; i < lista.length ; i++){
        sum += lista[i].puntuacion;
      }
      this.avgValoracion = parseFloat((sum / lista.length).toFixed(2));
      console.log("Resultado del average: " + this.avgValoracion);

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

}

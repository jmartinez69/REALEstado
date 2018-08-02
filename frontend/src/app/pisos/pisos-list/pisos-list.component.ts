import { Component, OnInit } from '@angular/core';
import { REPisosService } from '../../services/repisos.service';


@Component({
  selector: 'app-pisos-list',
  templateUrl: './pisos-list.component.html',
  styleUrls: ['./pisos-list.component.css']
})
export class PisosListComponent implements OnInit {

  listaPisos: Array<any> = [];

  constructor(public service: REPisosService) { this.listarPisos();}

  ngOnInit() {
  }

  listarPisos(){
    this.service.getListPisos().subscribe( lista => {    
      this.listaPisos=lista;
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { REPisosService } from "../../services/repisos.service";
import { REsessionService } from "../../resession.service";

interface Piso {
  proposito: String;
  contacto: {
    nombre: String;
    telefono: String;
    email: String;
  };
  direccion: {
    provincia: String;
    localidad: String;
    calle: String;
    numero: Number;
    planta: Number;
    numPiso: String;
  };
  location: {
    type: String;
    coordinates: [Number];
  };
  fotos: [String];
  precio: Number;
  descripcion: String;
  tipo: String;
  caracteristicas: {
    tamanom2: Number;
    numHab: Number;
    numBan: Number;
  };
}

@Component({
  selector: "app-pisos-list",
  templateUrl: "./pisos-list.component.html",
  styleUrls: ["./pisos-list.component.css"]
})
export class PisosListComponent implements OnInit {
  newPiso: object = {
    idUser: "",
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
    },
    fechaPublicacion: ""
  };
  formEnable: Boolean = false;
  filtroEnable: Boolean = true;
  listaPisos: Array<any> = [];

  constructor(
    public service: REPisosService,
    public sessionService: REsessionService
  ) {
    this.listarPisos();
  }

  ngOnInit() {
    this.listarPisos();
  }
  
  addNewPiso() {
    console.log("Entre al add new piso");
    console.log(this.newPiso);
    this.formEnable = !this.formEnable;
    this.filtroEnable = !this.filtroEnable;
    this.service.addPiso(this.newPiso).subscribe( (piso:any) =>{
    console.log("Piso Agregado:");
    console.log(piso);
    this.listarPisos();
//        this.router.navigate(['/']);
      });

    
  }

  addForm() {
    console.log("ENTREEEEEE AL ADD FORMMMMMMMMMM");
    this.formEnable = !this.formEnable;
    this.filtroEnable = !this.filtroEnable;

  }

  listarPisos() {
    this.service.getListPisos().subscribe(lista => {
      this.listaPisos = lista;
    });
  }
}

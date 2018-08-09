import { Component, OnInit } from "@angular/core";
import { REPisosService } from "../../services/repisos.service";
import { REsessionService } from "../../resession.service";
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { LocalizameService } from "../../services/localizame.service";


const {BASEURL} = environment;

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

  patternTipo;
  patternProp;
  patternLoc;
  patternCalle;
  patternHab;
  patternBan;
  patternPrecio;

  uploader: FileUploader = new FileUploader({
    url: `${BASEURL}/pisos/add`,
    method: 'POST'
  });
  feedback;

  newPiso: any = {
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
    public sessionService: REsessionService,
    public localizameService: LocalizameService
  ) {
    this.listarPisos();
  }

  ngOnInit() {
    this.formEnable =false;
    this.filtroEnable=true;
    this.listarPisos();

  }
  
  addNewPiso() {
    this.newPiso.location.coordinates[0] = this.localizameService.latActual;
    this.newPiso.location.coordinates[1] = this.localizameService.lonActual;

    if((this.uploader._nextIndex==0) && (this.uploader.queue.length==0)){
      console.log("envío sin archivo")
      console.log("Entre al add new piso");
      console.log(this.newPiso);
      this.formEnable = !this.formEnable;
      this.filtroEnable = !this.filtroEnable;
      this.service.addPiso(this.newPiso).subscribe( (piso:any) =>{
      console.log("Piso Agregado:");
      console.log(piso);
      this.listarPisos();
      });
    } else 
    {
      console.log("Envío con archivo")
      this.uploader.onBuildItemForm = (item, form) => {

        form.append('proposito', this.newPiso.proposito);
        form.append('nombre', this.newPiso.contacto.nombre);
        form.append('telefono', this.newPiso.contacto.telefono);
        form.append('email', this.newPiso.contacto.email); 
        form.append('provincia', this.newPiso.direccion.provincia);  
        form.append('localidad', this.newPiso.direccion.localidad);  
        form.append('calle', this.newPiso.direccion.calle);     
        form.append('numero', this.newPiso.direccion.numero);   
        form.append('planta', this.newPiso.direccion.planta);   
        form.append('numPiso', this.newPiso.direccion.numPiso);  
        form.append('lat', this.newPiso.location.coordinates[0]);  
        form.append('lon', this.newPiso.location.coordinates[1]);  
        form.append('precio', this.newPiso.precio);  
        form.append('descripcion', this.newPiso.descripcion); 
        form.append('tipo', this.newPiso.tipo); 
        form.append('tamanom2', this.newPiso.caracteristicas.tamanom2);
        form.append('numHab', this.newPiso.caracteristicas.numHab);                 
        form.append('numBan', this.newPiso.caracteristicas.numBan);  
        form.append('userID', this.sessionService.user._id); 
        console.log(this.sessionService.user._id);
      };
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = () => {
    //  consioi    this.filtroEnable = !this.filtroEnable;
        console.log("Envio de archivo completado");
      };
      this.formEnable = !this.formEnable;
      this.filtroEnable = !this.filtroEnable;
    }


    
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

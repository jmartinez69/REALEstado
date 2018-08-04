import { Component } from '@angular/core';
import { REsessionService } from './resession.service';
import { Router } from '@angular/router';
import { REPisosService } from './services/repisos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'REALEstado';
  constructor(public sessionService:REsessionService, public router: Router, public pisosService: REPisosService) { }

  logout(){
    this.sessionService.logout().subscribe(() => {
      this.pisosService.getListPisos();
      this.router.navigate([""]);
    });
  }
}
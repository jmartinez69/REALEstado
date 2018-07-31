import { Component } from '@angular/core';
import { REsessionService } from './resession.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'REALEstado';
  constructor(private sessionService:REsessionService) { }

  logout(){
    this.sessionService.logout().subscribe();
  }
}
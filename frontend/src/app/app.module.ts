import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { RouterModule } from '../../node_modules/@angular/router';
import { routes } from './routes';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { REsessionService } from './resession.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PisosListComponent } from './pisos/pisos-list/pisos-list.component';
import { PisoDetalleComponent } from './pisos/piso-detalle/piso-detalle.component';
import { REPisosService } from './services/repisos.service';


import { AgmCoreModule } from '@agm/core';
//mport { GoogleMapsAPIWrapper } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { LocalizameService } from './services/localizame.service';
import { FilterPipe } from './pipes/filter';
import { FileSelectDirective } from 'ng2-file-upload';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PisosListComponent,
    PisoDetalleComponent,
    FilterPipe,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyClr_fVK41OBJxuab_HEI3I30pcijqHB7E'
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [REsessionService,
              REPisosService,
              LocalizameService],
  bootstrap: [AppComponent]
})
export class AppModule { }

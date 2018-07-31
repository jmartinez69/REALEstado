import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PisosListComponent,
    PisoDetalleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [REsessionService,
              REPisosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { PisosListComponent } from './pisos/pisos-list/pisos-list.component';
import { PisoDetalleComponent } from './pisos/piso-detalle/piso-detalle.component';

export const routes: Routes = [
  { path:'', component:PisosListComponent}, 
  { path:'signup', component:SignupComponent},
  { path:'login', component:LoginComponent},
  { path: 'pisos/:id', component: PisoDetalleComponent }
];
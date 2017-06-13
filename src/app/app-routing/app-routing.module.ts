import { LoginComponent } from './../auth/login/login.component';
import { SignupComponent } from './../auth/signup/signup.component';
import { NgModule } from '@angular/core';

import { HomeComponent } from './../core/home/home.component';

import { PlacesGuardService } from './../services/places-guard.service';
import { PlaceListComponent } from './../core/place-list/place-list.component';
import { PlacesResolverService } from './../services/places-resolver.service';

import { 
  Routes, 
  RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'places', component: PlaceListComponent, canActivate: [PlacesGuardService] ,resolve: {places: PlacesResolverService}},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    PlacesResolverService,
    PlacesGuardService
  ]
})
export class AppRoutingModule { }

import { Router } from '@angular/router';

import { LocationService } from './location.service';

import { Injectable } from '@angular/core';

import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  RouterStateSnapshot } from '@angular/router';

@Injectable()
export class PlacesGuardService implements CanActivate {
  constructor(
    private locationService: LocationService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let address = this.locationService.getAddressFromStorage();
    if(address && address !== '') return true;
    else {
      this.router.navigate(['']);  
    }
  }
}
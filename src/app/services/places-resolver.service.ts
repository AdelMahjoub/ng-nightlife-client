import { Observable } from 'rxjs/Observable';
import { LocationService } from './location.service';
import { Injectable } from '@angular/core';

import { 
  Resolve, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot } from "@angular/router";

@Injectable()
export class PlacesResolverService implements Resolve<any>{

  constructor(private locationService: LocationService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> {
      let places = this.locationService.getPlaces();
      if(places) return places;
      else return this.locationService.getPlacesByAddress(); }
}
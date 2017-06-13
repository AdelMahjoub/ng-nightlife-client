import { 
  Component, 
  OnInit } from '@angular/core';

import { 
  ActivatedRoute, 
  Router } from "@angular/router";

import { 
  trigger, 
  state, 
  style, 
  transition, 
  animate } from "@angular/animations";

import { LocationService } from '../../services/location.service';
import { UserLocation } from '../../models/user-location.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('pageOpen', [
      style({
        opacity: 1,
        transform: 'translateY(0)'
      }),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(100px)'
        }),
        animate(300)
      ])
    ]),
    trigger('notify', [
      state('coming', style({
        opacity: 0,
        transform: 'translateX(-200px)'
      })),
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('out', style({
        opacity: 0,
        transform: 'translateX(200px)'
      })),
      transition('coming => in', animate(500)),
      transition('in => out', animate(500))
    ])
  ]
})
export class HomeComponent implements OnInit{

  userLocation: UserLocation;

  address       = '';
  placesLoading = false;   // Loading spinner trigger
  infoMessage   = '';      // Feedbacks for user
  infoAnimState = 'coming';

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {

  }

  /**
   * Check if the navigator supports geolocation
   * Then try get the user location with navigator.geolocation.getCurrentPosition
   */
  tryGetGeolocation(): void {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getGeoLocation.bind(this), this.getGelocError.bind(this))
    } else {
      this.infoMessage = 'Geolocation is not supported';
      this.notify();    
    }
  }

  /**
   * navigator.geolocation.getCurrentPosition success callback
   * userLocation.errorCode = 0
   * @param res 
   */
  getGeoLocation(res: Position): void {
    this.userLocation = new UserLocation(res);

    this.locationService.getUserAddress(this.userLocation)
      .subscribe(
        (data: {address: string, placeId: string}) => {
          if(data.address !== '') {
            this.address = data.address;
          }
        }
      )
  }

  /**
   * navigator.geolocation.getCurrentPosition error callback
   * userLocation.errorCode = 1
   * @param res 
   */
  getGelocError(res: PositionError): void {
    this.infoMessage = 'Geolocation is deactivated';
    this.notify();
  }

  /**
   * Submit user address and fetch places around
   */
  onSubmit() {
    if(this.address) {
      this.locationService.setUserAddress(this.address);
      this.placesLoading = true;
      this.router.navigate(['places']);
    }
  }

  ngOnDestroy() {
    this.placesLoading = false;
  }

  notify() {
    this.infoAnimState = 'in';
    setTimeout(() => {
      this.infoAnimState = 'out';
      setTimeout(() => {
        this.infoAnimState = 'coming';
      }, 510)
    }, 2000)
  }
}

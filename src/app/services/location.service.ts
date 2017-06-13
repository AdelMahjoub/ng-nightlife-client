import { AuthService } from './auth.service';
import { ApiEndPointService } from './api-endpoint.service';
import { UserLocation } from './../models/user-location.model';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LocationService {
  
  baseUrl: string;
  address = '';
  
  constructor(
    private http: Http,
    private apiEndPonit: ApiEndPointService,
    private authService: AuthService) { 
      this.baseUrl = apiEndPonit.getUrl();
  }
  
  getUserAddress(userLoaction: UserLocation): Observable<any> {
    return this.http.post(`${this.baseUrl}/location`, userLoaction)
      .map(
        (response: Response) => {
          return response.json()
        }
      )
  }

  getPlacesByAddress(): Observable<any> {
    return this.http.post(`${this.baseUrl}/places-by-address`, {address: this.getAddressFromStorage()})
      .map(
        (response: Response) => {
          this.storePlaces(response.json().businesses);
          return response.json().businesses;
        }
      )
  }

  setUserAddress(address: string): void {
    this.address = address;
    this.clearPlaces();
    localStorage.setItem('address', this.address);
  }

  getAddressFromStorage(): string | null{
    return localStorage.getItem('address');
  }

  storePlaces(places: any): void {
    localStorage.setItem('places', (JSON.stringify(places)));
  }

  getPlacesFromStorage(): any {
    return JSON.parse(localStorage.getItem('places'));
  }

  clearPlaces(): void {
    localStorage.removeItem('places');
  }

  update(userId: string, placeId: string): Observable<any> {
    const auth = 'Bearer ' + this.authService.getTokenFromStorage();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', auth);
    const options = new RequestOptions({ headers });
    return this.http.post(`${this.baseUrl}/update`, {userId, placeId}, options)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
  }

  updateLocalStorage(placeId: string, going: number): void {
    let places = this.getPlacesFromStorage();
    places = places.map(place => {
      if(place.id === placeId) {
        place.going = going;
      }
      return place;
    });
    this.storePlaces(places);
  }

}
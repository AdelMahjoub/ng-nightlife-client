import { UserLocation } from './../models/user-location.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LocationService {
  
  baseUrl = '/api';
  address = '';
  
  constructor(private http: Http) { }
  
  /**
   * 
   * @param userLoaction 
   */
  getUserAddress(userLoaction: UserLocation): Observable<any> {
    return this.http.post(`${this.baseUrl}/location`, userLoaction)
      .map(
        (response: Response) => {
          return response.json()
        }
      )
  }

  /**
   * get places from server and store them in local storage
   */
  getPlacesByAddress(): Observable<any> {
    return this.http.post(`${this.baseUrl}/places-by-address`, {address: this.getAddressFromStorage()})
      .map(
        (response: Response) => {
          this.storePlaces(JSON.stringify(response.json().places));
          return response.json().places;
        }
      )
  }

  /**
   * Store address in localStorage
   * Clear previous places
   * @param address 
   */
  setUserAddress(address: string): void {
    this.address = address;
    this.clearPlaces();
    localStorage.setItem('address', this.address);
  }

  /**
   * return address stored in localstorage
   */
  getAddressFromStorage(): string | null{
    return localStorage.getItem('address');
  }

  /**
   * Store places in local storage
   * @param places 
   */
  storePlaces(places: any): void {
    localStorage.setItem('places',  places);
  }

  /**
   * return places stored in local storage
   */
  getPlaces(): any {
    return JSON.parse(localStorage.getItem('places'));
  }


  /**
   * 
   */
  clearPlaces(): void {
    localStorage.removeItem('places');
  }

  /**
   * 
   * @param photoRef 
   */
  getPlacePhoto(photoRef: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/place-photo`, {photoRef})
      .map((response: Response) => {
        return response.json();
      })
  }

}
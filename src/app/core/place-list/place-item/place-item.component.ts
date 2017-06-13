import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LocationService } from './../../../services/location.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.css']
})
export class PlaceItemComponent implements OnInit {

  @Input() place: any;
  imagePlaceHolder = 'http://via.placeholder.com/150x150';
  stars = [];
  address: any;
  ratingSrc: string;

  constructor(
    private locationService: LocationService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.address = this.place.location.display_address.map(chunk => chunk + ' ').join('');
    this.makeStars();
  }

  makeStars() {
    let rating = this.place.rating;
    this.ratingSrc = 'assets/regular_0.png'; 
    // let i = 0;
    // while(i < rating) {
    //   if((rating - i) >= 1) this.stars.push('star');
    //   else this.stars.push('star-half-o');
    //   i++;
    // }
    if(rating === 5) this.ratingSrc = 'assets/regular_5.png';
    if(rating === 4) this.ratingSrc = 'assets/regular_4.png';
    if(rating === 3) this.ratingSrc = 'assets/regular_3.png';
    if(rating === 2) this.ratingSrc = 'assets/regular_2.png';
    if(rating === 1) this.ratingSrc = 'assets/regular_1.png';
    if(rating < 5 && rating > 4) this.ratingSrc = '/assets/regular_4_half.png';
    if(rating < 4 && rating > 3) this.ratingSrc = '/assets/regular_3_half.png';
    if(rating < 3 && rating > 2) this.ratingSrc = '/assets/regular_2_half.png';
    if(rating < 2 && rating > 1) this.ratingSrc = '/assets/regular_1_half.png';
  }

  onGo() {
    let userId = this.authService.getUserIdFromStorage();
    let placeId = this.place.id;
    this.authService.isAuthenticated()
      .subscribe(
        (authenticated) => {
          if(!authenticated) this.router.navigate(['login']);
          else {
            this.locationService.update(userId, placeId)
              .subscribe(
                (response: {going: number}) => {
                  this.place.going = response.going;
                  this.locationService.updateLocalStorage(this.place.id, this.place.going)
                }
              )
          }
        }
      )
  }
}

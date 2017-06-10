import { LocationService } from './../../../services/location.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.css']
})
export class PlaceItemComponent implements OnInit {

  @Input() place: any;
  photoUrl = 'http://via.placeholder.com/150x150';
  stars = [];
  openStatus: string;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    if(this.place && this.place['photos']) {
      let photoReference = this.place.photos[0].photo_reference;
      this.photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=5000&maxwidth=5000&photoreference=${photoReference}&key=AIzaSyDiIapoZr7abGJRKsih4agnN7ks8xoC0cQ`;
    } 
    if(this.place && this.place['rating']) this.makeStars();
    if(this.place && this.place.opening_hours) {
      this.openStatus = this.place.opening_hours.open_now ? 'Open' : 'Close';
    } else {
      this.openStatus = 'Can\'t tell if it\'s open or close.';
    }
    console.log(this.place);
  }

  makeStars() {
    let rating = this.place.rating;
    let i = 0;
    while(i < rating) {
      if((rating - i) >= 1) this.stars.push('star');
      else this.stars.push('star-half-o');
      i++;
    }
  }
}

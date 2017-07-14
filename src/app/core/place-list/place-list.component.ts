import { 
  Component, 
  OnInit } from '@angular/core';

import { 
  ActivatedRoute, 
  Data } from '@angular/router';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  places: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.places = data['places'];
      }
    )
  }

}

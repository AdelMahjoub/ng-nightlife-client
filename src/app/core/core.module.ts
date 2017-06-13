import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiEndPointService } from './../services/api-endpoint.service';
import { DistancePipe } from './../utils/distance.pipe';
import { AppRoutingModule } from './../app-routing/app-routing.module';
import { LocationService } from './../services/location.service';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceItemComponent } from './place-list/place-item/place-item.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    HomeComponent, 
    PlaceListComponent, 
    PlaceItemComponent, 
    HeaderComponent,
    DistancePipe,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AppRoutingModule
  ],
  providers: [
    LocationService,
    ApiEndPointService
  ]
})
export class CoreModule { }

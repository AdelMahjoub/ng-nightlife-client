import { AppRoutingModule } from './../app-routing/app-routing.module';
import { LocationService } from './../services/location.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceItemComponent } from './place-list/place-item/place-item.component';
import { HeaderComponent } from './header/header.component';

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
    HeaderComponent
  ],
  exports: [
    HeaderComponent,
    AppRoutingModule
  ],
  providers: [
    LocationService
  ]
})
export class CoreModule { }

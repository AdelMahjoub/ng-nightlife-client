import { AppRoutingModule } from './../app-routing/app-routing.module';
import { AuthService } from 'app/services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    SignupComponent, 
    LoginComponent
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule { }

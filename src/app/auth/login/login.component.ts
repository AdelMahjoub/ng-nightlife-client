import { 
  Component, 
  OnInit } from '@angular/core';

import { 
  AbstractControl, 
  FormGroup, 
  FormControl, 
  Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { 
  trigger, 
  style, 
  transition, 
  animate } from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideUp', [
      style({
        opacity: 1,
        transfrom: 'translateY(0)'
      }),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(200px)'
        }),
        animate(300)
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  serverValidationErrors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  get email(): AbstractControl {
    if(this.loginForm) return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    if(this.loginForm) return this.loginForm.get('password');
  }

  onLogin(): void {
    if(this.loginForm.valid) {
      this.clearServerValidationErrors();
      let email = this.email.value;
      let password = this.password.value;
      this.authService.loginUser(email, password)
        .subscribe(
          (validation: {errors?: string[],token?: string, userId?: string}) => {
            if(validation.errors) {
              return this.setServerValidationErrors(validation.errors);
            } else {
              this.authService.storeToken(validation.token);
              this.authService.storeUserId(validation.userId);
              this.authService.userLogin.next();
              this.router.navigate(['places']);
            }
          }
        )
    }
  }

  onReset(): void {
    this.clearServerValidationErrors();
    this.loginForm.reset();
  }

  clearServerValidationErrors(): void {
    this.serverValidationErrors = [];
  }

  setServerValidationErrors(errors: string[]): void {
    this.serverValidationErrors = errors;
  }

}

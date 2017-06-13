import { 
  Component, 
  OnInit } from '@angular/core';

import { 
  FormGroup, 
  FormControl, 
  Validators, 
  AbstractControl } from "@angular/forms";

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { 
  trigger, 
  style, 
  transition, 
  animate } from "@angular/animations";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  serverValidationErrors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.minLength(6), Validators.required]),
      'passwordConfirm': new FormControl(null, [Validators.minLength(6), Validators.required], this.passwordsMatch.bind(this))
    });
  }

  get email(): AbstractControl {
    if(this.signupForm) {
      return this.signupForm.get('email');
    }
  }

  get password(): AbstractControl {
    if(this.signupForm) {
      return this.signupForm.get('password');
    }
  }

  get confirmPassword(): AbstractControl {
    if(this.signupForm) {
      return this.signupForm.get('passwordConfirm');
    }
  }

  passwordsMatch(ctrl: FormControl): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      if(ctrl.value !== this.password.value) {
        resolve({'passwordMismatch': true})
      } else {
        resolve(null)
      }
    });
    return promise;
  }

  onRegister():void {
    if(this.signupForm.valid) {
      this.emptyServerValidationErrors();
      let email = this.email.value;
      let password = this.password.value;
      this.authService.signupUser(email, password)
        .subscribe(
          (validation: {errors: string[]}) => {
            if(validation.errors.length > 0) {
              return this.serverValidationErrors = validation.errors;
            } else {
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
        )
    }
  }

  onReset(): void {
    this.emptyServerValidationErrors();
    this.signupForm.reset();
  }

  emptyServerValidationErrors(): void {
    this.serverValidationErrors = [];
  }

  setServerValidationErrors(errors: string[]) {
    this.serverValidationErrors = errors;
  }

}

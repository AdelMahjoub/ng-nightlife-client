import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(
        (authenticated) => {
          this.isAuthenticated = authenticated;
        }
      )
    this.authService.userLogin
      .subscribe(
        () => {
          this.isAuthenticated = true;
        }
      )
    this.authService.userLogout
      .subscribe(
        () => {
          this.isAuthenticated = false;
        }
      )

  }

  onLogout(): void {
    this.authService.clearStorage();
  }

}

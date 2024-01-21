import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../styles.css', './navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  isAdmin: boolean;
  showRegister: boolean;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        if (this.settingsService.isAdmin(auth.uid)) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isAdmin = false;
        this.isLoggedIn = false;
        this.loggedInUser = '';
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick() {
    this.authService.logout();
    confirm("You are now logged out");
    this.router.navigate(['/login']);
  }
}
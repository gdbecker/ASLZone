import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root',
})

export class AuthAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private settingsService: SettingsService
  ) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.user.pipe(
      map((user) => {
        if (this.settingsService.isAdmin(user.uid)) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }),
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../styles.css', './login.component.css']
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        confirm("You are now logged in!");
        this.router.navigate(['/']);
      })
      .catch(err => {
        alert(`Error: ${err.message}`);
      });

  }
}

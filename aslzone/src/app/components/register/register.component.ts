import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then(res => {
        confirm('You are now registered and logged in!');
        this.router.navigate(['/']);
      })
      .catch(err => {
        alert(`Error: ${err.message}`);
      });
  }
}


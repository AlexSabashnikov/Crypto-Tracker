import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService, User } from './../service/auth.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
    onSubmit(form: NgForm) {
      if (form.valid) {
        const newUser: User = {
          id: 0, 
          email: this.email,
          password: this.password,
          name: this.username
        };
  
        this.authService.register(newUser).subscribe(user => {
          console.log('Пользователь зарегистрирован:', user);
          this.navigateToLogin();
        });
      }
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService, User } from './../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  username: string | null = "";
  
  constructor(private authService: AuthService, private router: Router) {}
    onSubmit(form: NgForm) {
      if (form.valid) {
        this.authService.login(this.email, this.password).subscribe(user => {
          if (user) {
            console.log('Успешный вход:', user);
            this.authService.setUsername(user.name);
            this.router.navigate(['/coin-list'])
          } else {
            this.errorMessage = 'Неверный email или пароль';
          }
        }, error => {
            this.errorMessage = 'Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.';
        });
      }
    }
}

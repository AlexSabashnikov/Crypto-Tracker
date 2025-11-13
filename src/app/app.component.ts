import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userName: string | null = null;
  currentDate: Date = new Date();

  constructor(private authService: AuthService) {}

  selectedCurrency : string = "USD";

  ngOnInit(): void {
    this.authService.getUsername().subscribe(username => {
      this.userName = username;
    });
    window.addEventListener('beforeunload', this.clearLocalStorage);
  }

  ngOnDestroy() {
    // Удаляем обработчик события, когда компонент уничтожается
    window.removeEventListener('beforeunload', this.clearLocalStorage);
  }

  private clearLocalStorage() {
    localStorage.clear(); // Очищаем localStorage
  }
}

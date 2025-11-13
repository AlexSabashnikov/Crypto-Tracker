import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private usernameSubject: BehaviorSubject<string | null> = 
    new BehaviorSubject<string | null>(this.getUsernameFromLocalStorage());
    
    private apiUrl = 'http://localhost:3000/users';
    constructor(private http: HttpClient) {}
    
    // Получение всех пользователей
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    // Регистрация пользователя
    register(user: User): Observable<User> {
        return this.getUsers().pipe(
            switchMap(users => {
                const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1; 
                const newUser = { ...user, id: newId }; 
                return this.http.post<User>(this.apiUrl, newUser); // Сохранение нового пользователя в БД и возврат нового пользователя
            })
        );
    }

    // Авторизация пользователя
    login(email: string, password: string): Observable<User | null> {
        return this.getUsers().pipe(
            map(users => { const user = users.find(user => user.email === email && user.password === password) || null;
            if (user) {
                this.setUsername(user.name);
            }
            return user;
        })
        );
    }
    getUsername(): Observable<string | null> {
        return this.usernameSubject.asObservable();
    }

    setUsername(val: string | null){
        this.usernameSubject.next(val);
        this.saveUsernameToLocalStorage(val);
    }

    private saveUsernameToLocalStorage(username: string | null) {
        if (username) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }
    private getUsernameFromLocalStorage(): string | null {
        const username = localStorage.getItem('username');
        console.log('Retrieved username from localStorage:', username);
        return localStorage.getItem('username');
    }
}
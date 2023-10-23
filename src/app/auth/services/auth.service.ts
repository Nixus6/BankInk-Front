import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User, UserRegister, UserRegisterResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.BASE_URL;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //   //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }
  private setAuthentication(user: User, token: string): boolean {

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    localStorage.setItem('User', user.id);
    console.log({ user, token });

    return true;
  }
  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { username: email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))
      );
  }

  register(data: UserRegister) {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<UserRegisterResponse>(url, data);
  }
  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log("token:: ", token);
    if (token) {
      this._authStatus.set(AuthStatus.authenticated);
    } else {
      this._authStatus.set(AuthStatus.notAuthenticated);

    }
    return of(false);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);

  }
}

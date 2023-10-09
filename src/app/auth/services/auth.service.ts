import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.BASE_URL;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //   //! Al mundo exterior
  //   public currentUser = computed( () => this._currentUser() );
  //   public authStatus = computed( () => this._authStatus() );

  constructor() {
    // this.checkAuthStatus().subscribe();
  }
  login(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  //   private setAuthentication(user: User, token:string): boolean {

  //     this._currentUser.set( user );
  //     this._authStatus.set( AuthStatus.authenticated );
  //     localStorage.setItem('token', token);

  //     return true;
  //   }

}

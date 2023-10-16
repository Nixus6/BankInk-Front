import { Injectable, signal } from '@angular/core';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { CardRegister, CardResponse, Product } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Card } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  private productsUrl: string = environment.URL_PRODUCTS_PLATZIAPI;
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }
  private _currentCard = signal<Card[] | null>(null);
  public _refresh$ = new Subject<void>();

  // private setAuthentication(card: Card[]): boolean {
  //   this._currentCard.set(card);
  //   return true;
  // }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}?offset=0&limit=8`);
  }
  // getCardsByIdUser(): Observable<boolean> {
  //   return this.http.get<CardResponse>(`${this.baseUrl}/v1/tarjets/${localStorage.getItem('User')}`)
  //   .pipe(
  //     map(({ tarjet }) => this.setAuthentication(tarjet)),
  //     catchError(err => throwError(() => err.error.message))
  //   );
  // }
  // getCardsByIdUser(): Observable<Card[]> {
  //   return this.http.get<Card[]>(`${this.baseUrl}/v1/tarjets/${localStorage.getItem('User')}`)
  // .pipe(
  //   map(({ tarjet }) => this.setAuthentication(tarjet)),
  //   catchError(err => throwError(() => err.error.message))
  // );
  // }
  getCardsByIdUser(): Observable<CardResponse> {
    return this.http.get<CardResponse>(`${this.baseUrl}/v1/tarjets/${localStorage.getItem('User')}`)
    // .pipe(
    //   map(({ tarjet }) => this.setAuthentication(tarjet)),
    //   catchError(err => throwError(() => err.error.message))
    // );
  }
  addCard(card: CardRegister): Observable<CardRegister> {
    return this.http.post<CardRegister>(`${this.baseUrl}/v1/tarjets`, card)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }
}

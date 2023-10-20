import { EventEmitter, Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { Balance, CardRegister, CardResponse, Product } from '../interfaces';
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
  public _refresh$ = new Subject<void>();
  private _idBalance = new BehaviorSubject<number>(0);
  private _cantBasket = new BehaviorSubject<number>(0);
  public cartData = new EventEmitter<Product[] | []>();
  // private cantBasket = this._cantBasket.asObservable();
  productQuantity:number=0;
  public idCard: number = 0;

  get getIdCard(): Observable<number> {
    return this._idBalance.asObservable();
  }
  setIdCard(id: number): void {
    this._idBalance.next(id);
  }

  get getCantBasket(): Observable<number> {
    return this._cantBasket.asObservable();
  }
  setCantBasket(op: string): void {
    if (op === "plus") {
      this.productQuantity+=1;
      localStorage.setItem("cantProduct",JSON.stringify(this.productQuantity))
      this._cantBasket.next(this.productQuantity);
    }
    if (op === "min") {
      this.productQuantity-=1;
      localStorage.setItem("cantProduct",JSON.stringify(this.productQuantity))
      this._cantBasket.next(this.productQuantity);
    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}`);
  }

  getProductByTitle(name: String): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}?title=${name}`);
  }

  /*Card*/
  getCardsByIdUser(): Observable<CardResponse> {
    return this.http.get<CardResponse>(`${this.baseUrl}/v1/tarjets/${localStorage.getItem('User')}`)
  }
  addCard(card: CardRegister): Observable<CardRegister> {
    return this.http.post<CardRegister>(`${this.baseUrl}/v1/tarjets`, card)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  updateBalance(balance: Balance): Observable<Balance> {
    this.getIdCard.subscribe((id: number) => this.idCard = id);
    return this.http.put<Card>(`${this.baseUrl}/v1/tarjets/${this.idCard}`, balance)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  localAddCart(product: Product){
    let cartDataA = [];
    let localCart = localStorage.getItem('productBasket');
    if (!localCart) {
      localStorage.setItem("productBasket", JSON.stringify([product]));
      this.cartData.emit([product]);
    } else {
      cartDataA = JSON.parse(localCart);
      cartDataA.push(product);
      localStorage.setItem("productBasket", JSON.stringify(cartDataA));
      this.cartData.emit(cartDataA);
    }
  }
}

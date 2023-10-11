import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  private baseUrl: string = environment.URL_FAKESTOREAPI;
  constructor(private http: HttpClient) { }
  getHeroes(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?limit=8`);
  }
}

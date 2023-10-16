import { Component, inject } from '@angular/core';
import { Product } from '../../interfaces';
import { MarketplaceService } from '../../services/marketplace.service';
import { Subject, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css', '../../../app.component.css']
})
export class ProductsPageComponent {
  public searchTerm$: String = "";
  public products: Product[] = [];
  // public productObservable: Observable<Product[]>;
  public productQuantity: number = 0;
  // private filterSvc = inject(MarketplaceService);
  p: number = 1;

  constructor(
    private marketPlaceService: MarketplaceService
  ) {
  }

  ngOnInit(): void {
    this.marketPlaceService.getProducts()
      .subscribe(products => this.products = products);
  }
  addToCart() {
    if (localStorage.getItem("User")) {
      this.productQuantity += 1;
    }
  }
  getProductByTitle() {
    this.products=[];
    this.marketPlaceService.getProductByTitle(this.searchTerm$).subscribe(products => this.products = products);
    // this.productObservable = this.searchTerm$.pipe(
    //   switchMap((term: String) => this.filterSvc.getProductByTitle(term))
    // );
  }

  search(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    // this.searchTerm$.next(element.value);
    this.searchTerm$ = element.value;
    if (element.value === "") {
      this.marketPlaceService.getProducts()
        .subscribe(products => this.products = products);
    }

  }
}

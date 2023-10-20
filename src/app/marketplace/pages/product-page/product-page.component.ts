import { Component, EventEmitter, inject } from '@angular/core';
import { Product } from '../../interfaces';
import { MarketplaceService } from '../../services/marketplace.service';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css', '../../../app.component.css']
})
export class ProductsPageComponent {

  public searchTerm$: String = "";
  public products: Product[] = [];
  public productQuantity: number = 0;
  p: number = 1;

  constructor(
    private marketPlaceService: MarketplaceService
  ) {
  }

  ngOnInit(): void {
    this.marketPlaceService.getProducts()
      .subscribe(products => this.products = products);
  }

  addToCart(product: Product) {
    this.marketPlaceService.localAddCart(product);
  }

  getProductByTitle() {
    this.products = [];
    this.marketPlaceService.getProductByTitle(this.searchTerm$).subscribe(products => this.products = products);
  }

  search(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.searchTerm$ = element.value;
    if (element.value === "") {
      this.marketPlaceService.getProducts()
        .subscribe(products => this.products = products);
    }
  }

}

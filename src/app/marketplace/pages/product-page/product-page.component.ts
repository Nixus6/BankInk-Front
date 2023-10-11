import { Component } from '@angular/core';
import { Product } from '../../interfaces';
import { MarketplaceService } from '../../services/marketplace.service';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css', '../../../app.component.css']
})
export class ProductsPageComponent {
  public products: Product[] = [];
  public productQuantity: number = 0;
  constructor(private marketPlaceService: MarketplaceService) { }

  ngOnInit(): void {
    this.marketPlaceService.getHeroes()
      .subscribe(products => this.products = products);
  }
  addToCart() {
    if (localStorage.getItem("User")) {
      this.productQuantity += 1;
    }
  }
}

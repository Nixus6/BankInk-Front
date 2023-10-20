import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthStatus } from '../../../../auth/interfaces';
import { MarketplaceService } from 'src/app/marketplace/services/marketplace.service';
import { ProductsPageComponent } from 'src/app/marketplace/pages/product-page/product-page.component';
@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../../app.component.css']
})
export class HeaderComponent {
  public authService = inject(AuthService);
  public AuthStatus = AuthStatus;
  public cantBasket: number = 0;
  constructor(
    private marketPlaceService: MarketplaceService
  ) {
    // this.cantBasket = localStorage.getItem("cantProduct");
    // this.marketPlaceService.getCantBasket.subscribe((cant: number) => this.cantBasket = cant)
  }
  ngOnInit(): void {
    let cartData = localStorage.getItem('productBasket');
    if (cartData) {
      this.cantBasket = JSON.parse(cartData).length
    }
    this.marketPlaceService.cartData.subscribe((items)=>{
      this.cantBasket= items.length
    })
  }
  onLogout() {
    this.authService.logout();
  }
}

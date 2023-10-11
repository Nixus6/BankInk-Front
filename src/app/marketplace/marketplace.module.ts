import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceLayoutComponent } from './layouts/marketplace-layout/marketplace-layout.component';
import { ProductsPageComponent } from './pages/product-page/product-page.component';
import { CardProductComponent } from './components/card/card-product/card-product.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { CardPageComponent } from './pages/card-page/card-page.component';


@NgModule({
  declarations: [
    MarketplaceLayoutComponent,
    ProductsPageComponent,
    CardProductComponent,
    BasketPageComponent,
    CardPageComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule
  ]
})
export class MarketplaceModule { }

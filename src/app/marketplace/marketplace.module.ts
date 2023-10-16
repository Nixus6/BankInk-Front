import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceLayoutComponent } from './layouts/marketplace-layout/marketplace-layout.component';
import { ProductsPageComponent } from './pages/product-page/product-page.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    MarketplaceLayoutComponent,
    ProductsPageComponent,
    ModalComponent,
    BasketPageComponent,
    CardPageComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class MarketplaceModule { }

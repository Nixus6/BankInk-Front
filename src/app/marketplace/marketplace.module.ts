import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceLayoutComponent } from './layouts/marketplace-layout/marketplace-layout.component';


@NgModule({
  declarations: [
    MarketplaceLayoutComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule
  ]
})
export class MarketplaceModule { }

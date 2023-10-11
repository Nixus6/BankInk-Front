import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { HeaderComponent } from './components/header/header/header.component';
import { MarketplaceRoutingModule } from '../marketplace/marketplace-routing.module';



@NgModule({
  declarations: [
    LazyImageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule
  ],
  exports: [
    LazyImageComponent,
    HeaderComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceLayoutComponent } from './layouts/marketplace-layout/marketplace-layout.component';
import { ProductsPageComponent } from './pages/product-page/product-page.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { TransactionPageComponent } from './pages/transaction-page/transaction-page.component';

const routes: Routes = [{
  path: '',
  component: MarketplaceLayoutComponent,
  children: [
    { path: 'products', component: ProductsPageComponent },
    { path: 'basket', component: BasketPageComponent },
    { path: 'cards', component: CardPageComponent },
    { path: 'transactions', component: TransactionPageComponent },
    { path: '**', redirectTo: 'products' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceRoutingModule { }

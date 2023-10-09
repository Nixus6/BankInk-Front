import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceLayoutComponent } from './layouts/marketplace-layout/marketplace-layout.component';

const routes: Routes = [{
  path: '',
  component: MarketplaceLayoutComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }

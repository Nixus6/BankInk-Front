import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard, isAutheticatedGuard } from './auth/guards';

const routes: Routes = [
  {
    path:'auth',
    canActivate:[isNotAuthenticatedGuard],
    loadChildren: () => import ('./auth/auth.module').then(m =>m.AuthModule),
  },
  {
    canActivate: [ isAutheticatedGuard ],
    path:'marketplace',
    loadChildren: () => import ('./marketplace/marketplace.module').then(m =>m.MarketplaceModule),
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

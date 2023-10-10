import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  templateUrl: './marketplace-layout.component.html',
  styleUrls: ['./marketplace-layout.component.css', '../../../app.component.css']
})
export class MarketplaceLayoutComponent {
  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

}

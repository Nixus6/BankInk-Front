import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthStatus } from '../../../../auth/interfaces';
@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../../app.component.css']
})
export class HeaderComponent {
  public authService = inject( AuthService );
  public AuthStatus = AuthStatus;
  onLogout() {
    this.authService.logout();
  }
}

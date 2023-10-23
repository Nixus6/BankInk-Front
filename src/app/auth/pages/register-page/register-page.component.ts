import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css', '../login-page/login-page.component.css', '../../../app.component.css']
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    lastname: ['', [Validators.required]],
    firstname: ['', [Validators.required]]
  });

  constructor(
    private router: Router
  ) {
  }

  get currentUser(): UserRegister {
    const user = this.myForm.value as UserRegister;
    return user;
  }

  register() {
    this.authService.register(this.currentUser).subscribe(
      res => {
        if (res.token != "" && res.token != null) {
          this.router.navigate(['/auth/login'])
        }
      }

    )
  }
}

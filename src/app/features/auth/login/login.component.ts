import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginApiService } from '../../../core/services/login-api.service';
import { Router } from '@angular/router';
import { NotificationHandlerService } from '../../../core/services/notification-handler.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb: FormBuilder= inject(FormBuilder);
  private router: Router = inject(Router);
  private notificationHandlerService: NotificationHandlerService = inject(NotificationHandlerService);
  private loginApiService: LoginApiService = inject(LoginApiService);

  protected loginForm: FormGroup = this.fb.group({
    userEmail: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor() {}

  public onSubmit(): void {

    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.loginApiService.login(loginData).subscribe({
        next: (token) => {
          this.notificationHandlerService.handleHttpSuccess('Usuário logado com sucesso!.');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.notificationHandlerService.handleHttpError(error);
        }
      });
    }
  }
}

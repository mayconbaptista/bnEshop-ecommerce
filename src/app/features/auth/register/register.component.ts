import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { LoginApiService } from '../../../core/services/login-api.service';
import { Router } from '@angular/router';
import { NotificationHandlerService } from '../../../core/services/notification-handler.service';

@Component({
  selector: 'app-register',
  imports: [    
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {

  constructor() {}

  private fb: FormBuilder= inject(FormBuilder);
  private loginApiService: LoginApiService = inject(LoginApiService);
  private router: Router = inject(Router);
  private notificationHandlerService: NotificationHandlerService = inject(NotificationHandlerService);

  protected registerForm: FormGroup = this.fb.group({
    userName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phoneNumber: [null, [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    confirmPassword: [null, Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  });

  public onSubmit(): void {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      this.loginApiService.register(registerData).subscribe({
        next: (token) => {
          this.notificationHandlerService.handleHttpSuccess('Usuário registrado com sucesso!.');
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.notificationHandlerService.handleHttpError(error);
        }
      });
    }
  }

  protected senhasDiferentes(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }
}

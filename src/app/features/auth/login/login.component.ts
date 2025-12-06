import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginApiService } from '../../../core/services/login-api.service';
import { Router } from '@angular/router';

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
  private loginApiService: LoginApiService = inject(LoginApiService);

  protected loginForm: FormGroup = this.fb.group({
    userEmail: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor() {}

  public async onSubmit(): Promise<void> {

    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      await this.loginApiService.login(loginData).subscribe({
        next: (token) => {
          console.log('Login successful', token);

          this.router.navigate(['/']);
        },
        error: (error) => {
          window.alert('Login failed. Please try again.' + error);
        }
      });
    }
  }
}

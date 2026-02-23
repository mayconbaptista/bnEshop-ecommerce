import { Component, input, InputSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepContent, MatStepLabel } from '@angular/material/stepper';

export interface BillingAddressForm{
  nome: FormControl<string | null>;
  cep: FormControl<string | null>;
  rua: FormControl<string | null>;
  bairro: FormControl<string | null>;
  cidade: FormControl<string | null>;
  estado: FormControl<string | null>;
}

@Component({
  selector: 'app-billing-address',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './billing-address.component.html',
  styleUrl: './billing-address.component.css'
})
export class BillingAddressComponent {
  
  public _billingAddressForm: InputSignal<FormGroup<BillingAddressForm>> = input.required<FormGroup<BillingAddressForm>>();

  constructor(){}
}

import { Component, input, InputSignal, Signal } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatStepContent, MatStepLabel } from "@angular/material/stepper";

export interface ShippingAddresFrom{
  nome: FormControl<string | null>;
  cep: FormControl<string | null>;
  rua: FormControl<string | null>;
  bairro: FormControl<string | null>;
  cidade: FormControl<string | null>;
  estado: FormControl<string | null>;
  email?: FormControl<string | null>;
  telefone?: FormControl<string | null>;
}

@Component({
  selector: 'app-shipping-address',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepContent,
    MatStepLabel
],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.css'
})
export class ShippingAddressComponent {

  public _formShippingAddress: InputSignal<FormGroup<ShippingAddresFrom>> = input.required<FormGroup<ShippingAddresFrom>>();
}

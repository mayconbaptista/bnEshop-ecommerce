import { Component, input, InputSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

export interface PaymentForm{
  type: FormControl<string | null>;
  cardNumber: FormControl<string | null>;
  cardHolderName: FormControl<string | null>;
  cardDateValidity: FormControl<Date | null>;
  cardCvv: FormControl<string | null>;
}

@Component({
  selector: 'app-payment',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  public _paymentForm: InputSignal<FormGroup<PaymentForm>> = input.required<FormGroup<PaymentForm>>();
}

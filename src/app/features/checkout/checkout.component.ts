import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { ShippingAddressComponent, ShippingAddresFrom } from './shipping-address/shipping-address.component';
import { BillingAddressForm, BillingAddressComponent } from './billing-address/billing-address.component';
import { PaymentComponent, PaymentForm } from "./payment/payment.component";

export interface CheckoutForm{
  enderecoEntrega: FormGroup<ShippingAddresFrom>;
  enderecoCobranca: FormGroup<BillingAddressForm>;
  pagamento: FormGroup<PaymentForm>;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ShippingAddressComponent,
    BillingAddressComponent,
    PaymentComponent
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit {

  private _formBuilder = inject(FormBuilder);
  public _form!:FormGroup;

  public get getShippingAddressGroup():FormGroup<ShippingAddresFrom>{
    return this._form.get('enderecoEntrega') as FormGroup<ShippingAddresFrom>;
  }

  public get getBillingAddresGroup():FormGroup<BillingAddressForm>{
    return this._form.get('enderecoCobranca') as FormGroup<BillingAddressForm>;
  }

  public get getPaymentFormGroup():FormGroup<PaymentForm>{
    return this._form.get('pagamento') as FormGroup<PaymentForm>;
  }
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm():void{
    this._form = this._formBuilder.group<CheckoutForm>({
      enderecoEntrega: this._formBuilder.group<ShippingAddresFrom>({
        nome: new FormControl<string | null>(null, [Validators.required]),
        cep: new FormControl<string | null>(null, [Validators.required, Validators.pattern("[0-9]{5}\d-[0-9]{3}\d")]),
        rua: new FormControl<string | null>(null, [Validators.required]),
        bairro: new FormControl<string | null>(null, [Validators.required]),
        cidade: new FormControl<string | null>(null, [Validators.required]),
        estado: new FormControl<string | null>(null, [Validators.required]),
        email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        telefone: new FormControl<string | null>(null, [Validators.required])
      }),
      enderecoCobranca: this._formBuilder.group<BillingAddressForm>({
        nome: new FormControl<string | null>(null, [Validators.required]),
        cep: new FormControl<string | null>(null, [Validators.required, Validators.pattern("[0-9]{5}\d-[0-9]{3}\d")]),
        rua: new FormControl<string | null>(null, [Validators.required]),
        bairro: new FormControl<string | null>(null, [Validators.required]),
        cidade: new FormControl<string | null>(null, [Validators.required]),
        estado: new FormControl<string | null>(null, [Validators.required])
      }),
      pagamento: this._formBuilder.group<PaymentForm>({
        type: new FormControl<string | null>(null, [Validators.required]),
        cardNumber: new FormControl<string | null>(null, [Validators.required]),
        cardHolderName: new FormControl<string | null>(null, [Validators.required]),
        cardDateValidity: new FormControl<Date | null>(null, [Validators.required]),
        cardCvv: new FormControl<string | null>(null, [Validators.required])
      })
    })
  }
}

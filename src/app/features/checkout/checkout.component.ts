import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';

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
    ShippingAddressComponent
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit {

  private _formBuilder = inject(FormBuilder);
  protected _form!:FormGroup;

  public getShippingAddressGroup():FormGroup{
    return this._form.get('enderecoEntrega') as FormGroup;
  }
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm():void{
    this._form = this._formBuilder.group({
      enderecoEntrega: this._formBuilder.group({
        nome: [null, [Validators.required]],
        cep: [null, [Validators.required, Validators.pattern("[0-9]{5}\d-[0-9]{3}\d")]],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        telefone: [null, [Validators.required]]
      }),
      enderecoCobranca: this._formBuilder.group({
        nome: [null, [Validators.required]],
        cep: [null, [Validators.required, Validators.pattern("[0-9]{5}\d-[0-9]{3}\d")]],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
      })
    })
  }
}

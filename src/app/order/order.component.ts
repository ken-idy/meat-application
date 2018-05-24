import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';

import { OrderService } from './order.service';
import { RadioOption } from './../shared/radio/radio-option.model';
import { Component, OnInit } from '@angular/core';
import { Order, OrderItem} from './order.model'
import { Router } from '@angular/router';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  numberPattern = /^[0-9]*$/;

  orderForm: FormGroup;

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
   {label: 'Dinheiro', value: 'MON'},
   {label: 'Cartao de debito', value: 'DEB'},
   {label: 'Cartao Refeicao', value: 'REF'},

  ]
  constructor(private orderService: OrderService,
              private router: Router,
              private FormBuilder: FormBuilder) { }

  ngOnInit() {

    this.orderForm = this.FormBuilder.group({
     name: this.FormBuilder.control('', [Validators.required, Validators.minLength(5)]),
     email: this.FormBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
     emailConfirmation: this.FormBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
     address: this.FormBuilder.control('',[Validators.required, Validators.minLength(5)]),
     number: this.FormBuilder.control('',[Validators.required, Validators.pattern(this.numberPattern)]),
     optionalAddress: this.FormBuilder.control(''),
     paymentOption: this.FormBuilder.control('', [Validators.required])


    }, {validator: OrderComponent.equalsTo});
  }
    static equalsTo(group: AbstractControl): {[key:string]: boolean} {

     const email =  group.get('email')
     const emailConfirmation = group.get('emailConfirmation')
     if (!email || !emailConfirmation){

      return undefined
     }

      if (email.value !== emailConfirmation.value) {
        return {emailsNotMatch: true}
      }
      return undefined
  }

   itemsValue(): number {
   
    return this.orderService.itemsValue();
   }

  cartItems(): CartItem[] {

    return this.orderService.cartItems();
  }
  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);


  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);


  }

  remove(item: CartItem) {
   this.orderService.remove(item);

  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
       .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
       this.orderService.checkOrder(order)
       .subscribe( (orderId: string ) => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear();

       })
    console.log(order);
  }

}

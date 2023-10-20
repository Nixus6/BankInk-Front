import { Component } from '@angular/core';
import { Product } from '../../interfaces';

@Component({
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.css', '../../../app.component.css']
})
export class BasketPageComponent {
  cartData: Product[] | undefined;
  itemPrice: number = 0;
  ngOnInit() {
    let cartData = localStorage.getItem('productBasket');
    if (cartData) {
      this.cartData = JSON.parse(cartData)
      this.cartData?.forEach((item) => {
        this.itemPrice = this.itemPrice + item.price
      })
    }
    // if (!this.cartData.length) {
    //   this.router.navigate(['/'])
    // }
  }
}

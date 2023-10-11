import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/marketplace/interfaces';

@Component({
  selector: 'products-product-card',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css','../../../pages/product-page/product-page.component.css']
})
export class CardProductComponent implements OnInit{
  @Input()
  public product!: Product;


  ngOnInit(): void {
    if ( !this.product ) throw Error('Product property is required');
  }
}

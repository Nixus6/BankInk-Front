import { Component, computed, inject } from '@angular/core';
import { CardValidate, Product } from '../../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketplaceService } from '../../services/marketplace.service';
import { CardValidateResponse, TransactionRequest, TransactionResponse } from '../../interfaces/card-validate';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.css', '../../../app.component.css']
})
export class BasketPageComponent {
  private fb = inject(FormBuilder);
  cartData: Product[] | undefined;
  transactionData: TransactionRequest = {
    totalPrice: 0,
    idProduct: 0,
    user_id: {
      id: null
    },
    tarjet_id: {
      id: null
    }
  };
  payState: boolean = false;
  itemPrice: number = 0;

  public cardForm: FormGroup = this.fb.group({
    name: ['nicolas moreno', [Validators.required, Validators.pattern('^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$')]],
    idProducto: ['2023101128324920', [Validators.required]],
    expiryDate: ['10/2026', [Validators.required]],
  });

  constructor(
    private marketPlaceService: MarketplaceService,private router: Router
  ) {
  }

  get currentCard(): CardValidate {
    const card = this.cardForm.value as CardValidate;
    return card;
  }

  ngOnInit() {
    let cartData = localStorage.getItem('productBasket');
    if (cartData) {
      this.cartData = JSON.parse(cartData)
      this.cartData?.forEach((item) => {
        this.itemPrice = this.itemPrice + item.price
      })
    }
  }

  public pay = computed<boolean>(() => {
    return this.payState = true;
  });

  onSubmit() {
    this.marketPlaceService.validateCard(this.currentCard).subscribe(
      (res: CardValidateResponse) => {
        this.transactionData.totalPrice = this.itemPrice;
        this.transactionData.tarjet_id.id = JSON.parse(res.resValid.tarjetId);
        this.transactionData.user_id.id = JSON.parse(res.resValid.userId);
        this.transactionData.idProduct = this.currentCard.idProducto;
        if (res.resValid.codigo==="00"&&res.resRequest.request==="OK") {
          this.marketPlaceService.setTransaction(this.transactionData).subscribe(
            (tran: TransactionResponse) => {
              if (tran.metadata.codigo === "01") {
                Swal.fire('Error', tran.metadata.message, 'error')
              }
              if (tran.metadata.codigo === "00" && tran.status === "OK") {
                localStorage.removeItem('productBasket');
                this.marketPlaceService.restartCart();
                this.router.navigate(['/marketplace/transactions'])
              }
            }
          );
          //transaction.tarjet_id=res.resValid.tarjetId
        }else{
          Swal.fire('Error', res.resValid.message, 'error')
        }
      }
    )
  }
}

import { Component, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketplaceService } from '../../services/marketplace.service';
import { Balance, CardRegister } from '../../interfaces';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { IdUser, Balance } from '../../interfaces/card-register.interface';

@Component({
  selector: 'marketplace-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css', '../../../app.component.css']
})
export class ModalComponent {
  private fb = inject(FormBuilder);
  private fbB = inject(FormBuilder);
  public idCard: number = 0;
  //balanceUpd = new FormControl();

  public cardForm: FormGroup = this.fb.group({
    typeTarjet: ['', [Validators.required]],
    user: new FormControl<object>({ id: localStorage.getItem("User") })
  });

  public cardFormUpd: FormGroup = this.fbB.group({
    saldo: ['', [Validators.required
      // , Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
    ]]
  });
  // public cardForm = new FormGroup({
  //   typeTarjet: new FormControl<string>(''),
  //   user: new FormControl<object>({ id: localStorage.getItem("User") }),
  // });
  constructor(
    private marketPlaceService: MarketplaceService,
    private router: Router,
  ) { this.marketPlaceService.getIdCard.subscribe((id: number) => this.idCard = id) }

  get currentCard(): CardRegister {
    const card = this.cardForm.value as CardRegister;
    return card;
  }

  get currentBalance(): Balance {
    const cardBalance = this.cardFormUpd.value as Balance;
    return cardBalance;
  }

  onSubmit(): void {
    this.marketPlaceService.addCard(this.currentCard)
      .subscribe(card => {
        console.log("currentCard::: ", card)
        this.marketPlaceService.getCardsByIdUser()
      });

  }

  upBalance(): void {
    console.log("cardFormUpd", this.currentBalance);
    this.closeModal();
    this.marketPlaceService.updateBalance(this.currentBalance)
      .subscribe(() => {
        this.cardFormUpd.reset();
        this.marketPlaceService.getCardsByIdUser()
      });
  }

  closeModal() {
    setTimeout(() => {
      this.marketPlaceService.setIdCard(0);
    }, 500);
  }

}

import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MarketplaceService } from '../../services/marketplace.service';
import { CardRegister } from '../../interfaces';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { IdUser } from '../../interfaces/card-register.interface';

@Component({
  selector: 'marketplace-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css', '../../../app.component.css']
})
export class ModalComponent {

  public cardForm = new FormGroup({
    typeTarjet: new FormControl<string>(''),
    user: new FormControl<object>({ id: localStorage.getItem("User") }),
  });
  constructor(
    private marketPlaceService: MarketplaceService,
    private router: Router,
  ) {}
  get currentCard(): CardRegister {
    const card = this.cardForm.value as CardRegister;
    return card;
  }
  onSubmit(): void {
    this.marketPlaceService.addCard(this.currentCard)
      .subscribe(card => {
        console.log("currentCard::: ", card)
        this.marketPlaceService.getCardsByIdUser()
        // TODO: mostrar snackbar, y navegar a /heroes/edit/ hero.id
        //this.router.navigate(['/marketplace/basket' ]);
        // this.showSnackbar(`${ hero.superhero } created!`);
      });

  }

}

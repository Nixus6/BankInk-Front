import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Card, CardResponse, Titular } from '../../interfaces';
import { MarketplaceService } from '../../services/marketplace.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css', '../../../app.component.css']
})
export class CardPageComponent implements OnInit, OnDestroy {

  suscription: Subscription;
  public cards: Card[] = [];
  constructor(
    private marketPlaceService: MarketplaceService,
  ) { this.suscription = Subscription.EMPTY; }

  //TODO: Numero separados de a 4
  ngOnInit(): void {
    this.suscription = this.marketPlaceService._refresh$.subscribe(() => {
      this.marketPlaceService.getCardsByIdUser()
        .subscribe(({ tarjet }) => { this.cards = tarjet })
        ;
    })
    this.marketPlaceService.getCardsByIdUser()
      .subscribe(({ tarjet }) => { this.cards = tarjet })
      ;
  }
  //Esto se hace para evitar fugas de memoria. Si cambiamos de pagina el obsevable simpre va a estar al pendiente
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log("Observable cerrado");

  }

  updateBalance(id: number) {

    this.marketPlaceService.setIdCard(id);

  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card, CardResponse, Titular } from '../../interfaces';
import { MarketplaceService } from '../../services/marketplace.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css', '../../../app.component.css']
})
export class CardPageComponent implements OnInit, OnDestroy {
  suscription:Subscription;
  public cards: Card[] = [];
  constructor(
    private marketPlaceService: MarketplaceService,
  ) {this.suscription = Subscription.EMPTY; }

  //TODO: Numero separados de a 4 y camio de color segun el tipo de carta y cupo
  ngOnInit(): void {
     this.suscription=this.marketPlaceService._refresh$.subscribe(()=>{
      this.marketPlaceService.getCardsByIdUser()
      .subscribe( ({tarjet}) =>{ this.cards = tarjet})
      ;
    })
    this.marketPlaceService.getCardsByIdUser()
    .subscribe( ({tarjet}) =>{ this.cards = tarjet})
    ;
    //.subscribe( heroes => this.cards = heroes );
    /*.pipe(
      // switchMap( ({ tarjet }) => this.marketPlaceService.getCardsByIdUser( )),
      map(( tarjet ) => this.cards = tarjet),
      catchError(err => throwError(() => err.error.message))
    )
    .subscribe(tarjet => {
      console.log("cards2:: ", tarjet);
    });*/
  }
  //Esto se hace para evitar fugas de memoria. Si cambiamos de pagina el obsevable simpre va a estar al pendiente
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log("Observable cerrado");

  }

  addCart(){

    // Swal.fire({
    //   title: 'Select the type of card you want to create',
    //   html:
    //   '<select class="color-select"> ' +
    //   '<option value="0">Select car:</option> ' +
    //   '</select>',
    //   inputAttributes: {
    //     autocapitalize: 'off'
    //   },
    //   showCancelButton: true,
    //   confirmButtonText: 'Create',
    //   showLoaderOnConfirm: true,
    //   preConfirm: (login) => {
    //     console.log("nuevo saldo ", login)
    //   },
    //   allowOutsideClick: () => !Swal.isLoading()
    // })
  }
}

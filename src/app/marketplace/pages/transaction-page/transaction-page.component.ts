import { Component } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { Transaction } from '../../interfaces';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css', '../../../app.component.css']
})
export class TransactionPageComponent {
  suscription: Subscription;
  public transactions: Transaction[] = [];
  constructor(
    private marketPlaceService: MarketplaceService,
  ) {
    this.suscription = this.marketPlaceService._refresh$.subscribe(() => {
      this.marketPlaceService.getTransactionsByIdUser().subscribe(
        ({ transactionData }) => { this.transactions = transactionData }
      )
    })

  }
  ngOnInit(): void {
    this.marketPlaceService.getTransactionsByIdUser().subscribe(
      ({ transactionData }) => { this.transactions = transactionData }
    )
  }

  validarFecha(fechaActual: Date) {
    let fechaValidar = new Date(fechaActual);
    let fechaHoy = new Date(Date.now());
    let unDiaPasado = 24 * 3600 * 1000;
    let fechaDiaPasado = fechaValidar.getTime() + unDiaPasado;
    if (fechaHoy.getTime() > fechaDiaPasado) {
      return false;
    } else {
      return true
    }
  }

  changeStateTransaction(idTransaction: number) {
    this.marketPlaceService.changeStateTransaction(idTransaction)
      .subscribe(
        res => console.log(res)
      );
  }
}

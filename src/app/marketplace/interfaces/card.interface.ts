import { Titular } from "./titular.interface";

export interface Card {
  id: number;
  idProducto: number;
  saldo: number;
  cupo: number;
  fechaVencimiento: Date;
  typeTarget: string;
  titular: Titular;
}

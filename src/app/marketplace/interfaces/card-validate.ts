export interface CardValidate {
  name: string,
  idProducto: number,
  expiryDate: string
}

export interface CardValidateResponse {
  resValid: {
    tipo: string,
    codigo: string,
    message: string,
    tarjetId: string,
    userId: string
  },
  resRequest: {
    request: string
  }
}

export interface TransactionRequest {
  totalPrice: number,
  idProduct: number,
  user_id: {
    id: number | null
  },
  tarjet_id: {
    id: number | null
  }
}

export interface TransactionResponse {
  status: string,
  metadata: {
    tipo: string,
    codigo: string,
    message: string
  }
}


export interface TransactionResponseGet {
  status: string,
  metadata: {
    tipo: string,
    codigo: string,
    message: string
  }
  transactionData: Transaction[]
}

export interface Transaction {
  id: number,
  fechaTransaccion: Date,
  totalPrice: number,
  state: string
  tarjet: {
    idProducto: number
  }
}

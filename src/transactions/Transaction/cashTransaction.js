import Transaction from './transaction'
import { CASH_TRANSACTION_TYPES } from '../enums'

class CashTransaction extends Transaction {
  constructor({
    assetManagerId,
    assetBookId,
    counterpartyBookId,
    transactionAction,
    assetId,
    quantity,
    transactionDate,
    settlementDate,
    transactionCurrency,
    settlementCurrency,
    asset,
    executionTime,
    transactionType,
    transactionId,
    transactionStatus,
    charges,
    codes,
    comments,
    links,
    parties,
    rates,
    references
  }) {
    if (CASH_TRANSACTION_TYPES.indexOf(transactionType) === -1) {
      throw new Error(`Invalid Cash Transaction Type: ${transactionType}`)
    }
    super({
      assetManagerId,
      assetBookId,
      counterpartyBookId,
      transactionAction,
      assetId,
      quantity,
      transactionDate,
      settlementDate,
      price: 1,
      transactionCurrency,
      settlementCurrency,
      asset,
      executionTime,
      transactionType,
      transactionId,
      transactionStatus,
      charges,
      codes,
      comments,
      links,
      parties,
      rates,
      references
    })
  }
}

export default CashTransaction

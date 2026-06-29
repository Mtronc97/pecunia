import { Transaction } from "../types/transaction.js";

let transactions: Transaction[] = [];

export function getAllTransactions(): Transaction[] {
  return transactions;
}

export function getTransactionById(id: string): Transaction | undefined {
  return transactions.find((transaction) => transaction.id === id);
}

export function addTransaction(transaction: Transaction): Transaction {
  transactions.push(transaction);
  return transaction;
}

export function deleteTransaction(id: string): boolean {
  const initialLength = transactions.length;
  transactions = transactions.filter((transaction) => transaction.id !== id);
  return transactions.length < initialLength;
}
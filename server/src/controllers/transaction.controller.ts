import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { Transaction } from "../types/transaction.js";
import * as transactionService from "../services/transaction.service.js";

export function getTransactions(req: Request, res: Response): void {
  const transactions = transactionService.getAllTransactions();
  res.status(200).json(transactions);
}

export function getTransaction(req: Request, res: Response): void {
  const id = req.params.id as string;
  const transaction = transactionService.getTransactionById(id);

  if (!transaction) {
    res.status(404).json({ message: "Transaction not found" });
    return;
  }

  res.status(200).json(transaction);
}



export function createTransaction(req: Request, res: Response): void {
  const { type, amount, category, description, date } = req.body;

  if (!type || !amount || !category || !date) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const newTransaction: Transaction = {
    id: randomUUID(),
    type,
    amount,
    category,
    description: description || "",
    date,
  };

  const created = transactionService.addTransaction(newTransaction);
  res.status(201).json(created);
}

export function removeTransaction(req: Request, res: Response): void {
  const id = req.params.id as string;
  const wasDeleted = transactionService.deleteTransaction(id);

  if (!wasDeleted) {
    res.status(404).json({ message: "Transaction not found" });
    return;
  }

  res.status(204).send();
}
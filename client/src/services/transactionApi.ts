import axios from "axios";
import type { Transaction } from "../types/transaction";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/transactions`;

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await axios.get<Transaction[]>(API_URL);
  return response.data;
}

export async function createTransaction(
  transaction: Omit<Transaction, "id">
): Promise<Transaction> {
  const response = await axios.post<Transaction>(API_URL, transaction);
  return response.data;
}

export async function deleteTransaction(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
import axios from "axios";
import type { Transaction } from "../types/transaction";

const API_URL = "http://localhost:3000/transactions";

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await axios.get<Transaction[]>(API_URL);
  return response.data;
}
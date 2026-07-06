import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Transaction } from "../types/transaction";
import {
  fetchTransactions,
  createTransaction,
  deleteTransaction,
} from "../services/transactionApi";


function getCurrentMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}


export const useTransactionStore = defineStore("transactions", () => {
    
  // --- State ---
  const transactions = ref<Transaction[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const selectedMonth = ref<string>(getCurrentMonth());

  // --- Getters ---
const totalIncome = computed(() =>
  transactionsOfMonth.value
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
);

const totalExpense = computed(() =>
  transactionsOfMonth.value
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)
);

const balance = computed(() => totalIncome.value - totalExpense.value);



  // --- Actions ---
  async function loadTransactions() {
    isLoading.value = true;
    error.value = null;
    try {
      transactions.value = await fetchTransactions();
    } catch (e) {
      error.value = "No se pudieron cargar las transacciones.";
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function addTransaction(transaction: Omit<Transaction, "id">) {
    try {
      const created = await createTransaction(transaction);
      transactions.value.push(created);
    } catch (e) {
      error.value = "No se pudo crear la transacción.";
      console.error(e);
    }
  }

  async function removeTransaction(id: string) {
    try {
      await deleteTransaction(id);
      transactions.value = transactions.value.filter((t) => t.id !== id);
    } catch (e) {
      error.value = "No se pudo eliminar la transacción.";
      console.error(e);
    }
  }

const expensesByCategory = computed(() => {
  const grouped: Record<string, number> = {};
  for (const t of transactionsOfMonth.value) {
    if (t.type === "expense") {
      grouped[t.category] = (grouped[t.category] || 0) + t.amount;
    }
  }
  return grouped;
});

const transactionsOfMonth = computed(() =>
  transactions.value.filter((t) => t.date.slice(0, 7) === selectedMonth.value)
);



return {
    transactions,
    isLoading,
    error,
    selectedMonth,
    transactionsOfMonth,
    totalIncome,
    totalExpense,
    balance,
    expensesByCategory,
    loadTransactions,
    addTransaction,
    removeTransaction,
  };



});
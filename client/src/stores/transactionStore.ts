import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Transaction } from "../types/transaction";
import { fetchTransactions } from "../services/transactionApi";

export const useTransactionStore = defineStore("transactions", () => {
  const transactions = ref<Transaction[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const totalIncome = computed(() =>
    transactions.value
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const totalExpense = computed(() =>
    transactions.value
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const balance = computed(() => totalIncome.value - totalExpense.value);

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

  return {
    transactions,
    isLoading,
    error,
    totalIncome,
    totalExpense,
    balance,
    loadTransactions,
  };
});
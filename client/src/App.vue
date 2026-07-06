<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import type { Transaction } from "./types/transaction";
import SummaryCard from "./components/SummaryCard.vue";
import TransactionForm from "./components/TransactionForm.vue";
import TransactionList from "./components/TransactionList.vue";
import { useTransactionStore } from "./stores/transactionStore";
import ExpensesChart from "./components/ExpensesChart.vue";

const store = useTransactionStore();

// --- Filtro (se queda en App por ahora) ---
const selectedCategory = ref<string>("Todas");
const filterCategories = [
  "Todas", "Sueldo", "Comida", "Transporte", "Servicios",
  "Vivienda", "Salud", "Ocio", "Tarjeta", "Varios",
];

const filteredTransactions = computed(() => {
  if (selectedCategory.value === "Todas") {
    return store.transactions;
  }
  return store.transactions.filter((t) => t.category === selectedCategory.value);
});

const sortedTransactions = computed(() =>
  [...filteredTransactions.value].sort((a, b) => b.date.localeCompare(a.date))
);

// --- Handlers que delegan en el store ---
function handleAddTransaction(transaction: Omit<Transaction, "id">) {
  store.addTransaction(transaction);
}

function handleDelete(id: string) {
  store.removeTransaction(id);
}

// --- Carga inicial desde el backend ---
onMounted(() => {
  store.loadTransactions();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-gray-800">Pecunia 🪙</h1>
    <p class="text-gray-600 mt-2 mb-8">Gestión de finanzas personales</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard title="Saldo total" :amount="store.balance" color="text-gray-800" />
      <SummaryCard title="Ingresos" :amount="store.totalIncome" color="text-green-600" />
      <SummaryCard title="Egresos" :amount="store.totalExpense" color="text-red-600" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 h-[396px]">
      <div class="md:col-span-1">
        <TransactionForm @add-transaction="handleAddTransaction" />
      </div>
      <div class="md:col-span-2">
        <TransactionList
          :transactions="sortedTransactions"
          :categories="filterCategories"
          :selected-category="selectedCategory"
          :is-loading="store.isLoading"
          :error="store.error"
          @delete="handleDelete"
          @change-category="selectedCategory = $event"
        />
      </div>
    </div>

    <div class="mt-8">
      <ExpensesChart />
    </div>
  </div>
</template>
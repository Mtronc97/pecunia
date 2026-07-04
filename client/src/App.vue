<script setup lang="ts">
import { ref, computed } from "vue";
import SummaryCard from "./components/SummaryCard.vue";
import type { Transaction } from "./types/transaction";
import TransactionList from "./components/TransactionList.vue";
import TransactionForm from "./components/TransactionForm.vue";

const transactions = ref<Transaction[]>([
  {
    id: "1",
    type: "income",
    amount: 70000,
    category: "sueldo",
    description: "Sueldo de junio",
    date: "2026-06-25",
  },
  {
    id: "2",
    type: "expense",
    amount: 1200,
    category: "comida",
    description: "Almuerzo con Ana",
    date: "2026-06-26",
  },
  {
    id: "3",
    type: "expense",
    amount: 2000,
    category: "transporte",
    description: "Carga de SUBE",
    date: "2026-06-27",
  },
    {
    id: "4",
    type: "expense",
    amount: 2000,
    category: "transporte",
    description: "Carga de SUBE",
    date: "2026-06-27",
  },
    {
    id: "5",
    type: "expense",
    amount: 2000,
    category: "transporte",
    description: "Carga de SUBE",
    date: "2026-06-27",
  },
]);

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

function handleAddTransaction(transaction: Transaction) {
  transactions.value.push(transaction);
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-gray-800">Pecunia 🪙</h1>
    <p class="text-gray-600 mt-2 mb-8">Gestión de finanzas personales</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard title="Saldo total" :amount="balance" color="text-gray-800" />
      <SummaryCard title="Ingresos" :amount="totalIncome" color="text-green-600" />
      <SummaryCard title="Egresos" :amount="totalExpense" color="text-red-600" />
    </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 h-99">
      <div class="md:col-span-1 h-full">
        <TransactionForm @add-transaction="handleAddTransaction" />
      </div>
      <div class="md:col-span-2 h-full">
        <TransactionList :transactions="transactions" />
      </div>
    </div>
  </div>
</template>
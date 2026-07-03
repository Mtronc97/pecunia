<script setup lang="ts">
import type { Transaction } from "../types/transaction";
import TransactionItem from "./TransactionItem.vue";

defineProps<{
  transactions: Transaction[];
}>();
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-gray-800 mb-4">Transacciones</h2>

    <div v-if="transactions.length === 0" class="text-gray-500">
      No hay transacciones todavía.
    </div>

    <div v-else class="flex flex-col gap-3">
      <TransactionItem
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </div>
  </div>
</template>
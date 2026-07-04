<script setup lang="ts">
import type { Transaction } from "../types/transaction";
import TransactionItem from "./TransactionItem.vue";

defineProps<{
  transactions: Transaction[];
}>();

const emit = defineEmits<{
  (e: "delete", id: string): void;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col h-99">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Transacciones</h2>

    <div v-if="transactions.length === 0" class="text-gray-500">
      No hay transacciones todavía.
    </div>

    <div v-else class="flex flex-col gap-3 overflow-y-auto pr-2 flex-1 min-h-0">
      <TransactionItem
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        @delete="emit('delete', $event)"
      />
    </div>
  </div>
</template>
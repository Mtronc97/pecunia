<script setup lang="ts">
import type { Transaction } from "../types/transaction";
import TransactionItem from "./TransactionItem.vue";

defineProps<{
  transactions: Transaction[];
  categories: string[];
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  (e: "delete", id: string): void;
  (e: "change-category", category: string): void;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col h-[396px]">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800">Transacciones</h2>

      <select
        :value="selectedCategory"
        @change="emit('change-category', ($event.target as HTMLSelectElement).value)"
        class="border rounded p-2 text-sm"
      >
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <div v-if="isLoading" class="text-gray-500">
      Cargando transacciones...
    </div>

    <div v-else-if="error" class="bg-red-100 text-red-700 rounded p-3">
      {{ error }}
    </div>

    <div v-else-if="transactions.length === 0" class="text-gray-500">
      No hay transacciones en esta categoría.
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
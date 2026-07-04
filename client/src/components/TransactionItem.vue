<script setup lang="ts">
import type { Transaction } from "../types/transaction";

defineProps<{
  transaction: Transaction;
}>();

const emit = defineEmits<{
  (e: "delete", id: string): void;
}>();
</script>

<template>
  <div class="flex items-center justify-between bg-white rounded-lg shadow p-4">
    <div>
      <p class="font-medium text-gray-800">{{ transaction.description }}</p>
      <p class="text-sm text-gray-500">{{ transaction.category }} · {{ transaction.date }}</p>
    </div>

    <div class="flex items-center gap-3">
      <p
        class="font-bold"
        :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'"
      >
        {{ transaction.type === 'income' ? '+' : '-' }}
        $ {{ transaction.amount.toLocaleString('es-AR') }}
      </p>

      <button
        @click="emit('delete', transaction.id)"
        class="text-gray-300 hover:text-red-600 text-lg"
        title="Eliminar"
      >
        🗑️
      </button>
    </div>
  </div>
</template>
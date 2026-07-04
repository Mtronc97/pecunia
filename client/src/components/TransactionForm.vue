<script setup lang="ts">
import { ref } from "vue";
import type { TransactionType } from "../types/transaction";
import type { Transaction } from "../types/transaction";

const type = ref<TransactionType>("expense");
const amount = ref<number>(0);
const categories = [
  "Sueldo",
  "Comida",
  "Transporte",
  "Servicios",
  "Vivienda",
  "Salud",
  "Ocio",
  "Tarjeta",
  "Varios",
];

const category = ref<string>("Comida");
const description = ref<string>("");
const date = ref<string>("");


const emit = defineEmits<{
  (e: "add-transaction", transaction: Transaction): void;
}>();

function handleSubmit() {
  if (!amount.value || amount.value <= 0 || !category.value || !date.value) {
    alert("Por favor completá el monto (mayor a 0), la categoría y la fecha.");
    return;
  }

  const newTransaction: Transaction = {
    id: crypto.randomUUID(),
    type: type.value,
    amount: amount.value,
    category: category.value,
    description: description.value,
    date: date.value,
  };

  emit("add-transaction", newTransaction);

  amount.value = 0;
  category.value = "Comida";
  description.value = "";
  date.value = "";
  type.value = "expense";
}
</script>

<template>
<div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Nueva transacción</h2>

    <div class="flex flex-col gap-3">
        <select v-model="type" class="border rounded p-2">
            <option value="income">Ingreso</option>
            <option value="expense">Egreso</option>
        </select>

    <input
        v-model.number="amount"
        type="number"
        min="0"
        placeholder="Monto"
        class="border rounded p-2 no-spinner"
    />

        <select v-model="category" class="border rounded p-2">
            <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
            </option>
        </select>

        <input
            v-model="description"
            type="text"
            placeholder="Descripción"
            class="border rounded p-2"
        />

        <input v-model="date" type="date" class="border rounded p-2" />

        <button
            @click="handleSubmit"
            class="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
            >
            Agregar
        </button>

    </div>
</div>
</template>

<style scoped>
/* Oculta las flechas de subir/bajar del input de tipo number */
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-spinner {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
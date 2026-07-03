<script setup lang="ts">
import { ref } from "vue";
import type { TransactionType } from "../types/transaction";

const type = ref<TransactionType>("expense");
const amount = ref<number>(0);
const category = ref<string>("");
const description = ref<string>("");
const date = ref<string>("");
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
        placeholder="Monto"
        class="border rounded p-2"
        />

        <input
            v-model="category"
            type="text"
            placeholder="Categoría (ej: comida)"
            class="border rounded p-2"
        />

        <input
            v-model="description"
            type="text"
            placeholder="Descripción"
            class="border rounded p-2"
        />

        <input v-model="date" type="date" class="border rounded p-2" />

        <button class="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
            Agregar
        </button>

        <p class="text-xs text-gray-400">
            DEBUG → tipo: {{ type }} | monto: {{ amount }} | cat: {{ category }} | desc: {{ description }} | fecha: {{ date }}
        </p>
    </div>
</div>
</template>
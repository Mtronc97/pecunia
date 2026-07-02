<script setup lang="ts">
import SummaryCard from "./components/SummaryCard.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-gray-800">Pecunia 🪙</h1>
    <p class="text-gray-600 mt-2 mb-8">Gestión de finanzas personales</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard title="Saldo total" :amount="50800" color="text-gray-800" />
      <SummaryCard title="Ingresos" :amount="97000" color="text-green-600" />
      <SummaryCard title="Egresos" :amount="1200" color="text-red-600" />
    </div>
  </div>
</template>
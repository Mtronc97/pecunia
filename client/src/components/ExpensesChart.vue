<script setup lang="ts">
import { computed } from "vue";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useTransactionStore } from "../stores/transactionStore";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const store = useTransactionStore();


const chartData = computed(() => {
  const categories = Object.keys(store.expensesByCategory);
  const amounts = Object.values(store.expensesByCategory);

  return {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: [
          "#ef4444", "#f97316", "#eab308", "#22c55e",
          "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#64748b",
        ],
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Gastos por categoría</h2>

    <div v-if="Object.keys(store.expensesByCategory).length === 0" class="text-gray-500">
      No hay gastos para mostrar todavía.
    </div>

    <div v-else class="h-64">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
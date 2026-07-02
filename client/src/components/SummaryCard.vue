<script setup lang="ts">
defineProps<{
  title: string;
  amount: number;
  color: string;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-sm font-medium text-gray-500">{{ title }}</h3>
    <p class="text-2xl font-bold mt-2" :class="color">
      $ {{ amount.toLocaleString("es-AR") }}
    </p>
  </div>
</template>
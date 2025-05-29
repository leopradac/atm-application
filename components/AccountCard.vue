<template>
  <UCard>
    <p class="text-lg font-semibold capitalize">{{ account }} Account</p>
    <p class="text-2xl font-bold text-green-600">${{ balance.toFixed(2) }}</p>
  </UCard>
</template>

<script setup lang="ts">
import type { AccountType, Balance } from '~/types/account';

defineProps<{
  account: AccountType
  balance: Balance
}>()
</script>
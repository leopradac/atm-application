<template>
    <UCard>
        <template #header>
            <h2 class="text-xl font-semibold">Transaction History</h2>
        </template>

        <ul class="divide-y">
            <li v-for="tx in transactions" :key="tx.id" class="py-2 flex justify-between">
                <div class="flex flex-col">
                    <span class="capitalize">
                        {{ tx.type }} from {{ tx.from }}
                        <span v-if="tx.to">to {{ tx.to }}</span>
                    </span>
                    <span class="text-sm text-gray-500">
                        {{ formatDateTime(tx.date) }}
                    </span>
                </div>
                <span :class="tx.amount < 0 ? 'text-red-500' : 'text-green-600'">
                    ${{ Math.abs(tx.amount).toFixed(2) }}
                </span>
            </li>
            <li v-if="transactions.length === 0" class="text-gray-400 py-2">No transactions yet</li>
        </ul>
    </UCard>
</template>

<script setup lang="ts">
// room for improvement if having more time:
// - add a filter to show only transactions of a certain type
// - add a filter to show only transactions of a certain account
// - add a filter to show only transactions of a certain date range
// - add a filter to show only transactions of a certain amount range
// - add a paginator to the list
import { useAccountsStore } from '~/stores/accounts'
import { storeToRefs } from 'pinia'
import { useFormattedDate } from '~/composables/useFormattedDate'

const store = useAccountsStore()
const { transactions } = storeToRefs(store)
const { formatDateTime } = useFormattedDate()
</script>
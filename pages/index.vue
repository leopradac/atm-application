<template>
    <div class="p-6 max-w-5xl mx-auto space-y-8">
        <UCard>
            <template #header>
                <h1 class="text-2xl font-bold">ATM Web App</h1>
            </template>

            <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- eslint-disable-next-line vue/first-attribute-linebreak -->
                <AccountCard v-for="account in accountTypes" :key="account" :account="account"
                    :balance="balances[account]" />
            </section>
        </UCard>

        <DepositWithdrawForm />
        <TransferForm />
        <TransactionList />
    </div>
</template>
<script setup lang="ts">

import { useAccountsStore } from '~/stores/accounts'
import { storeToRefs } from 'pinia'

const store = useAccountsStore()
const { balances } = storeToRefs(store)

const accountTypes = ['checking', 'savings'] as const
</script>
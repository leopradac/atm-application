<template>
    <UCard>
        <template #header>
            <h2 class="text-xl font-semibold">Transfer Between Accounts</h2>
        </template>

        <UForm :state="form" @submit="handleTransfer">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <UFormField label="From">
                    <USelect v-model="form.from" :items="accountTypes" />
                </UFormField>
                <UFormField label="To">
                    <USelect v-model="form.to" :items="accountTypes" />
                </UFormField>
                <UFormField label="Amount">
                    <UInput v-model.number="form.amount" type="number" placeholder="Amount" min="0" />
                </UFormField>
            </div>
            <div class="mt-4">
                <UButton type="submit">Transfer</UButton>
            </div>
        </UForm>
    </UCard>
</template>

<script setup lang="ts">
import { useAccountsStore } from '~/stores/accounts'
import type { AccountType } from '~/types/account'

const store = useAccountsStore()
const { transfer } = store

const accountTypes = ['checking', 'savings']

const form = reactive({
    from: 'checking' as AccountType,
    to: 'savings' as AccountType,
    amount: 0,
})
const toast = useToast()

function handleTransfer() {
    try {
        transfer(form.from, form.to, form.amount)
        form.amount = 0
        toast.add({ title: "Transfer successful" })
    } catch (err: unknown) {
        if (err instanceof Error) {
            toast.add({ title: err.message, color: 'error' })
        } else {
            toast.add({ title: 'An unknown error occurred', color: 'error' })
        }
    }
}
</script>
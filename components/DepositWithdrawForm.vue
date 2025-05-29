<template>
    <UCard>
        <template #header>
            <h2 class="text-xl font-semibold">Deposit / Withdraw</h2>
        </template>

        <UForm :state="form" @submit="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <UFormField label="Account">
                    <USelect id="account" v-model="form.account" :items="accountTypes" />
                </UFormField>
                <UFormField label="Amount">
                    <UInput id="amount" v-model.number="form.amount" type="number" placeholder="Amount" min="0" />
                </UFormField>
                <UFormField label="Action">
                    <URadioGroup id="type" v-model="form.type" :items="['deposit', 'withdraw']" />
                </UFormField>
            </div>
            <div class="mt-4">
                <UButton type="submit">Submit</UButton>
            </div>
        </UForm>
    </UCard>
</template>

<script setup lang="ts">
import { useAccountsStore } from '~/stores/accounts'
import type { AccountType, TransactionType } from '~/types/account'


const store = useAccountsStore()
const { deposit, withdraw } = store

const accountTypes = ['checking', 'savings']

const form = reactive({
    account: 'checking' as AccountType,
    amount: 0,
    type: 'deposit' as TransactionType,
})
const toast = useToast()

function handleSubmit() {
    try {
        if (form.type === 'deposit') {
            deposit(form.account, form.amount)
        } else {
            withdraw(form.account, form.amount)
        }
        form.amount = 0
    } catch (err: unknown) {
        if (err instanceof Error) {
            toast.add({ title: err.message, color: 'error' })
        } else {
            toast.add({ title: 'An unknown error occurred', color: 'error' })
        }
    }
}
</script>
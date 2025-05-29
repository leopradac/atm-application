import { defineStore } from 'pinia'
import type { AccountType, Balance, Transaction } from '~/types/account'


export const useAccountsStore = defineStore('accounts', () => {
    const balances = ref<Record<AccountType, Balance>>({
        checking: 0,
        savings: 0,
    })
    const transactions = ref<Transaction[]>([])
    // getters
    const getTotalBalance = computed(() => {
        return Object.values(balances.value).reduce((acc, curr) => acc + curr, 0)
    })
    // actions
    const deposit = (account: AccountType, amount: number) => {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0')
        }
        balances.value[account] += amount
        addTransaction('deposit', amount, account)
    }
    const withdraw = (account: AccountType, amount: number) => {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0')
        }
        balances.value[account] -= amount
        addTransaction('withdrawal', amount, account)
    }
    const transfer = (from: AccountType, to: AccountType, amount: number) => {
        if (from === to) {
            throw new Error('From and to accounts cannot be the same')
        }
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0')
        }
        if (balances.value[from] < amount) {
            throw new Error('Insufficient balance')
        }
        balances.value[from] -= amount
        balances.value[to] += amount
        addTransaction('transfer', amount, from, to)
    }
    const addTransaction = (
        type: Transaction['type'],
        amount: number,
        from: AccountType,
        to?: AccountType
    ) => {
        transactions.value.unshift({
            id: crypto.randomUUID(),
            type,
            amount,
            from,
            to,
            date: new Date().toISOString(),
        })
    }

    return {
        balances,
        transactions,
        getTotalBalance,
        deposit,
        withdraw,
        transfer,
    }
}, {
    persist: {
        storage: piniaPluginPersistedstate.sessionStorage(),
        pick: ['balances', 'transactions'],
    },
})
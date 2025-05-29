// @vitest-environment nuxt
import { describe, it, expect, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useAccountsStore } from '@/stores/accounts'
import { setup } from '@nuxt/test-utils'

await setup({})

describe('useAccountsStore', () => {
    beforeEach(() => {
        createTestingPinia({ stubActions: false })
    })

    it('deposits money into checking account', () => {
        const store = useAccountsStore()
        store.deposit('checking', 100)
        expect(store.balances.checking).toBe(100)
        expect(store.transactions[0].type).toBe('deposit')
    })

    it('transfers money between accounts correctly', () => {
        const store = useAccountsStore()
        store.deposit('checking', 200)
        store.transfer('checking', 'savings', 50)

        expect(store.balances.checking).toBe(150)
        expect(store.balances.savings).toBe(50)
        expect(store.transactions[0].type).toBe('transfer')
    })
})
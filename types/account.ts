export type Balance = number

export type AccountType = 'checking' | 'savings'

export type TransactionType = 'deposit' | 'withdrawal' | 'transfer'

export interface Transaction {
    id: string
    type: TransactionType
    amount: number
    from: AccountType
    to?: AccountType // only for transfers
    date: string // ISO string (f.i.: 2025-05-29T10:34:21.000Z)
}
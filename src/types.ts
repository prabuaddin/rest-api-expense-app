export interface IExpense{
    name: string,
    nominal: number,
    category: string,
    date: string
}

export interface IExpenseJSON extends IExpense{
    id: number
}

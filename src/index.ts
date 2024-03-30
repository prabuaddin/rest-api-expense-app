import express, { Express, Request, Response } from 'express'
import { IExpense, IExpenseJSON } from './types'
import { ReadData, WriteData } from './utils/fs'

const app: Express = express()
app.use(express.json())
const port = 3000

app.get('/', (req: Request, res: Response) => {
   res.send('<h1>Back End Developer</h1>')
})

//Menambahkan Pengeluaran
app.post('/expenses', (req: Request, res: Response) => {
    try {
        const expense: IExpense = req.body
        const db = ReadData()
        const expenses: IExpenseJSON[] = db.expenses

        expenses.push({
            id: expenses[expenses.length-1].id + 1,
            ...expense
        })

        WriteData(db)

        return res.send('Berhasil menambahkan expense')
    } catch (error) {
        console.log(error)
    }
})

//Buat List Pengeluaran
app.get('/expenses', (req: Request, res: Response) => {
    try {
        const db = ReadData()
        const expenses: IExpenseJSON[] = db.expenses

        WriteData(db)

        
        return res.send({
            ...expenses
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/expenses/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const db = ReadData()
        const expenses: IExpenseJSON[] = db.expenses

        const expensesFind = expenses.find((val) => val.id === Number(id))
        db.expenses = expensesFind

        WriteData(db)

        return res.send(
            expensesFind
        )
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`💀[server]: Server is Running at http://localhost:${port}`)
})
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("./utils/fs");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.get('/', (req, res) => {
    res.send('<h1>Back End Developer</h1>');
});
//Menambahkan Pengeluaran
app.post('/expenses', (req, res) => {
    try {
        const expense = req.body;
        const db = (0, fs_1.ReadData)();
        const expenses = db.expenses;
        expenses.push(Object.assign({ id: expenses[expenses.length - 1].id + 1 }, expense));
        (0, fs_1.WriteData)(db);
        return res.send('Berhasil menambahkan expense');
    }
    catch (error) {
        console.log(error);
    }
});
//Buat List Pengeluaran
app.get('/expenses', (req, res) => {
    try {
        const db = (0, fs_1.ReadData)();
        const expenses = db.expenses;
        (0, fs_1.WriteData)(db);
        return res.send(Object.assign({}, expenses));
    }
    catch (error) {
        console.log(error);
    }
});
app.get('/expenses/:id', (req, res) => {
    try {
        const { id } = req.params;
        const db = (0, fs_1.ReadData)();
        const expenses = db.expenses;
        const expensesFind = expenses.find((val) => val.id === Number(id));
        db.expenses = expensesFind;
        (0, fs_1.WriteData)(db);
        return res.send(expensesFind);
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(port, () => {
    console.log(`💀[server]: Server is Running at http://localhost:${port}`);
});

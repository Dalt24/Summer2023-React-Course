import React, { useState } from "react";
import Table from "../Table";
import Form from "../Form";

import "./ExpenseTracker.css";

interface Expense {
  description: string;
  amount: number;
  category: string;
}

const ExpenseTracker = () => {
  const categories = [
    "Food",
    "Transportation",
    "Housing",
    "Entertainment",
    "Candy Drawer Supply",
    "Other",
  ];

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (expense: Expense) => {
    setExpenses(expenses.filter((item) => item !== expense));
  };

  return (
    <div className="expense-tracker-container">
      <h1 className="expense-tracker-header">Expense Tracker</h1>
      <Form addItem={addExpense} categories={categories} />
      <Table items={expenses} removeItem={deleteExpense} />
    </div>
  );
};

export default ExpenseTracker;

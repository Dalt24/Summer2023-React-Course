import React, { useState } from "react";

interface Expense {
  description: string;
  amount: number;
  category: string;
}

interface Props {
  categories: string[];
}

const ExpenseTracker = ({ categories }: Props) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(categories[0]);

  const addExpense = (event: React.FormEvent) => {
    event.preventDefault();

    const expense: Expense = {
      description,
      amount,
      category,
    };

    setExpenses([...expenses, expense]);
    setDescription("");
    setAmount(0);
  };

  const deleteExpense = (expense: Expense) => {
    setExpenses(expenses.filter((item) => item !== expense));
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div>
      <h1>Expense Tracker</h1>

      <form onSubmit={addExpense}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          step="1"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>
                <button onClick={() => deleteExpense(expense)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Total</th>
            <th>$ {total.toFixed(2)}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseTracker;

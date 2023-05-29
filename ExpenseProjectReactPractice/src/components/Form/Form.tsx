import { FormEvent, useState } from "react";

import "./Form.css";

interface Props {
  addItem: (item: any) => void;
  categories: string[];
}

export default function Form({ addItem, categories }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(categories[0]);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    const expense = {
      description: description,
      amount: amount,
      category: category,
    };
    addItem(expense);
    setAmount(0);
    setDescription("");
  };

  return (
    <form onSubmit={submitForm} className="expense-form">
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
      <button className="expense-form-button" type="submit">
        Add Expense
      </button>
    </form>
  );
}

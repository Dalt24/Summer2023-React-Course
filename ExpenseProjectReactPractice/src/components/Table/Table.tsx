import { useState } from "react";
import { Expense } from "../ExpenseTracker/ExpenseTracker";
import "./Table.css";

interface Props {
  items: Expense[];
  removeItem: (item: Expense) => void;
  setItems: (items: Expense[]) => void;
}

export default function Table(props: Props) {
  const items = props.items;
  const total = items.reduce((sum, expense) => sum + expense.amount, 0);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const handleEdit = (expense: Expense) => {
    setIsEditing(true);
    setSelectedExpense(expense);
  };

  const handleSave = (expense: Expense, selectedExpense: Expense) => {
    const updatedExpenses = items.map((item) =>
      item === expense ? selectedExpense : item
    );
    props.setItems(updatedExpenses);
    setIsEditing(false);
    setSelectedExpense(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedExpense(null);
  };

  return (
    <div className="expense-table-container">
      <h2 className="expense-table-header">Expense Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map((expense, index) => (
            <tr key={index}>
              <td>
                {isEditing && selectedExpense === expense ? (
                  <input
                    type="text"
                    defaultValue={expense.description}
                    onChange={(e) => (expense.description = e.target.value)}
                  />
                ) : (
                  expense.description
                )}
              </td>
              <td>
                {isEditing && selectedExpense === expense ? (
                  <input
                    type="number"
                    defaultValue={expense.amount}
                    onChange={(e) =>
                      (expense.amount = parseFloat(e.target.value))
                    }
                  />
                ) : (
                  `$${expense.amount.toFixed(2)}`
                )}
              </td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleEdit(expense)}
                >
                  Edit
                </button>
                {isEditing && selectedExpense === expense && (
                  <>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleSave(expense, selectedExpense)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                )}
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.removeItem(expense)}
                >
                  Delete
                </button>
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
}

import "./Table.css";

interface Props {
  items: any[];
  removeItem: (item: any) => void;
}

export default function Table(props: Props) {
  const items = props.items;
  const total = items.reduce((sum, expense) => sum + expense.amount, 0);

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
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>
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

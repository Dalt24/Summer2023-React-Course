// Expense array to store the added expenses
let expenses = [];

// Function to render the expense table
function renderTable()
{
    const tableBody = document.getElementById("expenseTableBody");
    tableBody.innerHTML = "";

    let total = 0;

    expenses.forEach((expense) =>
    {
        const row = document.createElement("tr");
        const descriptionCell = document.createElement("td");
        const amountCell = document.createElement("td");
        const categoryCell = document.createElement("td");
        const deleteCell = document.createElement("td");

        descriptionCell.textContent = expense.description;
        amountCell.textContent = expense.amount.toFixed(2);
        categoryCell.textContent = expense.category;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteExpense(expense));

        deleteCell.appendChild(deleteButton);

        row.appendChild(descriptionCell);
        row.appendChild(amountCell);
        row.appendChild(categoryCell);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);

        total += expense.amount;
    });

    const totalAmountCell = document.getElementById("totalAmount");
    totalAmountCell.textContent = total.toFixed(2);
}

// Function to add an expense
function addExpense(event)
{
    event.preventDefault();

    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    const expense = { description, amount, category };
    expenses.push(expense);

    descriptionInput.value = "";
    amountInput.value = "";

    renderTable();
}

// Function to delete an expense
function deleteExpense(expense)
{
    const index = expenses.indexOf(expense);
    if (index !== -1)
    {
        expenses.splice(index, 1);
        renderTable();
    }
}

// Initialize the app
const expenseForm = document.getElementById("expenseForm");
expenseForm.addEventListener("submit", addExpense);
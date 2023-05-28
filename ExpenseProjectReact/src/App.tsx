import ExpenseTracker from "./components/ExpenseTracker";

function App() {
  const categories = [
    "Food",
    "Transportation",
    "Housing",
    "Entertainment",
    "Candy Drawer Supply",
    "Other",
  ];

  return (
    <>
      <ExpenseTracker categories={categories} />
    </>
  );
}

export default App;

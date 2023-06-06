import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Expense } from "../ExpenseTracker/ExpenseTracker";
import "./Form.css";

const schema = z.object({
  description: z.string().nonempty(),
  amount: z.number().min(0.01),
  category: z.string().nonempty(),
});

// alternative to z.number().min() && line 50 , { valueAsNumber: true }
//     .string()
//     .transform((val) => parseFloat(val)),

interface Props {
  addItem: (item: Expense) => void;
  categories: string[];
}

export default function Form({ addItem, categories }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<Expense>({
    resolver: zodResolver(schema),
  });

  const submitForm = (data: Expense) => {
    addItem(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="expense-form">
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input className="form-control" {...register("description")} required />
        {errors.description && (
          <span className="error">{errors.description.message}</span>
        )}
      </div>

      <label htmlFor="amount">Amount:</label>
      <input
        step="1"
        {...register("amount", { valueAsNumber: true })}
        required
        className="form-control"
      />
      {errors.amount && <span className="error">{errors.amount.message}</span>}

      <label htmlFor="category">Category:</label>
      <select id="category" {...register("category")} className="form-control">
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {errors.category && (
        <span className="error">{errors.category.message}</span>
      )}

      <button
        disabled={!isValid}
        className="btn btn-outline-primary mt-3"
        type="submit"
      >
        Add Expense
      </button>
    </form>
  );
}

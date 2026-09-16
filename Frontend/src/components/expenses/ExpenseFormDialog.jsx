import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useCreateExpense, useUpdateExpense } from "../../hooks/useExpenses.js";

const expenseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  date: z.coerce.date("Date is required"),
  categoryId: z.string().min(1, "Choose a category"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters"),
  paymentMethod: z.enum(["cash", "upi", "card", "netbanking"]),
});

const paymentMethods = [
  ["cash", "Cash"],
  ["upi", "UPI"],
  ["card", "Card"],
  ["netbanking", "Net banking"],
];

const emptyForm = {
  title: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  categoryId: "",
  description: "",
  paymentMethod: "cash",
};

function toFormValues(expense) {
  return {
    title: expense?.title ?? "",
    amount: expense?.amount ?? "",
    date: expense?.date
      ? new Date(expense.date).toISOString().slice(0, 10)
      : emptyForm.date,
    categoryId: expense?.categoryId?._id ?? expense?.categoryId ?? "",
    description: expense?.description ?? "",
    paymentMethod: expense?.paymentMethod ?? "cash",
  };
}

function ExpenseFormDialog({
  open,
  onOpenChange,
  expense = null,
  categories = [],
}) {
  const isEditMode = Boolean(expense);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const createExpenseMutation = useCreateExpense();
  const updateExpenseMutation = useUpdateExpense();
  const isPending =
    createExpenseMutation.isPending || updateExpenseMutation.isPending;

  useEffect(() => {
    if (open) {
      setForm(toFormValues(expense));
      setError("");
    }
  }, [open, expense]);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = expenseSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const payload = {
      ...result.data,
      amount: Number(result.data.amount),
      date: result.data.date.toISOString(),
      description: result.data.description || undefined,
    };
    const options = { onSuccess: () => onOpenChange(false) };

    if (isEditMode) {
      updateExpenseMutation.mutate({ id: expense._id, payload }, options);
    } else {
      createExpenseMutation.mutate(payload, options);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit expense" : "Add expense"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the details for this expense."
                : "Record a purchase to keep your spending up to date."}
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="expense-title">Title</Label>
              <Input
                id="expense-title"
                value={form.title}
                maxLength={100}
                placeholder="e.g. Weekly groceries"
                autoFocus
                onChange={(event) => setField("title", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="expense-amount">Amount</Label>
              <Input
                id="expense-amount"
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount}
                placeholder="0.00"
                onChange={(event) => setField("amount", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="expense-date">Date</Label>
              <Input
                id="expense-date"
                type="date"
                max={new Date().toISOString().slice(0, 10)}
                value={form.date}
                onChange={(event) => setField("date", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="expense-category">Category</Label>
              <select
                id="expense-category"
                value={form.categoryId}
                onChange={(event) => setField("categoryId", event.target.value)}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="expense-payment">Payment method</Label>
              <select
                id="expense-payment"
                value={form.paymentMethod}
                onChange={(event) =>
                  setField("paymentMethod", event.target.value)
                }
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              >
                {paymentMethods.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="expense-description">
                Description{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <textarea
                id="expense-description"
                value={form.description}
                maxLength={500}
                rows={3}
                placeholder="Add a note about this expense"
                onChange={(event) =>
                  setField("description", event.target.value)
                }
                className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              />
            </div>
          </div>
          <p className="mb-3 min-h-5 text-sm text-destructive" role="alert">
            {error}
          </p>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || categories.length === 0}
            >
              {isPending && <Spinner data-icon="inline-start" />}
              {isEditMode ? "Save changes" : "Add expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ExpenseFormDialog;

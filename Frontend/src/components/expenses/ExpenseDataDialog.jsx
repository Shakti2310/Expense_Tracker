import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const paymentLabels = {
  cash: "Cash",
  upi: "UPI",
  card: "Card",
  netbanking: "Net banking",
};

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown date"
    : date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

function formatDateTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown"
    : date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

function formatAmount(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function Detail({ label, value }) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="wrap-break-word text-sm">{value || "Not provided"}</dd>
    </div>
  );
}

function ExpenseDataDialog({ open, onOpenChange, expense }) {
  if (!expense) return;
  <>
    <p className="py-4 text-sm text-destructive" role="alert">
      Could not load this expense. Please close the dialog and try again.
    </p>
  </>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{expense?.title ?? "Expense details"}</DialogTitle>
          <DialogDescription>Full details for this expense.</DialogDescription>
        </DialogHeader>

        {expense && (
          <div className="space-y-5 py-2">
            <div className="rounded-lg bg-primary/10 px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground">
                Amount
              </p>
              <p className="mt-1 text-2xl font-semibold">
                {formatAmount(expense.amount)}
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              <Detail label="Title" value={expense.title} />
              <Detail
                label="Category"
                value={expense.categoryId?.name ?? "Uncategorized"}
              />
              <Detail label="Date" value={formatDate(expense.date)} />
              <Detail
                label="Payment method"
                value={
                  paymentLabels[expense.paymentMethod] ?? expense.paymentMethod
                }
              />
              <Detail label="Description" value={expense.description} />
              <Detail label="Expense ID" value={expense._id} />
              <Detail
                label="Created"
                value={formatDateTime(expense.createdAt)}
              />
              <Detail
                label="Last updated"
                value={formatDateTime(expense.updatedAt)}
              />
            </dl>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ExpenseDataDialog;

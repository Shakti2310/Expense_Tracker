import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Filter,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Tag,
  Trash2,
  WalletCards,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "../../hooks/useCategories.js";
import { useExpenses } from "../../hooks/useExpenses.js";
import ExpenseFormDialog from "../../components/expenses/ExpenseFormDialog.jsx";
import DeleteExpenseDialog from "../../components/expenses/DeleteExpenseDialog.jsx";
import ExpenseDataDialog from "../../components/expenses/ExpenseDataDialog.jsx";
import { DatePicker } from "@/components/customUI/DatePicker.jsx";
import SelectOptions from "@/components/customUI/SelectOptions.jsx";

const PAGE_SIZE = 10;
const paymentLabels = [
  { label: "All methods", value: "" },
  { label: "Cash", value: "cash" },
  { label: "UPI", value: "upi" },
  { label: "Card", value: "card" },
  { label: "Net banking", value: "netbanking" },
];

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown date"
    : date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

function formatAmount(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function CategoryIcon({ category }) {
  if (category?.icon?.startsWith("http")) {
    return (
      <img
        src={category.icon}
        alt=""
        className="h-4 w-4 object-contain"
        aria-hidden
      />
    );
  }
  if (category?.icon) return <span aria-hidden>{category.icon}</span>;
  return <Tag className="h-4 w-4 text-primary" aria-hidden />;
}

function ExpenseSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}

function ExpenseActions({ expense, onEdit, onDelete }) {
  return (
    <div className="flex justify-end gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={`Edit ${expense.title}`}
        onClick={(event) => {
          event.stopPropagation();
          onEdit(expense);
        }}
      >
        <Pencil />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        aria-label={`Delete ${expense.title}`}
        onClick={(event) => {
          event.stopPropagation();
          onDelete(expense);
        }}
      >
        <Trash2 />
      </Button>
    </div>
  );
}

function FilterFields({
  filters,
  categories,
  onChange,
  onClear,
  hasActiveFilters,
}) {
  const categoryOptions = [
    { label: "All categories", value: "" },
    ...categories.map((category) => ({
      label: category.name,
      value: category._id,
    })),
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-1.5">
        <label
          htmlFor="expense-category-filter"
          className="text-xs font-medium text-muted-foreground"
        >
          Category
        </label>
        <SelectOptions
          id="expense-category-filter"
          items={categoryOptions}
          value={filters.category}
          onChange={(value) => onChange("category", value ?? "")}
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="expense-payment-filter"
          className="text-xs font-medium text-muted-foreground"
        >
          Payment method
        </label>
        <SelectOptions
          id="expense-payment-filter"
          items={paymentLabels}
          value={filters.paymentMethod}
          onChange={(value) => onChange("paymentMethod", value ?? "")}
        />
      </div>
      <div className="space-y-1.5 flex flex-col">
        <label
          htmlFor="expense-start-date"
          className="text-xs font-medium text-muted-foreground"
        >
          From date
        </label>

        <DatePicker
          date={filters.startDate}
          onChange={(date) => onChange("startDate", date)}
        />
      </div>
      <div className="space-y-1.5 flex flex-col">
        <label
          htmlFor="expense-end-date"
          className="text-xs font-medium text-muted-foreground"
        >
          To date
        </label>
        <DatePicker
          date={filters.endDate}
          onChange={(date) => onChange("endDate", date)}
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="expense-min-amount"
          className="text-xs font-medium text-muted-foreground"
        >
          Minimum amount
        </label>
        <Input
          id="expense-min-amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={filters.minAmount}
          onChange={(event) => onChange("minAmount", event.target.value)}
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="expense-max-amount"
          className="text-xs font-medium text-muted-foreground"
        >
          Maximum amount
        </label>
        <Input
          id="expense-max-amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={filters.maxAmount}
          onChange={(event) => onChange("maxAmount", event.target.value)}
        />
      </div>
      <div className="flex items-end sm:col-span-2 lg:col-span-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={!hasActiveFilters}
        >
          <X /> Clear filters
        </Button>
      </div>
    </div>
  );
}

function Expenses() {
  const { data: categories = [] } = useCategories();
  const [filters, setFilters] = useState({
    category: "",
    paymentMethod: "",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [viewingExpense, setViewingExpense] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const queryParams = useMemo(() => {
    const params = { page, limit: PAGE_SIZE, sortBy, sortOrder };
    const optional = {
      category: filters.category,
      startDate: filters.startDate,
      endDate: filters.endDate ? `${filters.endDate}T23:59:59.999` : "",
      minAmount: Number(filters.minAmount) > 0 ? filters.minAmount : "",
      maxAmount: Number(filters.maxAmount) > 0 ? filters.maxAmount : "",
      paymentMethod: filters.paymentMethod,
    };
    Object.entries(optional).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    if (debouncedSearch.length >= 2) params.search = debouncedSearch;
    return params;
  }, [debouncedSearch, filters, page, sortBy, sortOrder]);

  const { data, isLoading, isFetching, isError, refetch } =
    useExpenses(queryParams);
  const expenses = data?.data?.expenses ?? [];
  const pagination = data?.data?.pagination ?? {
    page,
    total: 0,
    totalPages: 0,
  };
  const hasFilters =
    Object.values(filters).some(Boolean) || debouncedSearch.length >= 2;

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      paymentMethod: "",
      startDate: "",
      endDate: "",
      minAmount: "",
      maxAmount: "",
    });
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  const changeSort = (value) => {
    const [nextSortBy, nextSortOrder] = value.split("-");
    setSortBy(nextSortBy);
    setSortOrder(nextSortOrder);
    setPage(1);
  };

  const openCreateForm = () => {
    setEditingExpense(null);
    setFormOpen(true);
  };

  const openEditForm = (expense) => {
    setEditingExpense(expense);
    setFormOpen(true);
  };

  const openExpenseDetails = (expense) => setViewingExpense(expense);

  const sortOptions = [
    { label: "Latest", value: "date-desc" },
    { label: "Oldest", value: "date-asc" },
    { label: "Highest", value: "amount-desc" },
    { label: "Lowest", value: "amount-asc" },
  ];

  return (
    <div className="mx-auto w-full px-4 py-6 sm:px-11 lg:px-11">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-gray-900 dark:text-white">
            Expenses
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage your spending in one place.
          </p>
        </div>
        <Button onClick={openCreateForm} className="w-full sm:w-auto">
          <Plus /> Add expense
        </Button>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-9 pl-9"
              placeholder="Search expenses by title..."
              aria-label="Search expenses"
            />
          </div>
          <div className="flex gap-2">
            <SelectOptions
              id="expense-sorting"
              items={sortOptions}
              value={`${sortBy}-${sortOrder}`}
              onChange={(value) => changeSort(value)}
            />
            <Button
              variant={hasFilters ? "secondary" : "outline"}
              onClick={() => setFiltersOpen((open) => !open)}
              className="sm:hidden"
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal /> Filters{hasFilters ? " •" : ""}
            </Button>
          </div>
        </div>
        <div
          className={`${filtersOpen ? "block" : "hidden"} rounded-xl border border-gray-200 bg-white p-4 dark:border-sidebar-border dark:bg-sidebar sm:block`}
        >
          <FilterFields
            filters={filters}
            categories={categories}
            onChange={updateFilter}
            onClear={clearFilters}
            hasActiveFilters={hasFilters}
          />
        </div>
        {search.trim().length === 1 && (
          <p className="text-xs text-muted-foreground">
            Enter at least 2 characters to search.
          </p>
        )}
      </div>

      {isError && (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white py-12 text-center dark:border-sidebar-border dark:bg-sidebar">
          <p className="text-sm text-gray-900 dark:text-gray-100">
            Couldn't load your expenses.
          </p>
          <p className="text-sm text-muted-foreground">
            Check your connection and try again.
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className={isFetching ? "animate-spin" : ""} /> Retry
          </Button>
        </div>
      )}

      {!isError && isLoading && (
        <div className="mt-8">
          <ExpenseSkeleton />
        </div>
      )}

      {!isError && !isLoading && expenses.length === 0 && (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white py-14 text-center dark:border-sidebar-border dark:bg-sidebar">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            {hasFilters ? (
              <Filter className="h-5 w-5 text-primary" />
            ) : (
              <WalletCards className="h-5 w-5 text-primary" />
            )}
          </div>
          <p className="text-sm text-gray-900 dark:text-gray-100">
            {hasFilters ? "No expenses found" : "No expenses yet"}
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            {hasFilters
              ? "Try adjusting your filters or search."
              : "Start tracking your spending by adding your first expense."}
          </p>
          <Button
            size="sm"
            variant={hasFilters ? "outline" : "default"}
            onClick={hasFilters ? clearFilters : openCreateForm}
          >
            {hasFilters ? (
              <>
                <X /> Clear filters
              </>
            ) : (
              <>
                <Plus /> Add expense
              </>
            )}
          </Button>
        </div>
      )}

      {!isError && !isLoading && expenses.length > 0 && (
        <>
          <div className="relative mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-sidebar-border dark:bg-sidebar">
            <div className="hidden md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs text-muted-foreground dark:border-sidebar-border dark:bg-sidebar-accent">
                  <tr>
                    <th className="px-5 py-3 font-medium">Expense</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Payment</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-sidebar-border">
                  {expenses.map((expense) => (
                    <tr
                      key={expense._id}
                      className="cursor-pointer transition-colors hover:bg-gray-50/80 dark:hover:bg-sidebar-accent"
                      onClick={() => openExpenseDetails(expense)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openExpenseDetails(expense);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${expense.title}`}
                    >
                      <td className="max-w-[220px] px-5 py-4">
                        <p
                          className="truncate font-medium text-gray-900 dark:text-gray-100"
                          title={expense.title}
                        >
                          {expense.title}
                        </p>
                        {expense.description && (
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {expense.description}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex max-w-[150px] items-center gap-1.5 truncate rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                          <CategoryIcon category={expense.categoryId} />
                          {expense.categoryId?.name ?? "Uncategorized"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-medium">
                        {formatAmount(expense.amount)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                        {formatDate(expense.date)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                        {paymentLabels[expense.paymentMethod] ??
                          expense.paymentMethod}
                      </td>
                      <td className="px-4 py-4">
                        <ExpenseActions
                          expense={expense}
                          onEdit={openEditForm}
                          onDelete={setDeletingExpense}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="divide-y divide-gray-100 md:hidden dark:divide-gray-800">
              {expenses.map((expense) => (
                <article
                  key={expense._id}
                  className="flex cursor-pointer items-start justify-between gap-3 p-4 transition-colors hover:bg-gray-50/80 dark:hover:bg-sidebar-accent"
                  onClick={() => openExpenseDetails(expense)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openExpenseDetails(expense);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${expense.title}`}
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900 dark:text-gray-100">
                      {expense.title}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <CategoryIcon category={expense.categoryId} />
                        {expense.categoryId?.name ?? "Uncategorized"}
                      </span>
                      <span>•</span>
                      <span>{formatDate(expense.date)}</span>
                    </div>
                    {expense.description && (
                      <p className="mt-2 truncate text-xs text-muted-foreground">
                        {expense.description}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-medium">
                      {formatAmount(expense.amount)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {paymentLabels[expense.paymentMethod] ??
                        expense.paymentMethod}
                    </p>
                    <ExpenseActions
                      expense={expense}
                      onEdit={openEditForm}
                      onDelete={setDeletingExpense}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing {(pagination.page - 1) * pagination.limit + 1}–
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1 || isFetching}
                onClick={() => setPage((current) => current - 1)}
              >
                <ArrowUp className="rotate-[-90deg]" /> Previous
              </Button>
              <span className="min-w-16 text-center text-xs">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={
                  pagination.page >= pagination.totalPages || isFetching
                }
                onClick={() => setPage((current) => current + 1)}
              >
                Next <ArrowDown className="rotate-[-90deg]" />
              </Button>
            </div>
          </div>
        </>
      )}

      <ExpenseFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        expense={editingExpense}
        categories={categories}
      />
      <DeleteExpenseDialog
        open={Boolean(deletingExpense)}
        onOpenChange={(open) => !open && setDeletingExpense(null)}
        expense={deletingExpense}
        onDeleted={() => {
          if (expenses.length === 1 && page > 1)
            setPage((current) => current - 1);
        }}
      />
      <ExpenseDataDialog
        open={Boolean(viewingExpense)}
        onOpenChange={(open) => !open && setViewingExpense(null)}
        expense={viewingExpense}
      />
    </div>
  );
}

export default Expenses;

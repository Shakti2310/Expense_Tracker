import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../api/expense.api.js";

const EXPENSES_KEY = ["expenses"];

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || fallback;

function useExpenses(params) {
  return useQuery({
    queryKey: [...EXPENSES_KEY, params],
    queryFn: () => getExpenses(params),
    placeholderData: (previousData) => previousData,
  });
}

function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpense,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_KEY });
      toast.success(res.message || "Expense added");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Could not add expense")),
  });
}

function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpense,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_KEY });
      toast.success(res.message || "Expense updated");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Could not update expense")),
  });
}

function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_KEY });
      toast.success(res.message || "Expense deleted");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Could not delete expense")),
  });
}

export {
  useExpenses,
  useCreateExpense,
  useUpdateExpense,
  useDeleteExpense,
};

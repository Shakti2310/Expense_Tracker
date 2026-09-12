import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/category.api.js";

const CATEGORIES_KEY = ["categories"];

// Pulls the readable message out of our backend's ApiError/ApiResponse shape,
// falling back to something generic if the request never reached the server.
function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || fallback;
}

function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: getCategories,
    select: (res) => res.data,
  });
}

function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      toast.success(res.message || "Category created");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Could not create category"));
    },
  });
}

function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      toast.success(res.message || "Category updated");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Could not update category"));
    },
  });
}

function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      toast.success(res.message || "Category deleted");
    },
    onError: (error) => {
      // Covers the "still has expenses attached" 409/400 from the backend too
      toast.error(getErrorMessage(error, "Could not delete category"));
    },
  });
}

export {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
};

import { api } from "./axios.js";

const getExpenses = async (params) => {
  const response = await api.get("/expenses", { params });
  return response.data;
};

const getExpense = async (id) => {
  const response = await api.get(`/expenses/${id}`);
  return response.data;
};

const createExpense = async (payload) => {
  const response = await api.post("/expenses", payload);
  return response.data;
};

const updateExpense = async ({ id, payload }) => {
  const response = await api.patch(`/expenses/${id}`, payload);
  return response.data;
};

const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

export { getExpenses, getExpense, createExpense, updateExpense, deleteExpense };

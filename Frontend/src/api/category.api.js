import { api } from "./axios.js";

const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

const createCategory = async (formData) => {
  const response = await api.post("/categories", formData);
  return response.data;
};

const updateCategory = async ({ id, name }) => {
  const response = await api.patch(`/categories/${id}`,  {name} );
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

export { getCategories, createCategory, updateCategory, deleteCategory };

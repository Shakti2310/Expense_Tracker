import { useState } from "react";
import { Plus, RefreshCw, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCategories } from "../../hooks/useCategories.js";
import CategoryCard from "../../components/categories/CategoryCard.jsx";
import CategoryFormDialog from "../../components/categories/CategoryFormDialog.jsx";
import DeleteCategoryDialog from "../../components/categories/DeleteCategoryDialog.jsx";

function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
        />
      ))}
    </div>
  );
}

function Categories() {
  const { data: categories, isLoading, isError, refetch, isFetching } =
    useCategories();

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const openCreateForm = () => {
    setEditingCategory(null);
    setFormOpen(true);
  };

  const openEditForm = (category) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const predefined = categories?.filter((c) => c.userId === null) ?? [];
  const custom = categories?.filter((c) => c.userId !== null) ?? [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-gray-900 dark:text-white">
            Categories
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize your expenses with categories that work for you.
          </p>
        </div>
        <Button onClick={openCreateForm} className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add category
        </Button>
      </div>

      {isError && (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white py-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-900 dark:text-gray-100">
            Couldn't load your categories.
          </p>
          <p className="text-sm text-muted-foreground">
            Check your connection and try again.
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className={isFetching ? "animate-spin" : ""} />
            Retry
          </Button>
        </div>
      )}

      {!isError && isLoading && (
        <div className="mt-8 space-y-8">
          <CategoryGridSkeleton />
        </div>
      )}

      {!isError && !isLoading && (
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
              Predefined categories
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {predefined.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
              My categories
            </h2>

            {custom.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center dark:border-gray-700 dark:bg-gray-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <LayoutGrid className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  No custom categories yet
                </p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Create your first category to organize expenses that don't
                  fit the defaults.
                </p>
                <Button size="sm" onClick={openCreateForm}>
                  <Plus className="h-4 w-4" />
                  Add category
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {custom.map((category) => (
                  <CategoryCard
                    key={category._id}
                    category={category}
                    onEdit={openEditForm}
                    onDelete={setDeletingCategory}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        category={editingCategory}
      />

      <DeleteCategoryDialog
        open={Boolean(deletingCategory)}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        category={deletingCategory}
      />
    </div>
  );
}

export default Categories;
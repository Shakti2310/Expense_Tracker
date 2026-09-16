import { useEffect, useState } from "react";
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
import {
  useCreateCategory,
  useUpdateCategory,
} from "../../hooks/useCategories.js";
import categorySchema from "@/validations/category.validation.js";

function CategoryFormDialog({ open, onOpenChange, category = null }) {
  const isEditMode = Boolean(category);

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const isPending = createCategory.isPending || updateCategory.isPending;

  // Prefill on edit, reset on every open so stale text never leaks between uses
  useEffect(() => {
    if (open) {
      setName(category?.name ?? "");
      setError("");
    }
  }, [open, category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = categorySchema.safeParse({ name });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError("");

    const payload = result.data ;

    if (isEditMode) {
      updateCategory.mutate(
        { id: category._id, name: payload.name },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createCategory.mutate(payload, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit category" : "Add category"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the name for this category."
                : "Give your category a short, clear name."}
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 space-y-1.5">
            <Label htmlFor="category-name">Name</Label>
            <Input
              id="category-name"
              value={name}
              maxLength={25}
              placeholder="e.g. Gym, Dog Expenses"
              autoFocus
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-destructive">{error}</span>
              <span className="text-muted-foreground">{name.length}/25</span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner data-icon="inline-start" />}
              {isEditMode ? "Save changes" : "Add category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryFormDialog;

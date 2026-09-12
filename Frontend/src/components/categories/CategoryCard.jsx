import { Tag, Pencil, Trash2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

// The icon field is just a string on the backend — either a seeded URL
// (predefined categories) or a fixed default we assign server-side for
// custom ones. Render whatever shape it turns out to be, and fall back
// to a plain Tag icon if it's missing entirely.
function CategoryIcon({ icon }) {
  if (icon?.startsWith("http")) {
    return (
      <img src={icon} alt="" className="h-5 w-5 object-contain" aria-hidden />
    );
  }
  if (icon) {
    return (
      <span className="text-lg leading-none" aria-hidden>
        {icon}
      </span>
    );
  }
  return <Tag className="h-5 w-5 text-primary" aria-hidden />;
}

function CategoryCard({ category, onEdit, onDelete }) {
  const isPredefined = category.userId === null;

  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-primary/40 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <CategoryIcon icon={category.icon} />
        </div>

        {isPredefined ? (
          <span
            title="Provided by XseTrack — can't be edited or removed"
            className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-muted-foreground dark:bg-gray-800"
          >
            <Lock className="h-3 w-3" />
            Default
          </span>
        ) : (
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              aria-label={`Edit ${category.name}`}
              onClick={() => onEdit(category)}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
              aria-label={`Delete ${category.name}`}
              onClick={() => onDelete(category)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>

      <p
        className="truncate text-sm font-medium text-gray-900 dark:text-gray-100"
        title={category.name}
      >
        {category.name}
      </p>
    </div>
  );
}

export default CategoryCard;

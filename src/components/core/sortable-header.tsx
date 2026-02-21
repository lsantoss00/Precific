import { Button } from "@/src/components/core/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SortableHeaderProps {
  column: any;
  children: React.ReactNode;
}

const SortableHeader = ({ column, children }: SortableHeaderProps) => {
  const isSorted = column.getIsSorted();

  const handleSort = () => {
    if (isSorted === "asc") {
      column.toggleSorting(true);
    } else if (isSorted === "desc") {
      column.clearSorting();
    } else {
      column.toggleSorting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSort}
      className="px-0 hover:bg-transparent"
    >
      {children}
      {isSorted === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : isSorted === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};

export default SortableHeader;

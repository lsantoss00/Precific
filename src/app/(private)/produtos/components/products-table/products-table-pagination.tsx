"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/core/pagination";
import { parseAsInteger, useQueryState } from "nuqs";

interface ProductsTablePaginationProps {
  totalPages: number;
}

export function ProductsTablePagination({
  totalPages,
}: ProductsTablePaginationProps) {
  const [page, setPage] = useQueryState(
    "pagina",
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
      clearOnDefault: true,
    }),
  );

  const isEmpty = totalPages === 0;

  const handlePageChange = (newPage: number) => {
    if (isEmpty) return;
    setPage(newPage === 1 ? null : newPage);
  };

  const generatePageNumbers = (isMobile: boolean = false) => {
    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];

    if (isMobile) {
      if (totalPages <= 4) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (page <= 2) {
        return [1, 2, 3, "ellipsis-end"];
      } else if (page >= totalPages - 1) {
        return ["ellipsis-start", totalPages - 2, totalPages - 1, totalPages];
      } else {
        return ["ellipsis-start", page, page + 1, "ellipsis-end"];
      }
    }

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page <= 3) {
      pages.push(2, 3, 4, 5, "ellipsis-end", totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(
        "ellipsis-start",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        "ellipsis-start",
        page - 1,
        page,
        page + 1,
        "ellipsis-end",
        totalPages,
      );
    }

    return pages;
  };

  return (
    <Pagination className="md:justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) handlePageChange(page - 1);
            }}
            className={
              page === 1 || isEmpty ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
        <div className="hidden md:contents">
          {generatePageNumbers(false).map((p, idx) =>
            p === "ellipsis-start" || p === "ellipsis-end" ? (
              <PaginationItem key={`${p}-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(p as number);
                  }}
                  isActive={page === p}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
        </div>
        <div className="md:hidden contents">
          {generatePageNumbers(true).map((p, idx) =>
            p === "ellipsis-start" || p === "ellipsis-end" ? (
              <PaginationItem key={`${p}-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(p as number);
                  }}
                  isActive={page === p}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
        </div>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) handlePageChange(page + 1);
            }}
            className={
              page === totalPages || isEmpty
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

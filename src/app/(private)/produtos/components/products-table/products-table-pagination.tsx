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
import { useRouter, useSearchParams } from "next/navigation";

interface ProductsTablePaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ProductsTablePagination({
  currentPage,
  totalPages,
}: ProductsTablePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pagina", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const generatePageNumbers = (isMobile: boolean = false) => {
    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];

    if (isMobile) {
      if (totalPages <= 4) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (currentPage <= 2) {
        return [1, 2, 3, "ellipsis-end"];
      } else if (currentPage >= totalPages - 1) {
        return ["ellipsis-start", totalPages - 2, totalPages - 1, totalPages];
      } else {
        return ["ellipsis-start", currentPage, currentPage + 1, "ellipsis-end"];
      }
    }

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage <= 3) {
      pages.push(2, 3, 4, 5, "ellipsis-end", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        "ellipsis-start",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        "ellipsis-start",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis-end",
        totalPages
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
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        <div className="hidden md:contents">
          {generatePageNumbers(false).map((page) =>
            page === "ellipsis-start" || page === "ellipsis-end" ? (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page as number);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        </div>

        <div className="md:hidden contents">
          {generatePageNumbers(true).map((page) =>
            page === "ellipsis-start" || page === "ellipsis-end" ? (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page as number);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        </div>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1);
              }
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

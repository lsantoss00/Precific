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
import Row from "@/src/components/core/row";
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
    router.push(`?${params.toString()}`);
  };

  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;
    const delta = 1;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const isNearStart = currentPage <= 2;
    const isNearEnd = currentPage >= totalPages - 1;

    const shouldShowFirst = !isNearStart;
    if (shouldShowFirst) pages.push(1);

    const shouldShowStartEllipsis = currentPage > 3;
    if (shouldShowStartEllipsis) pages.push("ellipsis");

    const startPage = isNearStart
      ? 1
      : isNearEnd
      ? totalPages - 3
      : currentPage - delta;
    const endPage = isNearStart
      ? 4
      : isNearEnd
      ? totalPages
      : currentPage + delta;

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    const shouldShowEndEllipsis = currentPage < totalPages - 2;
    if (shouldShowEndEllipsis) pages.push("ellipsis");

    const shouldShowLast = !isNearEnd;
    if (shouldShowLast) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="border-t bg-gray-50 flex-shrink-0">
      <Row className="items-center w-full p-2">
        <Pagination className="justify-end">
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

            {generatePageNumbers().map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

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
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Row>
    </div>
  );
}

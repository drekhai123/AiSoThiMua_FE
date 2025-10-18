"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {getPageNumbers().map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="px-4 py-2 text-gray-400">...</span>
          ) : (
            <Button
              onClick={() => onPageChange(page as number)}
              variant={currentPage === page ? "default" : "outline"}
              className={
                currentPage === page
                  ? "bg-gradient-to-l from-purple-600 to-blue-600 text-white border-0"
                  : "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              }
            >
              {page}
            </Button>
          )}
        </div>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Pagination;

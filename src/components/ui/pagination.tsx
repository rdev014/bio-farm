import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const getPageUrl = (page: number) => {
    const url = new URL(baseUrl, 'http://placeholder');
    url.searchParams.set('page', page.toString());
    return `${url.pathname}?${url.searchParams.toString()}`;
  };

  return (
    <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          Previous
        </Link>
      )}
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isCurrentPage = page === currentPage;
        
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <Link
              key={page}
              href={getPageUrl(page)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium
                ${
                  isCurrentPage
                    ? 'z-10 bg-green-600 text-white focus:z-20'
                    : 'text-gray-500 hover:bg-gray-50 focus:z-20'
                }`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {page}
            </Link>
          );
        }

        if (
          (page === currentPage - 2 && currentPage > 3) ||
          (page === currentPage + 2 && currentPage < totalPages - 2)
        ) {
          return (
            <span
              key={page}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700"
            >
              ...
            </span>
          );
        }

        return null;
      })}

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          Next
        </Link>
      )}
    </nav>
  );
}

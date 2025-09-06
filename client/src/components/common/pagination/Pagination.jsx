import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const goTo = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) pages.push('left-ellipsis');

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages - 1) pages.push('right-elipsis');

    pages.push(totalPages);
    return pages;
  };

  const pages = getPages();
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={prevDisabled}
            className={prevDisabled ? 'pointer-events-none opacity-50' : ''}
            onClick={() => goTo(currentPage - 1)}
          />
        </PaginationItem>
        {pages.map((p, index) => (
          <PaginationItem key={`${p}-${index}`}>
            {typeof p === 'number' ? (
              <PaginationLink
                href="#"
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(p);
                }}>
                {p}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={nextDisabled}
            className={nextDisabled ? 'pointer-events-none opacity-50' : ''}
            onClick={() => goTo(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;

'use client';

import arrowLeftDisabled from '@/assets/icons/icon_arrow_left_gray.png';
import arrowRightDisabled from '@/assets/icons/icon_arrow_right_gray.png';
import arrowRightBlack from '@/assets/icons/icon_arrow_right_black.png';
import arrowLeftBlack from '@/assets/icons/icon_arrow_left_black.png';

import Image from 'next/image';

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage === totalPages) {
    startPage = Math.max(1, totalPages - maxVisiblePages + 1);
  }

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className={`w-8 h-8 border border-solid border-gray300 rounded-full`}
      >
        <i className="flex justify-center items-center">
          {page === 1 ? (
            <Image src={arrowLeftDisabled} alt="이전 페이지" width={16} height={16} />
          ) : (
            <Image src={arrowLeftBlack} alt="이전 페이지" width={16} height={16} />
          )}
        </i>
      </button>
      <div className="border border-solid border-gray300 rounded-xl p-2 mx-3 s:flex">
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageIndex = startPage + index;
          return (
            <button
              key={pageIndex}
              onClick={() => setPage(pageIndex)}
              className={`w-6 h-6 pt-[1px] pb-[2px] px-[7.5px] s:text-sm ${
                page === pageIndex ? 'bg-pramary500 text-white rounded-full' : 'text-gray600'
              } ${pageIndex !== endPage ? 'mr-4' : ''}`}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="w-8 h-8 border border-solid border-gray300 rounded-full"
      >
        <i className="flex justify-center items-center">
          {page === totalPages ? (
            <Image src={arrowRightDisabled} alt="다음 페이지" width={16} height={16} />
          ) : (
            <Image src={arrowRightBlack} alt="다음 페이지" width={16} height={16} />
          )}
        </i>
      </button>
    </div>
  );
};

export default Pagination;

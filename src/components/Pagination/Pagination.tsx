import { FC } from 'react';
import './pagination.scss';
import { PaginationProps } from '../../interfaces/pagination';

export const Pagination: FC<PaginationProps> = ({
  phonePerPage,
  totalPhones,
  currentPage,
  paginate,
}: PaginationProps) => {
  const pageNumbers: Array<number> = [];

  for (let i = 1; i <= Math.ceil(totalPhones / phonePerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className='pagination center'>
      {pageNumbers.map((number) => (
        <li
          className={`page-item ${number === currentPage ? 'active-page' : ''}`}
          key={number}
        >
          <a
            href={`#?page${number}`}
            className='page-link active-page'
            onClick={() => paginate(number)}
          >
            {number}
          </a>
        </li>
      ))}
    </div>
  );
};

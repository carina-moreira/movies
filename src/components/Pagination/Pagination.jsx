import "./Pagination.scss";
import React from "react";
import arrow from "./../../assets/imgs/icon_arrow.svg";

/**
 * Renders a pagination component with buttons for navigating through pages of movies.
 *
 * @param {Object} props - The component props.
 * @param {number} props.moviesPerPage - The number of movies per page.
 * @param {number} props.totalMovies - The total number of movies.
 * @param {number} props.currentPage - The current page number.
 * @param {function} props.paginate - The function to handle page changes.
 * @return {JSX.Element} The rendered pagination component.
 */
const Pagination = ({ moviesPerPage, totalMovies, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {/* TODO:
       * Implement scroll to the start of the movies list after clicking next/prev
       * Disabled arrow style
       * */}
      <button
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        className={`pagination__arrow--prev ${
          currentPage === 1 ? "disabled" : ""
        }`}
      >
        <img src={arrow} alt="arrow left" className="arrow--left" />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`pagination__number ${
            number === currentPage ? "active" : ""
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() =>
          currentPage < pageNumbers.length && paginate(currentPage + 1)
        }
        className={`pagination__arrow--next  ${
          currentPage === pageNumbers.length ? "disabled" : ""
        }`}
      >
        <img src={arrow} alt="arrow right" className="arrow--right" />
      </button>
    </div>
  );
};

export default Pagination;

import React from "react";

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} onClick={() => paginate(number)}>
          <a href="#!">{number}</a>
        </li>
      ))}
    </ul>
  );
}

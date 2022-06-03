import React from "react";

export default function Paginate({ countriesPerPage, allCountries, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers &&
        pageNumbers.map((number) => (
          <p className="number" key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </p>
        ))}
    </div>
  );
}
 
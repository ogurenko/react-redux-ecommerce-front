import React from "react";

const LocalSearch = ({ searchQuery, setsearchQuery }) => {
  const handleSearchChange = (event) => {
    event.preventDefault();
    setsearchQuery(event.target.value.toLowerCase());
  };

  return (
    <input
      type="search"
      placeholder="Filter"
      value={searchQuery}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  );
};
export default LocalSearch;

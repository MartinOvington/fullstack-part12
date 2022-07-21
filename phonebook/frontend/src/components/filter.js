import React from 'react';

const Filter = ({ myFilter, handleFilterChange }) => (
  <form>
    <div>
      filter shown with:{' '}
      <input value={myFilter} onChange={handleFilterChange} />
    </div>
  </form>
);

export default Filter;

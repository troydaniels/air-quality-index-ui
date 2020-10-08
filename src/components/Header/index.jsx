import React from 'react';
import SearchBar from '../SearchBar';
import ErrorMessage from '../ErrorMessage';

const Header = () => {
  return (
    <div className="flex flex-column f4 pt1 pb3 ph4 bg-light-blue white">
      <div className="flex flex-row">
        <div className="mb2">Air Quality Index</div>
        <ErrorMessage />
      </div>
      <SearchBar />
    </div>
  );
};

export default Header;

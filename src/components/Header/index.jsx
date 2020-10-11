import React from 'react';
import SearchBar from '../SearchBar';
import ErrorMessage from '../ErrorMessage';

const Header = () => {
  return (
    <div className="flex flex-column f4 pt1 pb3 ph4-ns ph1 bg-light-blue">
      <ErrorMessage />
      <div className="mw8 w-100 flex flex-column center">
        <div className="mb2 f3 fw4 mh0-ns center">Air Quality Index Search</div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;

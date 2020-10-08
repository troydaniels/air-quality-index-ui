import React from 'react';
import * as R from 'ramda';
import { useAppState } from '../../state';
import apiServices from '../../api/apiServices';

const ERROR_FETCHING_SEARCH =
  'There was an error performing this search. Please check your network connection and try again.';

const SearchBar = () => {
  const {
    setError,
    searchTerm,
    setSearchTerm,
    setSearchResults,
  } = useAppState();

  return (
    <form
      className="flex flex-row ba b--solid pa2"
      onSubmit={(event) => {
        event.preventDefault();
        apiServices
          .getSearchByName(searchTerm)
          // Despite the API documentation, it seems the error message is returned as the `data` value
          .then(R.compose(R.pickAll(['status', 'data']), R.prop('data')))
          .then(
            R.ifElse(
              R.propEq('status', 'error'),
              R.compose(setError, R.prop('data')),
              R.compose(setSearchResults, R.prop('data'))
            )
          )
          .catch(() => setError(ERROR_FETCHING_SEARCH));
      }}
    >
      <input
        type="text"
        value={searchTerm}
        placeholder="Enter a station name"
        onChange={R.compose(setSearchTerm, R.prop('value'), R.prop('target'))}
        className="w5 mr1"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

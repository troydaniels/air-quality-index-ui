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
      className="flex flex-row ba-ns b--solid-ns b--white pa2"
      onSubmit={(event) => {
        event.preventDefault();
        apiServices
          .getStationsByName(searchTerm)
          .then(R.compose(R.pickAll(['status', 'data']), R.prop('data')))
          .then(
            R.ifElse(
              R.propEq('status', 'error'),
              // In  case of an error, the error message is returned as the `data` value
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
        placeholder="City/station name"
        onChange={R.compose(setSearchTerm, R.prop('value'), R.prop('target'))}
        className="w5-ns w-100 mr1"
      />
      <button
        className="f6 link dim ph3 pv2 dib white bg-blue b--white"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

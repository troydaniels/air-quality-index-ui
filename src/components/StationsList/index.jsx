import React from 'react';
import * as R from 'ramda';
import { useAppState } from '../../state';
import apiServices from '../../api/apiServices';

const ERROR_FETCHING_FEED =
  'There was an error retrieving the Air Quality feed from this station. Please check your network connection and try again.';

const StationsList = () => {
  const { setError, searchResults, setSelection } = useAppState();

  return searchResults ? (
    <>
      {searchResults.map(({ uid, station: { name } }) => (
        <button
          className="pv2 ph3 mb1 flex-grow-0 flex-shrink-0 ba b--solid b--light-gray tl w-100 border-box"
          onClick={() =>
            apiServices
              .getStationFeedByUID(uid)
              .then(R.compose(R.pickAll(['status', 'data']), R.prop('data')))
              .then(
                R.ifElse(
                  R.propEq('status', 'error'),
                  R.compose(setError, R.prop('data')),
                  R.compose(setSelection, R.prop('data'))
                )
              )
              .catch(() => setError(ERROR_FETCHING_FEED))
          }
          type="button"
        >
          {name}
        </button>
      ))}
    </>
  ) : (
    <div className="ph3 pv2 black h4 flex items-center justify-center">
      Info to go here
    </div>
  );
};

export default StationsList;

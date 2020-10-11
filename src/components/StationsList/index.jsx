import React, { useEffect } from 'react';
import * as R from 'ramda';
import classnames from 'classnames';
import { useAppState } from '../../state';
import apiServices from '../../api/apiServices';

const ERROR_FETCHING_FEED =
  'There was an error retrieving the Air Quality feed from this station. Please check your network connection and try again.';

const StationsList = () => {
  const { setError, searchResults, setSelection, selection } = useAppState();

  const handleStationSelect = (uid) => {
    apiServices
      .getStationFeedByUID(uid)
      .then(R.compose(R.pickAll(['status', 'data']), R.prop('data')))
      .then(
        R.ifElse(
          R.propEq('status', 'error'),
          // In  case of an error, the error message is returned as the `data` value
          R.compose(setError, R.prop('data')),
          R.compose(setSelection, R.prop('data'))
        )
      )
      .catch(() => setError(ERROR_FETCHING_FEED));
  };

  useEffect(() => {
    // If we only have a single search result returned, lets be helpful and select that one for them
    if (searchResults?.length === 1) {
      handleStationSelect(searchResults[0].uid);
    }
  }, [searchResults]);

  return (
    <div
      className="flex flex-column-l flex-row w5-l w-100 ml3-l mv0-l mb2 h-100-l overflow-x-visible-l overflow-x-scroll"
      style={{ minHeight: '70px' }}
    >
      {/* On app mount */}
      {!searchResults && (
        <div className="flex flex-column tl-l tc pa2 bg-light-gray">
          <div>
            Air quality information & map on screen is from the nearest air
            quality station to you, based on your device&#39;s IP address.
          </div>
          <div className="mt3 fw6">
            Explore air quality at other locations by searching above.
          </div>
        </div>
      )}
      {/* No search results */}
      {searchResults && !searchResults.length && (
        <div className="flex flex-column items-start-l center tc">
          <div className="fw6 f5 mb2 bg-light-gray w-100">NO RESULTS FOUND</div>
          <div className="fw3 tl-l">
            Please enter another city or station name and search again.
          </div>
        </div>
      )}
      {/* Several search results */}
      {!!searchResults?.length &&
        searchResults.map(({ uid, station: { name } }) => (
          <button
            className={classnames(
              'pv2-l ph3-l pa1 ml0-l mr2 mv1 flex-grow-0 flex-shrink-0 ba b--solid b--gray border-box tl-l tc w5-l w4',
              {
                'bg-lightest-blue': uid !== selection.idx,
                'bg-light-blue': uid === selection.idx,
              }
            )}
            onClick={() => handleStationSelect(uid)}
            type="button"
            key={uid}
          >
            {/* The name key can contain several concatenated names */}
            {name.split(';')[0]}
          </button>
        ))}
    </div>
  );
};

export default StationsList;

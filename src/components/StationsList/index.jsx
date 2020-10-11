import React from 'react';
import * as R from 'ramda';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useAppState } from '../../state';
import apiServices from '../../api/apiServices';

const ERROR_FETCHING_FEED =
  'There was an error retrieving the Air Quality feed from this station. Please check your network connection and try again.';

const StationsList = () => {
  const { setError, searchResults, setSelection, selection } = useAppState();
  console.log(searchResults);
  return (
    <div className="flex flex-column-l flex-row w5-l w-100 ml3-l overflow-x-visible-l overflow-x-scroll">
      {searchResults ? (
        searchResults.map(({ uid, station: { name } }) => (
          <button
            className={classnames(
              'pv2-l ph3-l pa1 ml0-l mr2 mv1 flex-grow-0 flex-shrink-0 ba b--solid b--gray border-box tl-l tc w5-l w4',
              {
                'bg-lightest-blue': uid !== selection.idx,
                'bg-light-blue': uid === selection.idx,
              }
            )}
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
            key={uuidv4()}
          >
            {name.split(';')[0]}
          </button>
        ))
      ) : (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </>
      )}
    </div>
  );
};

export default StationsList;

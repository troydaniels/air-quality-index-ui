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
    <div
      className="flex flex-column w5 ml3 overflow-y-auto"
      style={{ height: '30rem' }}
    >
      {searchResults ? (
        searchResults.map(({ uid, station: { name } }) => (
          <button
            className={classnames(
              'pv2 ph3 mb1 flex-grow-0 flex-shrink-0 ba b--solid b--gray tl w-100 border-box',
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
        <>Info</>
      )}
    </div>
  );
};

export default StationsList;

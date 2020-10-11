/* eslint-disable */
import React, { useEffect } from 'react';
import * as R from 'ramda';
import { useAppState } from '../../state';
import Header from '../Header';
import StationsList from '../StationsList';
import StationData from '../StationData';
import apiServices from '../../api/apiServices';

const ERROR_FETCHING_LOCAL_FEED =
  'There was an error retrieving details from your local Air Quality station. Please check your network connection and refresh the page.';

const AirQualityApp = () => {
  const { setError, setSelection } = useAppState();

  // On load, fetch details from the local Air Quality station, based on the user's IP
  useEffect(() => {
    apiServices
      .getStationFeedByIPAddress()
      .then(R.compose(R.pickAll(['status', 'data']), R.prop('data')))
      .then(
        R.ifElse(
          R.propEq('status', 'error'),
          R.compose(setError, R.prop('data')),
          R.compose(setSelection, R.prop('data'))
        )
      )
      .catch(() => setError(ERROR_FETCHING_LOCAL_FEED));
  }, []);

  return (
    <div className="flex flex-column flex-grow near-black">
      <Header />
      <div className="pa3 flex-grow-1 flex-shrink-0 flex flex-row-l flex-column center mw8 w-100">
        <StationsList />
        <StationData />
      </div>
      <div className="f7 mv3 tc">
        <div>
          Map data provided by{' '}
          <a
            href="https://github.com/mapbox"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mapbox.
          </a>
        </div>
        <div>
          Air quality data provided by the{' '}
          <a
            href="https://waqi.info/"
            target="_blank"
            rel="noopener noreferrer"
          >
            World Air Quality Index project.
          </a>
        </div>
        <div>
          All data on this website is approximate and has not been verified.
        </div>
      </div>
    </div>
  );
};

export default AirQualityApp;

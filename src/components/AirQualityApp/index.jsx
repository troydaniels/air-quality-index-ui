import React, { useEffect } from 'react';
import * as R from 'ramda';
import { useAppState } from '../../state';
import Header from '../Header';
import StationsList from '../StationsList';
import StationData from '../StationData';
import Footer from '../Footer';
import apiServices from '../../api/apiServices';

const ERROR_FETCHING_LOCAL_FEED =
  'There was an error retrieving details from your local Air Quality station. Please check your network connection and refresh the page.';

const AirQualityApp = () => {
  const { setError, setSelection, selection } = useAppState();

  useEffect(() => {
    // Scroll to top when a new station is selected
    if (selection) {
      window.scroll(0, 0);
    }
  }, [selection]);

  // On load, fetch details from the local Air Quality station, based on the user's IP
  useEffect(() => {
    apiServices
      .getStationFeedByIPAddress()
      .then(R.compose(R.pickAll(['status', 'data']), R.prop('data')))
      .then(
        R.ifElse(
          R.propEq('status', 'error'),
          // In  case of an error, the error message is returned as the `data` value
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
      <Footer />
    </div>
  );
};

export default AirQualityApp;

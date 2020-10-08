/* eslint-disable */
import React from 'react';
import { useAppState } from '../../state';
import Header from '../Header';
import StationsList from '../StationsList';
import 'tachyons';

const AirQualityApp = () => {
  const { selection } = useAppState();

  return (
    <div className="flex flex-column flex-grow">
      <Header />
      <div className="pa3 flex-grow-1 flex-shrink-0 flex items-start">
        <>
          <div className="flex flex-column w5">
            <StationsList />
          </div>
        </>
        {selection && (
          <div className="ba b--light-gray br1 ml5" style={{ width: 512 }}>
            <div className="pv2 ph3 flex justify-between">
              {selection.city.name}
              <div>
                ({selection.city.geo[0]}, {selection.city.geo[1]})
              </div>
            </div>
            <div className="h4 pv2 ph3 flex justify-center items-center f1">
              {selection.aqi}
            </div>
            <div className="f7 pv2">
              {selection.attributions.map(({ url, name }) => (
                <div className="flex justify-between pv1 ph3">
                  <div>{name}</div>
                  <div className="blue pl3">{url}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirQualityApp;

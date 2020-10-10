/* eslint-disable */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { useAppState } from '../../state';

const StationData = () => {
  const { selection, aqiValues } = useAppState();

  return selection ? (
    <div className="ba b--light-gray br1 ph3 ml5" style={{width: '40rem'}}>
      <div className="pv2 flex justify-between">
        {selection.city.name} Air Quality
      </div>
      <div className="flex flex-row">
        <div
          className={`h4 w-50 mr3 br2 flex flex-column justify-center items-center ${aqiValues.legendStyle}`}
        >
          <span className="f1">{selection.aqi}</span>
          <span className="f3">{aqiValues.warningLevel}</span>
        </div>
        <div className="flex flex-column w-50 fw3">
          <div className="mt2 mb1 flex flex-row justify-between">
            <div>Air Temperature:{' '}</div>
            <div className="fw6">{selection.iaqi?.t?.v ? `${selection.iaqi.t.v.toFixed(1)}℃` : '-'}</div>
          </div>
          <div className="mv1 flex flex-row justify-between">
            <div>Air Pressure:{' '}</div>
            <div className="fw6">{selection.iaqi?.p?.v ? `${selection.iaqi.p.v.toFixed(1)}mb` : '-'}</div>
          </div>
          <div className="mv1 flex flex-row justify-between">
            <div>Relative Humidity:{' '}</div>
            <div className="fw6">{selection.iaqi?.t?.v ? `${selection.iaqi.t.v.toFixed(1)}%` : '-'}</div>
          </div>
          {selection?.time?.iso && (
            <div className="flex-grow-1 flex flex-column justify-end center">
              <div className="mt3 f7">Updated {moment(selection.time.iso).format('LLL')}</div>
            </div>
          )}
        </div>
      </div>
      <div className="f7 pv2">
        {selection.attributions.map(({ url, name }) => (
          <div className="flex justify-between pv1" key={uuidv4()}>
            <a href={url}>{name}</a>
          </div>
        ))}
      </div>
      <div id="map" className="h5 mb2" />
    </div>
  ) : null;
};

export default StationData;

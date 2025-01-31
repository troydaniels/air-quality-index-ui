import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from 'rc-tooltip';
import * as moment from 'moment';
import { useAppState } from '../../state';
import 'rc-tooltip/assets/bootstrap_white.css';

const DATE_FORMAT = 'LLL'; // https://momentjs.com/docs/#/parsing/string-format/

const StationData = () => {
  const { selection, aqiValues } = useAppState();

  return (
    <div className="ba b--light-gray br1 ph3 h-100  ml5-l w-60-l w-100">
      {selection && (
        <>
          <div className="pv2 flex justify-between f4 fw6">
            {selection.city.name} Air Quality
          </div>
          <div className="flex flex-row">
            <Tooltip
              placement="bottomLeft"
              overlay={<span>{aqiValues.tooltip}</span>}
            >
              <div
                className={`h4 w-50 mr3 br2 flex flex-column justify-center items-center ${aqiValues.legendStyle}`}
                style={{ cursor: 'default' }}
              >
                <div className="flex-grow-1 flex flex-column justify-center items-center">
                  <div className="f1 fw4">{selection.aqi}</div>
                  <div className="f3">{aqiValues.warningLevel}</div>
                </div>
                <div className="self-start mb1 ml1 f5 fw5 white">&#9432;</div>
              </div>
            </Tooltip>
            <div className="flex flex-column w-50 fw3">
              <div className="mt2 mb1 flex flex-row-ns flex-column justify-between-ns">
                <div>Air Temperature: </div>
                <div className="fw6">
                  {selection.iaqi?.t?.v
                    ? `${selection.iaqi.t.v.toFixed(1)}℃`
                    : '-'}
                </div>
              </div>
              <div className="mv1 flex flex-row-ns flex-column justify-between-ns">
                <div>Air Pressure: </div>
                <div className="fw6">
                  {selection.iaqi?.p?.v
                    ? `${selection.iaqi.p.v.toFixed(1)}mb`
                    : '-'}
                </div>
              </div>
              <div className="mv1 flex flex-row-ns flex-column justify-between-ns">
                <div>Relative Humidity: </div>
                <div className="fw6">
                  {selection.iaqi?.t?.v
                    ? `${selection.iaqi.t.v.toFixed(1)}%`
                    : '-'}
                </div>
              </div>
              {selection?.time?.iso && (
                <div className="flex-grow-1 flex flex-column justify-end center">
                  <div className="mt3 f7">
                    Updated {moment(selection.time.iso).format(DATE_FORMAT)}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="f7 pv2">
            {selection.attributions.map(({ url, name }) => (
              <div className="flex justify-between pv1" key={uuidv4()}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              </div>
            ))}
          </div>
          <div id="map" className="vh-50-l h5 mb2" />
        </>
      )}
    </div>
  );
};

export default StationData;

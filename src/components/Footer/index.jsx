import React from 'react';

const Footer = () => (
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
      <a href="https://waqi.info/" target="_blank" rel="noopener noreferrer">
        World Air Quality Index project.
      </a>
    </div>
    <div>
      All data on this website is approximate and has not been verified.
    </div>
  </div>
);

export default Footer;

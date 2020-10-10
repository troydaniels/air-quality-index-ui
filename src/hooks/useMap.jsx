import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const useMap = (selection) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (selection) {
      // When our selection changes, destroy the previous map instance
      if (map) {
        map.remove();
      }

      // Some reasonable fallback values for our Latitude and Longitude
      // `geo` can equal `null`, meaning destructing default will not be assigned without || operator
      const { city: { geo } = {} } = selection;
      const [lat = 0, long = 0] = geo || [];

      // https://docs.mapbox.com/mapbox-gl-js/api/
      mapboxgl.accessToken = process.env.MAPBOX_API_TOKEN;
      const newMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [long, lat],
        zoom: 12,
      });
      new mapboxgl.Marker().setLngLat([long, lat]).addTo(newMap);

      setMap(newMap);
    }
  }, [selection]);

  return null;
};

export default useMap;

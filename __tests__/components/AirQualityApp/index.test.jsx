import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import AirQualityApp from '../../../src/components/AirQualityApp';
import AppStateProvider from '../../../src/state';

// Remove missing prop errors from test output
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
  console.error.mockRestore();
});
afterEach(() => {
  console.error.mockClear();
});

jest.mock('axios');

describe('The AirQualityApp component', () => {
  const useEffect = jest.spyOn(React, 'useEffect');

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(() => {
    // Call mockUseEffect on component 'mount'
    mockUseEffect();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches local air quality station data on mount', () => {
    const props = {
      getStationFeedByIPAddress: axios.get.mockImplementation(() => {
        return Promise.resolve({ data: { status: 'ok', data: {} } });
      }),
    };
    mount(
      <AppStateProvider>
        <AirQualityApp {...props} />
      </AppStateProvider>
    );
    expect(props.getStationFeedByIPAddress).toHaveBeenCalled();
  });
});

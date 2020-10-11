import React from 'react';
import renderer from 'react-test-renderer';
import AirQualityApp from '../../../src/components/AirQualityApp';
import AppStateProvider from '../../../src/state';

describe('The AirQualityApp ', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <AppStateProvider>
          <AirQualityApp />
        </AppStateProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

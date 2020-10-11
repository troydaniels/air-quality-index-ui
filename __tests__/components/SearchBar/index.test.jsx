import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import SearchBar from '../../../src/components/SearchBar';
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

describe('The SearchBar component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls getStationsByName on Search click', () => {
    const props = {
      getStationsByName: axios.get.mockImplementation(() => {
        return Promise.resolve({ data: { status: 'ok', data: {} } });
      }),
    };
    const wrapper = mount(
      <AppStateProvider>
        <SearchBar {...props} />
      </AppStateProvider>
    );

    wrapper.find('form').simulate('submit');
    expect(props.getStationsByName).toHaveBeenCalled();
  });
});

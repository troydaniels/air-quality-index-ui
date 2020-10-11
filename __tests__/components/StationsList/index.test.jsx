import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import StationsList from '../../../src/components/StationsList';
import { useAppState } from '../../../src/state';

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
jest.mock('../../../src/state');
const mockUseAppState = useAppState;

describe('The StationsList component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders "about text", prior to station selection', () => {
    mockUseAppState.mockImplementationOnce(() => ({
      searchResults: undefined,
    }));
    const wrapper = shallow(<StationsList />);
    expect(wrapper.text()).toBe(
      "Air quality information & map on screen is from the nearest air quality station to you, based on your device's IP address.Explore air quality at other locations by searching above."
    );
  });

  it('renders an "NO RESULTS FOUND", when no results were returned from search', () => {
    mockUseAppState.mockImplementationOnce(() => ({ searchResults: [] }));
    const wrapper = shallow(<StationsList />);
    expect(wrapper.text()).toBe(
      'NO RESULTS FOUNDPlease enter another city or station name and search again.'
    );
  });

  it('renders a list of buttons, when results are returned from search, with background of "bg-lightest-blue" prior to selection', () => {
    mockUseAppState.mockImplementationOnce(() => ({ searchResults: [{uid: '12345', station: { name: 'test'}}], selection: {idx: '67890'} }));
    const wrapper = shallow(<StationsList />);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').hasClass('bg-lightest-blue')).toBe(true);
  });

  it('on selection, changes background color of button to "bg-light-blue"', () => {
    mockUseAppState.mockImplementationOnce(() => ({ searchResults: [{uid: '12345', station: { name: 'test'}}], selection: {idx: '12345'} }));
    const wrapper = shallow(<StationsList />);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').hasClass('bg-light-blue')).toBe(true);
  });

  it('on selection, it calls getStationFeedByUID', () => {
    const props = {
      getStationFeedByUID: axios.get.mockImplementation(() => {
        return Promise.resolve({ data: { status: 'ok', data: {} } });
      }),
    };

    mockUseAppState.mockImplementationOnce(() => ({ searchResults: [{uid: '12345', station: { name: 'test'}}], selection: {idx: '67890'} }));
    const wrapper = shallow(<StationsList {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.getStationFeedByUID).toHaveBeenCalled();
  });
});

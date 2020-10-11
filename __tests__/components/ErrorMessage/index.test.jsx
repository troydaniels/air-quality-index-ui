import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../../../src/components/ErrorMessage';
import { useAppState } from '../../../src/state';

jest.mock('../../../src/state');
const mockUseAppState = useAppState;

describe('The ErrorMessage component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders an enhancedMessage for an "Unknown city" type error', () => {
    mockUseAppState.mockImplementationOnce(() => ({ error: 'Unknown city' }));
    const wrapper = shallow(<ErrorMessage />);
    expect(wrapper.text()).toBe(
      'The Air Quality city you have selected is unknown. Please try a different selection.'
    );
  });

  it('renders a custom message if the error type is unknown', () => {
    mockUseAppState.mockImplementationOnce(() => ({ error: 'Unknown city' }));
    const wrapper = shallow(<ErrorMessage />);
    expect(wrapper.text()).toBe(
      'The Air Quality city you have selected is unknown. Please try a different selection.'
    );
  });
});

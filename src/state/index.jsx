import React, { createContext, useContext } from 'react';
import * as R from 'ramda';
import useMap from '../hooks/useMap';
import useAQIValues from '../hooks/useAQIValues';

export const StateContext = createContext(undefined);

const AppStateProvider = ({
  error,
  setError,
  selection,
  searchTerm,
  setSelection,
  searchResults,
  setSearchTerm,
  setSearchResults,
  children,
}) => {
  // Get our AQI values for display in the StationData component
  const aqiValues = useAQIValues(selection);

  // Initialise our station map
  useMap(selection);

  const contextValue = {
    error,
    setError,
    aqiValues,
    selection,
    searchTerm,
    setSelection,
    searchResults,
    setSearchTerm,
    setSearchResults,
  };

  return (
    <StateContext.Provider value={{ ...contextValue }}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
};

const withState = (name, setName, initialState) => (Component) => {
  const factory = React.createFactory(Component);
  class WithState extends React.Component {
    state = { [name]: initialState };

    set = (value) =>
      this.state[name] !== value
        ? (this.setState({ [name]: value }), true)
        : false;

    render = () =>
      factory({ ...this.props, ...this.state, [setName]: this.set });
  }

  return WithState;
};

export default R.compose(
  withState('error', 'setError', null),
  withState('selection', 'setSelection', null),
  withState('searchResults', 'setSearchResults', null),
  withState('searchTerm', 'setSearchTerm', '')
)(AppStateProvider);

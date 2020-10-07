/* eslint-disable */
import React, { createContext, useContext } from 'react';
import * as R from 'ramda';

export const StateContext = createContext(null);

const AppStateProvider = ({
  feed,
  search,
  setFeed,
  setSearch,
  searchData,
  setSearchData,
  children,
}) => {
  const contextValue = {
    feed,
    search,
    setFeed,
    setSearch,
    searchData,
    setSearchData,
  };
  console.log(feed);
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
  withState('feed', 'setFeed', null),
  withState('search', 'setSearch', ''),
  withState('searchData', 'setSearchData', null)
)(AppStateProvider);

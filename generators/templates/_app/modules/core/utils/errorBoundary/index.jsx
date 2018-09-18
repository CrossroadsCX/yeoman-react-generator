// @flow

import React from 'react';

type Props = {
  _error: String,
};

type stateType = {
  error: any,
  info: any,
};

const initialState = {
  error: null,
  info: null,
};

export function defaultErrorComponent(props: Props) {
  return (
    <div>
      <h1>An error has occurred.</h1>
      <p>{ props._error }</p>
    </div>
  );
}

export default function errorBoundary (
  ErrorComponent: $React$Component<any> = defaultErrorComponent
) {
  return (Component: $React$Component<any>) =>
    class ErrorBoundary extends React.Component {
      constructor(props: Props) {
        super(props);
        this.state = initialState;
      }

      state: stateType;
      props: Props;

      componentDidCatch(error: any, info: any) {
        this.setState((prevState: stateType) => ({
          ...prevState,
          error,
          info,
        }));
      }

      render() {
        const propsToPass = { ...this.props };
        if (this.state.info) {
          propsToPass._info = this.state.info;
        }
        if (this.state.error) {
          propsToPass._error = this.state.error;
          return <ErrorComponent {...propsToPass} />;
        }
        return <Component {...propsToPass} />;
      }
    };
}

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
  const { _error } = props;

  return (
    <div>
      <h1>An error has occurred.</h1>
      <p>{ _error }</p>
    </div>
  );
}

export default function errorBoundary (
  ErrorComponent
) {
  return (Component) =>
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
        const {
          error,
          info,
        } = this.state;

        const propsToPass = { ...this.props };
        if (info) {
          propsToPass._info = info;
        }
        if (error) {
          propsToPass._error = error;
          return <ErrorComponent {...propsToPass} />;
        }
        return <Component {...propsToPass} />;
      }
    };
}

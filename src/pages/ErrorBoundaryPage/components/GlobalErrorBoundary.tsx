import { Component, ErrorInfo, ReactNode } from 'react';
import { ApiErrorType } from '../types/util';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  shouldHandleError: boolean;
  shouldRethrowError: boolean;
  error: ApiErrorType | null;
}

export default class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldHandleError: false,
      shouldRethrowError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: ApiErrorType): State {
    if (error instanceof Error) {
      console.log('Global here');
      return {
        shouldHandleError: true,
        shouldRethrowError: false,
        error,
      };
    }
    if (error.status >= 400) {
      return {
        shouldHandleError: true,
        shouldRethrowError: false,
        error,
      };
    }

    return {
      shouldHandleError: false,
      shouldRethrowError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {}

  initErrorBoundaryState() {
    this.setState({
      shouldHandleError: false,
      shouldRethrowError: false,
      error: null,
    });
  }

  render() {
    console.log('Global ErrorBoundary Rendering');

    if (this.state.shouldHandleError) {
      return <p>Global ErrorBoundary</p>;
    }

    return this.props.children;
  }
}

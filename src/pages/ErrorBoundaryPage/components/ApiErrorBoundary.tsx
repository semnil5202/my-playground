import { Component, ErrorInfo, ReactNode } from 'react';
import ApiError from '../../../utils/ApiError';
import RetryFetch from './RetryFetch';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

type State =
  | {
      error: null;
      errorDetail: null;
    }
  | {
      error: Error;
      errorDetail: null;
    }
  | {
      error: ApiError;
      errorDetail: 'client' | 'server' | 'unauthorized';
    };

export default class ApiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initErrorBoundaryState();
  }

  initErrorBoundaryState() {
    return {
      error: null,
      errorDetail: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    if (error instanceof ApiError) {
      if (error.status >= 500) {
        return {
          error,
          errorDetail: 'server',
        };
      }

      if (error.status >= 400) {
        return {
          error,
          errorDetail: 'client',
        };
      }
    }

    return {
      error,
      errorDetail: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (!this.state.error && !this.state.errorDetail) {
      return this.props.children;
    }

    if (this.state.errorDetail === 'client') {
      return (
        <RetryFetch
          errorCase={this.state.errorDetail}
          onClickRetry={() => this.setState(this.initErrorBoundaryState())}
        />
      );
    }

    if (this.state.errorDetail === 'server') {
      return (
        <RetryFetch
          errorCase={this.state.errorDetail}
          onClickRetry={() => this.setState(this.initErrorBoundaryState())}
        />
      );
    }

    throw new Error('unknown error');
  }
}

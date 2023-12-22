import { Component, ErrorInfo, ReactNode } from 'react';
import ApiError from '../../../utils/ApiError';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  error: null | unknown;
}

export default class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initErrorBoundaryState();
  }

  initErrorBoundaryState() {
    return {
      error: null,
    };
  }

  static getDerivedStateFromError(error: ApiError): State {
    return {
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <>
        <h2>Global ErrorBoundary Activated</h2>
        <button onClick={() => this.setState(this.initErrorBoundaryState())}>
          Retry
        </button>
      </>
    );
  }
}

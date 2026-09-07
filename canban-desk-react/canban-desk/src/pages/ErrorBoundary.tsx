import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error);
    console.error(errorInfo);
  }
  reset() {
    this.setState({
      hasError: false,
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Не удалось отобразить доску</h2>

          <p>Произошла непредвиденная ошибка</p>

          <button onClick={this.reset}>Попробовать снова</button>
        </div>
      );
    }

    return this.props.children;
  }
}

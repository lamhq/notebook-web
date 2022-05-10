import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { useAsyncData } from '../../../common/hooks';

class ErrorBoundary extends React.Component<unknown, { hasError: boolean }> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <strong>Something went wrong.</strong>;
    }

    return children;
  }
}

function getData(ms: number, msg: string): Promise<string> {
  const p = new Promise<string>((rs, rj) => {
    setTimeout(() => {
      rj(msg);
    }, ms);
  });
  return p;
}

const DataDisplayer: React.VFC = () => {
  const data = useAsyncData(getData, 2000, 'abc');
  const isLoading = typeof data === 'undefined';

  return (
    <div>
      <p>{isLoading ? 'loading...' : data}</p>
    </div>
  );
};

const TestSuspense: React.VFC = () => {
  return (
    <ErrorBoundary>
      <DataDisplayer />
    </ErrorBoundary>
  );
};

export default {
  title: 'Atoms/Suspense',
  component: TestSuspense,
} as Meta;

export const Abc = TestSuspense;

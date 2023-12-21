import ApiErrorBoundary from './components/ApiErrorBoundary';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import PostContainer from './components/PostContainer';
import { Suspense } from 'react';

export default function ErrorBoundary() {
  return (
    <div>
      ErrorBoundary 컴포넌트와 ApiErrorBoundary 컴포넌트 테스트 공간입니다.
      <GlobalErrorBoundary>
        <ApiErrorBoundary fallback={<p>error</p>}>
          <Suspense fallback={<div>loading</div>}>
            <PostContainer />
          </Suspense>
        </ApiErrorBoundary>
      </GlobalErrorBoundary>
    </div>
  );
}

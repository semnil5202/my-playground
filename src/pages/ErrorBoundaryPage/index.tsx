import ApiErrorBoundary from './components/ApiErrorBoundary';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import PostContainer from './components/PostContainer';
import { Suspense } from 'react';

const ERROR_URL = 'https://jsonplaceholder.typicode.com/postserror';
const NORMAL_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function ErrorBoundary() {
  return (
    <div>
      GlobalErrorBoundary 컴포넌트와 ApiErrorBoundary 컴포넌트 테스트
      공간입니다. 비정상 버튼은 1대1 비율로 Api Error와 Unknown Error를
      발생시킵니다.
      <GlobalErrorBoundary>
        <ApiErrorBoundary>
          <Suspense fallback={<div>loading...</div>}>
            <PostContainer url={ERROR_URL} explanation={'비정상 버튼'} />
          </Suspense>
        </ApiErrorBoundary>
        <ApiErrorBoundary>
          <Suspense fallback={<div>loading...</div>}>
            <PostContainer url={NORMAL_URL} explanation={'정상 버튼'} />
          </Suspense>
        </ApiErrorBoundary>
      </GlobalErrorBoundary>
    </div>
  );
}

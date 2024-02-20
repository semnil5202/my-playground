import { Suspense } from 'react';
import PostContainer from './components/PostContainer';

export default function MakeUseQueryPage() {
  return (
    <>
      <div>React-Query의 useQuery, useMutation을 만들어 사용해보는 공간입니다.</div>
      <Suspense fallback={<div>loading...</div>}>
        <PostContainer />
      </Suspense>
    </>
  );
}

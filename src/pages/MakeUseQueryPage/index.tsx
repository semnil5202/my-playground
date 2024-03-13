import { Suspense } from 'react';
import PostContainer from './components/PostContainer';
import HelmetComp from '../ReactHelmet/components/HelmetComp';

export default function MakeUseQueryPage() {
  return (
    <>
      <HelmetComp title="쿼리" description="쿼리 페이지" />
      <div>React-Query의 useQuery, useMutation을 만들어 사용해보는 공간입니다.</div>
      <Suspense fallback={<div>loading...</div>}>
        <PostContainer />
      </Suspense>
    </>
  );
}

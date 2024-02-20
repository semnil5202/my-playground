import { css } from '@emotion/react';
import { getPosts } from '../../../apis/httpInstance';
import useQuery from '../hooks/useQuery';

export default function PostContainer() {
  const { data: posts, refetch } = useQuery({
    queryFn: getPosts,
    disable: true,
  });

  if (!posts)
    return (
      <div>
        <h2>포스트 불러오기</h2>
        <button
          css={css`
            text-align: center;
            width: 120px;
            height: 32px;
            background-color: #e16767;
            border: 1px solid black;

            &:active {
              filter: brightness(0.9);
            }
          `}
          onClick={refetch}
        >
          불러오기
        </button>
      </div>
    );

  return (
    <>
      <h2>다시 불러오기</h2>
      <button
        css={css`
          text-align: center;
          width: 120px;
          height: 32px;
          background-color: #e16767;
          border: 1px solid black;

          &:active {
            filter: brightness(0.9);
          }
        `}
        onClick={refetch}
      >
        처음으로
      </button>
      <section>
        {posts.data.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))}
      </section>
    </>
  );
}

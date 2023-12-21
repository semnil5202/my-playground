import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Posts } from '../types/util';
import customFetch from '../../../apis/customFetch';

export default function PostContainer() {
  const [posts, setPosts] = useState<Posts[] | null>(null);
  const [isError, setIsError] = useState<Error | null>(null);

  const onClickGetPosts = async () => {
    try {
      const postsData = await customFetch.get<Posts[]>(
        'https://jsonplaceholder.typicode.com/pos1ts',
        { abort: true }
      );
      setPosts(postsData);
    } catch (e) {
      setIsError(new Error('error'));
    }
  };

  if (isError) throw isError;

  if (!posts)
    return (
      <div>
        <h2>click button!</h2>
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
          onClick={onClickGetPosts}
        >
          불러오기
        </button>
      </div>
    );

  if (posts.length === 0) return <div>temp</div>;

  return (
    <section>
      <h2>click button!</h2>
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
        onClick={() => setPosts(null)}
      >
        처음으로
      </button>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </section>
  );
}

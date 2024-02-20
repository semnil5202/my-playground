import { css } from '@emotion/react';
import { useState } from 'react';
import { Posts } from '../../../types';
import ApiError from '../../../utils/ApiError';
import customFetch from '../../../apis/fetch/customFetch';

type StatusType = null | Promise<void> | ApiError;

export default function PostContainer({ url, explanation }: { url: string; explanation: string }) {
  const [posts, setPosts] = useState<Posts[] | null>(null);
  const [status, setStatus] = useState<StatusType>(null);

  const onClickGetPosts = async () => {
    try {
      setStatus(
        new Promise((resolve) => {
          resolve();
        })
      );

      const postsData = await customFetch.get<Posts[]>(url, {
        abort: true,
      });

      setStatus(null);
      setPosts(postsData);
    } catch (e) {
      const error = e as ApiError;
      setStatus(error);
    }
  };

  if (status instanceof Promise) throw status;
  if (status && status instanceof ApiError)
    throw Math.random() > 0.5 ? status : new Error('unknown Error');

  if (!posts)
    return (
      <div>
        <h2>{explanation}</h2>
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
    <>
      <h2>{explanation}</h2>
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
      <section>
        {posts.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))}
      </section>
    </>
  );
}

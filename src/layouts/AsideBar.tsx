import { Link } from 'react-router-dom';
import router from '../router';
import { css } from '@emotion/react';

export default function AsideBar() {
  return (
    <aside
      css={css`
        width: 320px;
        height: 100%;
        margin-right: 12px;
        background-color: aliceblue;
      `}
    >
      <ul>
        {router.routes[0].children?.map((route, idx) => (
          <li key={`${route.path}-${idx}`}>
            <Link
              css={css`
                display: flex;
                align-items: center;
                max-width: 100%;
                height: 24px;
                padding: 8px;
                border-bottom: 1px solid black;
                cursor: pointer;

                &:hover {
                  background-color: #c2e2ff;
                }
              `}
              to={route.path || '/'}
            >
              {route.path || 'home'}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

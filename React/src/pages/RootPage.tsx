import { Outlet } from 'react-router-dom';
import AsideBar from '../layouts/AsideBar';
import { css } from '@emotion/react';

export default function RootPage() {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
      `}
    >
      <AsideBar />
      <Outlet />
    </div>
  );
}

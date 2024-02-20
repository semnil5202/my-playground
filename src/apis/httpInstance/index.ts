import { Posts } from '../../pages/ErrorBoundaryPage/types';
import Http from './http';

const http = new Http();

export const getPosts = () => {
  return http.get<Posts[]>('https://jsonplaceholder.typicode.com/posts');
};

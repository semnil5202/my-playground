import { Posts } from '../../types';
import { http } from './http';

export const getPosts = () => {
  return http.get<Posts[]>('https://jsonplaceholder.typicode.com/posts');
};

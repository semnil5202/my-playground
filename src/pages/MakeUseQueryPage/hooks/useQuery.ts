import { useEffect, useState } from 'react';

interface Props<T> {
  queryFn: () => Promise<T>;
  disable?: boolean;
}

const promise = new Promise<void>((resolve) => resolve());

const useQuery = <T = unknown, U = unknown>({ queryFn, disable }: Props<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Promise<void> | U | null>(null);

  const refetch = async () => {
    try {
      setStatus(promise);
      const response = await queryFn();
      setData(response);
    } catch (e) {
      setStatus(e as U);
    } finally {
      setStatus(null);
    }
  };

  useEffect(() => {
    if (disable) return;

    refetch();
  }, []);

  if (status) throw status;

  return { data, refetch };
};

export default useQuery;

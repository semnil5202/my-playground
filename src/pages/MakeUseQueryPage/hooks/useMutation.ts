import { useState } from 'react';

interface Props {
  mutationFn: (payload: any) => any;
  onSuccess?: (response: any) => void | Promise<void>;
  onError?: (error: any) => void;
}

const promise = new Promise<void>((resolve) => resolve());

const useMutation = ({ mutationFn, onSuccess, onError }: Props) => {
  const [status, setStatus] = useState<Promise<void> | unknown | null>(null);

  const mutate = async (payload: any) => {
    try {
      setStatus(promise);
      const response = await mutationFn(payload);
      onSuccess && onSuccess(response);
      return response;
    } catch (e) {
      setStatus(e);
      onError && onError(e);
    }
  };

  if (status) throw status;

  return { mutate };
};

export default useMutation;

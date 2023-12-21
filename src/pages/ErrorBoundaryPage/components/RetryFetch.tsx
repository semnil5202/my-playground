interface Props {
  onClickRetry: () => void;
}

export default function RetryFetch({ onClickRetry }: Props) {
  return (
    <>
      <h3>잠시 후 다시 시도해주세요.</h3>
      <p>데이터를 가져오는데 실패했습니다.</p>
      <button onClick={onClickRetry}>다시 시도</button>
    </>
  );
}

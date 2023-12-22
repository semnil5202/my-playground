import { useNavigate } from 'react-router-dom';

export default function GlobalErrorPage() {
  const navigator = useNavigate();

  return (
    <div>
      <h2>잘못된 URL 주소입니다.</h2>
      <p>입력하신 URL은 유효하지 않습니다. 홈으로 돌아가시겠습니까?</p>
      <button onClick={() => navigator('/')}>홈으로 가기</button>
    </div>
  );
}

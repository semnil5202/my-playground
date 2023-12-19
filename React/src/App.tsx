import { useState } from 'react';

const App = () => {
  const [greeting, setGreeting] = useState<string>('hello');

  return <div>{greeting}</div>;
};

export default App;

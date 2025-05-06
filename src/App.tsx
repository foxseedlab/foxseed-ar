import { useCallback, useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('');

  const handleClick = useCallback(() => {
    fetch('/foo')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <main>
      <h1 className="mb-4 text-4xl font-bold">Coming soon...</h1>
      <button
        className="px-4 py-1 text-green-900 font-bold bg-[#badcad] rounded-md"
        type="button"
        onClick={handleClick}
      >
        テスト
      </button>
      <p>{message}</p>

      <small>©️ 2025 ふぉくしーど</small>
    </main>
  );
}

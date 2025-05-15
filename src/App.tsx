import { useState } from 'react';
import AR from './AR';

function App() {
  const [started, setStarted] = useState<'three' | null>(null);

  return (
    <div className="w-full h-full text-center">
      <header className="w-full h-[5rem] bg-yellow-100">
        <h1>
          Example React component with{' '}
          <a
            href="https://github.com/hiukim/mind-ar-js"
            target="_blank"
            rel="noreferrer"
          >
            MindAR
          </a>
        </h1>

        <div className="relative z-[1000]">
          {started === null && (
            <button
              type="button"
              onClick={() => {
                setStarted('three');
              }}
              className="bg-cyan-700 text-white font-bold px-4 py-2 rounded-md"
            >
              Start ThreeJS version
            </button>
          )}
          {started !== null && (
            <button
              type="button"
              onClick={() => {
                setStarted(null);
              }}
              className="bg-red-700 text-white font-bold px-4 py-2 rounded-md"
            >
              Stop
            </button>
          )}
        </div>
      </header>

      <main className="w-full h-[calc(100%-5rem)]">
        {started === 'three' && (
          <div className="relative mx-auto w-full h-full overflow-hidden">
            <AR />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

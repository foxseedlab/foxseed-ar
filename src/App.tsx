import { useState } from 'react';
import AR from './AR';
import AR2 from './AR2';
function App() {
  const [started, setStarted] = useState<'three' | null>(null);
  const [markerNo, setMarkerNo] = useState<number>(1);

  const handleStop = () => {
    setStarted(null);
    // mindar-ui-overlay要素を全て削除
    const overlays = document.querySelectorAll('.mindar-ui-overlay');
    for (const element of overlays) {
      element.remove();
    }
  };

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

        <div className="relative z-[1000] flex items-center justify-center gap-4">
          {started === null && (
            <>
              <select
                value={markerNo}
                onChange={(e) => setMarkerNo(Number(e.target.value))}
                className="bg-white border border-gray-300 rounded-md px-2 py-1"
              >
                {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    Marker {num}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  setStarted('three');
                }}
                className="bg-cyan-700 text-white font-bold px-4 py-2 rounded-md"
              >
                Start ThreeJS version
              </button>
            </>
          )}
          {started !== null && (
            <button
              type="button"
              onClick={handleStop}
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
            {/* <AR markerNo={markerNo} /> */}
            <AR2 markerNo={markerNo} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

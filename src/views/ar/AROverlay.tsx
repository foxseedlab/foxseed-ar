type Props = {
  isLoading: boolean;
  isScanning: boolean;
  error: string | null;
  isMarkerFound: boolean;
  isTouching: boolean;
};

export default function AROverlay({
  isLoading,
  isScanning,
  error,
  isMarkerFound,
  isTouching,
}: Props) {
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '20px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          読み込み中...
        </div>
      )}
      {isScanning && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '20px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          マーカーをスキャン中...
        </div>
      )}
      {error && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            color: 'white',
            padding: '20px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          エラー: {error}
        </div>
      )}
      {isMarkerFound && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          マーカーが反応しました
        </div>
      )}
      {isTouching && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '1.2em',
            fontWeight: 'bold',
            zIndex: 1000,
            animation: 'fadeInOut 0.5s ease-in-out',
          }}
        >
          タッチされました！
        </div>
      )}
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
          }
        `}
      </style>
    </>
  );
}

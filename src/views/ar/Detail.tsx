import type { ReactNode } from 'react';
import { useEffect, useState, useRef } from 'react';

type Props = {
  isLoading: boolean;
  isScanning: boolean;
  isMarkerFound: boolean;
  isTouching: boolean;
};

export default function Detail({
  isLoading,
  isScanning,
  isMarkerFound,
  isTouching,
}: Props) {
  let card: ReactNode;

  if (isLoading) {
    card = <SearchingCard />;
  } else if (isScanning) {
    card = <SearchingCard />;
  } else if (isMarkerFound) {
    card = <FoundCard isTouching={isTouching} />;
  }

  return (
    <div className="w-full fixed bottom-4 z-1000">
      <div className="w-full h-full flex items-center justify-center">
        <main className="p-6 w-[calc(100%-2rem)] h-48 text-white font-bold rounded-tl-2xl rounded-br-2xl bg-black/30 backdrop-blur-lg border-2 border-white/20">
          {card}
        </main>
      </div>
    </div>
  );
}

function SearchingCard() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-black">
        ふぉくしーどカードの
        <br />
        表面を映してください
      </h2>
      <div className="mt-8 text-white/75">
        カードから20cmほど離してスマホを動かしてください
      </div>
    </div>
  );
}

function FoundCard({ isTouching }: { isTouching: boolean }) {
  const initialMessage = 'やったー！！';
  const [message, setMessage] = useState(initialMessage);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const prevMessageRef = useRef(initialMessage);

  const hasTouchedRef = useRef(false);

  useEffect(() => {
    if (!isFirstMessage) return;
    const timer = setTimeout(() => {
      setMessage((prev) => `${prev}\nわざわざ見に来てくれてありがとうね！`);
      setIsFirstMessage(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isFirstMessage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isTouching) return;

    // タッチフラグを立てる
    hasTouchedRef.current = true;
    // 切り替え前のメッセージを保存
    prevMessageRef.current = message;

    setMessage('くすぐったいよー');
  }, [isTouching]);

  useEffect(() => {
    if (isTouching || !hasTouchedRef.current) return;

    const timer = setTimeout(() => {
      setMessage(prevMessageRef.current);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isTouching]);

  return (
    <div>
      <h2 className="-mt-4 -ml-4">
        <span className="px-4 py-1 w-auto text-green-950 font-bold bg-[#badcad] rounded-xl">
          ふぉくしーど
        </span>
      </h2>
      <div className="mt-4 whitespace-pre-line">{message}</div>
    </div>
  );
}

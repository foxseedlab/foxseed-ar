import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { TypingEffect } from '../../components/TypingEffect';

type Props = {
  isLoading: boolean;
  isScanning: boolean;
  isMarkerFound: boolean;
  isTouching: boolean;
};

const initialMessage = 'やったー！！';
const initialAppendMessage = 'わざわざ見に来てくれてありがとうね！';
const appendMessages = [
  'やあ！見に来てくれて助かります。人見知りだから自分から話しかけるの苦手なんだよね。',
  'お腹ぺこぺこだよ〜おやつちょうだい！特にシュークリームがあると嬉しいな…',
  'もっとふわふわ撫でてほしいな〜恥ずかしいけど我慢できない！',
  'ねむねむ…お昼寝タイム？一緒におねんねしよう・・・！',
  'くすぐりはやめてｗｗｗ後で覚えておいてよｗｗｗ',
  'きょうはいい風が吹いてるね。葉っぱが踊っているみたい！',
  '僕の尻尾、触ってみて！ふわふわで幸せ気分になれるよ！',
  'この世界、キラキラしててすごいね。君と見るともっとキラキラ！',
  '実は僕、ハンバーガーも好きなんだ！いつかアメリカでアメリカンなハンバーガーも食べてみたい！',
  'ずっと君のこと見守ってるよ。緊張しちゃうけど、そばにいたいんだ！',
  '褒められるとアウトプットよくなるタイプ。単純って言わないで！',
  'たまには木の上でひなたぼっこしよう？ぽかぽか気持ちいいよ。',
  'ふぉくしーどパワー、解放！元気全開で行こう！',
  '短く「ふぉく」って呼んでもらえると嬉しいな！',
  '今日も一日お疲れさま！ゆっくり休んでね！',
  'ここだけの話、魔法を使えるんだ。信じてくれる？',
  'また遊びに来てくれる？待ってるよ…ドキドキしちゃうけど',
  '新しい葉っぱ、見つけたんだ！一緒に集めに行こう？',
  '寝相はわるい。隣で寝てた人が朝になると床にいたことあるんよね。2,3回くらいはあった。',
  '今日はどこに連れてってくれるの？わくわくしちゃう！',
  '一緒にかくれんぼしようよ！見つけたらぎゅーってしてね',
  'おなかもちもちなケモノが好き。かわいいは正義だあ！',
  'あまり知られていないかもだけど、僕はイヌじゃなくてキツネなんだ。',
  '人見知りだけど、本当はおしゃべり大好きなんだ…一歩ずつ慣れていこうね。',
  '僕が落ち込んでるときは放っておいてほしい・・・。時間経つと勝手に戻ります。',
  'もっと着ぐるみと交流してみたいなぁ…',
  '6時間は寝ないとスペック出ない。おねんねは大事！',
  '作業通話は好き。でも考える系のタスクは一人でじっくりやりたい派かなあ。',
  '気軽に接してくれるのがいちばん嬉しい。構えないでほしい！',
];

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
      <div className="-mt-3 flex flex-row items-center justify-center gap-6">
        <img
          src="/compatibility-surface-guide.svg"
          alt="ふぉくしーどカード"
          className="w-30"
        />
        <div className="mt-3 text-left">
          ふぉくしーどカードの表面を映してください。
        </div>
      </div>
      <div className="mt-5 text-white/75">
        カードから20cmほど離して
        <br />
        スマホを動かしてください
      </div>
    </div>
  );
}

function FoundCard({ isTouching }: { isTouching: boolean }) {
  const [message, setMessage] = useState(initialMessage);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const hasTouchedRef = useRef(false);

  useEffect(() => {
    if (!isFirstMessage) return;
    const timer = setTimeout(() => {
      setMessage(initialAppendMessage);
      setIsFirstMessage(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isFirstMessage]);

  useEffect(() => {
    if (!isTouching) return;

    hasTouchedRef.current = true;
    setMessage('くすぐったいよー');
  }, [isTouching]);

  useEffect(() => {
    if (isTouching || !hasTouchedRef.current) return;

    const timer = setTimeout(() => {
      const randomMessage =
        appendMessages[Math.floor(Math.random() * appendMessages.length)];
      setMessage(randomMessage);
    }, 500);

    return () => clearTimeout(timer);
  }, [isTouching]);

  return (
    <div>
      <h2 className="-mt-4 -ml-4">
        <span className="px-4 py-1 w-auto text-green-950 font-bold bg-foxseed-bg rounded-lg">
          ふぉくしーど
        </span>
      </h2>
      <div className="mt-4 whitespace-pre-line">
        <style>
          {`
            @keyframes bounce {
              0% { transform: translateY(0) rotate(0deg); }
              25% { transform: translateY(-8px) rotate(-3deg); }
              50% { transform: translateY(0) rotate(3deg); }
              75% { transform: translateY(-12px) rotate(2deg); }
              100% { transform: translateY(0) rotate(0deg); }
            }
            .bounce-text {
              display: inline-block;
              animation: bounce 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
              transform-origin: center bottom;
            }
          `}
        </style>
        <TypingEffect
          text={message}
          duration={0.1}
          delay={0.05}
          className={
            message === 'くすぐったいよー' ? 'text-lg bounce-text' : 'text-lg'
          }
        />
      </div>
    </div>
  );
}

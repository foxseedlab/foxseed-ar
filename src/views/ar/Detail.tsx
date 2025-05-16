import type { ReactNode } from 'react';
import { useEffect, useState, useRef } from 'react';
import { TypingEffect } from '../../components/TypingEffect';

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

  const initialAppendMessage = 'わざわざ見に来てくれてありがとうね！';

  const appendMessages = [
    'やあ！今日はどんな冒険が待ってるかな？',
    'お腹ぺこぺこだよ〜おやつちょうだい！特にシュークリームがあると嬉しいな…',
    'もっとふわふわ撫でてほしいな〜恥ずかしいけど我慢できない！',
    'ねむねむ…お昼寝タイム？一緒にゴロンしよう？',
    'くすぐったいよ〜本当にやめてほしいくらい！',
    'きょうはいい風が吹いてるね。葉っぱがダンスしてるみたい！',
    'いっしょにお散歩しようよ！でもちょっと人見知りだからゆっくりでいい？',
    'ふぉくしーどの尻尾、触ってみて！ふわふわで幸せ気分になれるよ！',
    'この世界、キラキラしててすごいね。君と見るともっとキラキラ！',
    'あのね、秘密の宝物があるんだ…恥ずかしいけど教えちゃう！',
    '実は甘いものに目がないんだ。特にシュークリームは別格だよ！',
    'ずっと君のこと見守ってるよ。緊張しちゃうけど、そばにいたいんだ',
    'たまには木の上でひなたぼっこしよう？ぽかぽか気持ちいいよ',
    '君の笑顔、最高にかわいいよ！ぼく、照れちゃう…',
    'ふぉくしーどパワー、解放！元気全開で行こう！',
    'ここだけの話、魔法を使えるんだ。信じてくれる？',
    '星空の下でお話ししよう？静かな夜は心がほっとするね',
    'また遊びに来てくれる？待ってるよ…ドキドキしちゃうけど',
    'ねえ、名前呼んでみて？恥ずかしくて耳まで真っ赤かも…',
    '新しい葉っぱ、見つけたんだ！一緒に集めに行こう？',
    'こっそりお手紙書いてみたよ。読んでくれるかな…',
    '今日はどこに連れてってくれるの？わくわくしちゃう！',
    '一緒にかくれんぼしようよ！見つけたらぎゅーってしてね',
    'ふぉくしーどの秘密基地へようこそ！ちょっと狭いけど特別なんだ',
    'あまり知られていないかもだけど、僕はイヌじゃなくてキツネなんだ',
    '人見知りだけど、本当はおしゃべり大好きなんだ…一歩ずつ慣れていこうね',
    '満月の夜はちょっぴり特別なんだ。お願い、一緒に見てほしい',
    'もっと一緒にいたいなぁ…そばにいると安心するんだよ',
    'もっと着ぐるみと交流してみたいなぁ…',
  ];

  useEffect(() => {
    if (!isFirstMessage) return;
    const timer = setTimeout(() => {
      setMessage(initialAppendMessage);
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
      const randomMessage =
        appendMessages[Math.floor(Math.random() * appendMessages.length)];
      setMessage(randomMessage);
    }, 500);

    return () => clearTimeout(timer);
  }, [isTouching]);

  return (
    <div>
      <h2 className="-mt-4 -ml-4">
        <span className="px-4 py-1 w-auto text-green-950 font-bold bg-[#badcad] rounded-xl">
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

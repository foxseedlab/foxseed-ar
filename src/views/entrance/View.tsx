type Props = {
  guestName: string;
  setGuestName: (name: string) => void;
  goAR: () => void;
};

export default function View({ guestName, setGuestName, goAR }: Props) {
  return (
    <main className="h-full flex flex-col items-center relative">
      <div className="-mt-[185dvw] w-[250dvw] h-[250dvw] rounded-full bg-[#badcad] flex flex-col justify-end overflow-hidden">
        <img
          src="/jumpout-foxseed.webp"
          alt="logo"
          className="w-[80dvw] mx-auto select-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      <div className="px-6 mt-8 w-full text-center">
        <h1 className="pb-4 mb-2 text-4xl text-green-950 font-black">
          ふぉくしーどAR
        </h1>

        <div className="w-full flex items-center gap-2">
          <h2 className="mt-1 pr-2 text-lg font-bold whitespace-nowrap">
            名前
          </h2>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="p-2 w-full text-2xl text-center font-bold border-2 border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent
              transition-all duration-200 ease-in-out
              hover:border-lime-400
              placeholder:text-gray-300"
            placeholder="ふぉくしーど"
            aria-label="お名前を入力してください"
            aria-required="true"
          />
        </div>
        <p className="mb-4 text-neutral-500">
          ARコンテンツ上にお名前が表示されます！
        </p>

        <button
          type="button"
          onClick={goAR}
          className={`w-full p-2 text-white font-bold rounded-md transition-all duration-300 ease-in-out
            ${
              guestName === ''
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-lime-600 hover:bg-lime-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
            }`}
          disabled={guestName === ''}
          aria-label="ARの世界へ移動する"
        >
          <div className="text-2xl font-black">ARの世界に行く</div>
          <div className="text-sm text-white/80">
            上のふぉくしーどが描かれたカードが必要です
          </div>
        </button>
      </div>

      <div className="w-full h-24 text-gray-400 border-t-2 border-gray-300 absolute bottom-0 flex flex-col items-center justify-center">
        <div className="mb-2 w-full text-xl flex flex-row items-center justify-center gap-2">
          <a
            href="https://x.com/XXX"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            X
          </a>
          <span className="text-gray-300">/</span>
          <a
            href="https://github.com/XXX"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            ソースコード
          </a>
        </div>

        <small className="text-base">© 2025 ふぉくしーど</small>
      </div>
    </main>
  );
}

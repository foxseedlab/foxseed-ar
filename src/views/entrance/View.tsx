import { EntranceSocialLogos } from '../../components/EntranceSocialLogos';

type Props = {
  guestName: string;
  setGuestName: (name: string) => void;
  goAR: () => void;
};

export default function View({ guestName, setGuestName, goAR }: Props) {
  return (
    <main className="flex flex-col items-center relative">
      <div className="-mt-210 w-280 h-280 rounded-full bg-foxseed-bg flex flex-col justify-end overflow-hidden">
        <img
          src="/jumpout-foxseed.webp"
          alt="logo"
          className="w-80 mx-auto select-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      <div className="px-4 mt-8 max-w-[500px] w-full text-center">
        <h1 className="mb-4 text-4xl text-foxseed-900 font-bold">
          ふぉくしーど
        </h1>

        <EntranceSocialLogos />

        <section className="mt-12 border-2 border-gray-300 rounded-xl">
          <div className="py-1 bg-foxseed-50 rounded-t-xl">
            <h2 className="text-lg text-gray-500 font-bold">
              ふぉくしーど
              <span className="ml-0.5 bg-linear-to-r from-foxseed-500 to-foxseed-400 bg-clip-text text-transparent">
                AR
              </span>
            </h2>
            <div className="text-xs text-gray-500">
              僕から名刺をもらった方は試してみてください！
            </div>
          </div>
          <hr className="border-t-2 border-dashed border-gray-300" />

          <div className="p-4 pt-10">
            <div className="w-full flex items-center gap-2">
              <div className="mt-1 pr-2 text-gray-500 font-bold whitespace-nowrap">
                ハンドルネーム
              </div>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="p-2 w-full text-2xl text-center text-gray-700 font-bold border-2 border-gray-300 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-foxseed-500 focus:border-transparent
                  transition-all duration-200 ease-in-out
                  hover:border-foxseed-400
                  placeholder:text-gray-300"
                placeholder="ふぉくしーど"
                aria-label="お名前を入力してください"
                aria-required="true"
              />
            </div>
            <p className="mt-1 mb-10 text-gray-500 text-sm">
              ARコンテンツ上にお名前が表示されます！
            </p>

            <button
              type="button"
              onClick={goAR}
              className={`w-full p-2 text-white font-bold rounded-md cursor-pointer transition-all duration-300 ease-in-out
                ${
                  guestName === ''
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-foxseed-500 hover:bg-foxseed-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                }`}
              disabled={guestName === ''}
              aria-label="ARの世界へ移動する"
            >
              <div className="text-2xl font-bold tracking-wide">
                ARの世界に行く
              </div>
              <div className="text-sm text-white/80">
                上のふぉくしーどが描かれたカードが必要です
              </div>
            </button>
          </div>
        </section>

        <a
          href="https://github.com/foxseedlab/foxseed-ar"
          target="_blank"
          rel="noopener noreferrer"
          className="px-1 mt-4 mb-12 text-sm text-gray-500 hover:text-gray-700 border-b border-gray-400 inline-block"
        >
          ソースコードはこちらから（GitHub）
        </a>
      </div>
    </main>
  );
}

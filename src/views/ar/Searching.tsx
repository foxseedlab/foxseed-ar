export default function Searching() {
  return (
    <div className="w-full fixed top-6 z-1000">
      <div className="w-full h-full flex items-center justify-center">
        <nav className="outline-animate px-8 py-2 text-xl text-white font-bold rounded-full bg-black/50 relative">
          ふぉくしーどを探しています...
          <style>
            {`
              .outline-animate {
                outline-width: 1px;
                outline-offset: 0;
                outline-color: rgba(34, 197, 94, 0.75);
                outline-style: solid;
                animation: animateOutline 4s ease infinite;
              }

              @keyframes animateOutline {
                0% {
                  outline-width: 1px;
                  outline-offset: 0;
                  outline-color: rgba(34, 197, 94, 0);
                }

                10% {
                  outline-color: rgba(34, 197, 94, 0.75);
                }

                50% {
                  outline-width: 7px;
                  outline-offset: 4px;
                  outline-color: rgba(34, 197, 94, 0);
                }

                100% {
                  outline-width: 7px;
                  outline-offset: 4px;
                  outline-color: rgba(34, 197, 94, 0);
                }
              }
            `}
          </style>
        </nav>
      </div>
    </div>
  );
}

type Props = {
  guestName: string;
  setGuestName: (name: string) => void;
  goAR: () => void;
};

export default function View({ guestName, setGuestName, goAR }: Props) {
  return (
    <main>
      <input
        type="text"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        className="w-full p-2 border-2 border-gray-300 rounded-md"
      />
      <button
        type="button"
        onClick={goAR}
        className="w-full p-2 bg-cyan-700 text-white font-bold rounded-md"
      >
        Go AR
      </button>
    </main>
  );
}

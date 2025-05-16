import { useState, useEffect } from 'react';
import EntranceView from './views/entrance/View';
import ARView from './views/ar/View';
import { sendEnterLog } from './log/log';

const storageKeyGuestName = 'guest_name';

export default function Router() {
  const [view, setView] = useState<'entrance' | 'ar'>('entrance');
  const [guestName, setGuestName] = useState(() => {
    return localStorage.getItem(storageKeyGuestName) || '';
  });

  useEffect(() => {
    if (guestName) {
      localStorage.setItem(storageKeyGuestName, guestName);
    }
  }, [guestName]);

  const goEntrance = () => {
    setView('entrance');
    removeAROverlay();
  };

  const goAR = () => {
    setView('ar');
    sendEnterLog(
      guestName,
      window.innerWidth,
      window.innerHeight,
      navigator.userAgent,
    );
  };

  if (view === 'entrance') {
    return (
      <EntranceView
        guestName={guestName}
        setGuestName={setGuestName}
        goAR={goAR}
      />
    );
  }

  return <ARView guestName={guestName} goEntrance={goEntrance} />;
}

function removeAROverlay() {
  const overlays = document.querySelectorAll('.mindar-ui-overlay');
  for (const element of overlays) {
    element.remove();
  }
}

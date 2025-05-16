import { useEffect } from 'react';
import { sendCharacterClickLog, sendMarkerFoundLog } from '../../log/log';

const markerId = 'foxseed-card';
const contentId = 'jumpout-foxseed';

export default function useLog(
  isMarkerFound: boolean,
  isTouching: boolean,
  guestName: string,
) {
  useEffect(() => {
    if (isMarkerFound) {
      sendMarkerFoundLog(
        guestName,
        markerId,
        window.innerWidth,
        window.innerHeight,
        navigator.userAgent,
      );
    }
  }, [isMarkerFound, guestName]);

  useEffect(() => {
    if (!isTouching) return;

    sendCharacterClickLog(
      guestName,
      contentId,
      window.innerWidth,
      window.innerHeight,
      navigator.userAgent,
    );
  }, [isTouching, guestName]);
}

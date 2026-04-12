import { useEffect } from 'react';
import Detail from './Detail';
import Searching from './Searching';
import useARSetup from './useARSetup';
import useImageSetup from './useImageSetup';
import useLog from './useLog';
import useTextSetup from './useTextSetup';

type Props = {
  guestName: string;
  goEntrance: () => void;
};

const message = 'こんにちは！';

export default function View({ guestName }: Props) {
  const {
    containerRef,
    mindarThreeRef,
    isMarkerFound,
    setIsMarkerFound,
    isLoading,
    isScanning,
    setIsScanning,
  } = useARSetup();

  const { setupText, showText, hideText } = useTextSetup(guestName, message);
  const { isTouching, setupImage, showImage, hideImage, handleTouch } =
    useImageSetup();

  useLog(isMarkerFound, isTouching, guestName);

  // biome-ignore lint/correctness/useExhaustiveDependencies: MindAR scene and anchors are initialized once for the active session.
  useEffect(() => {
    if (!mindarThreeRef.current) return;

    const { renderer, scene, camera } = mindarThreeRef.current;
    const anchor = mindarThreeRef.current.addAnchor(0);

    setupText(anchor);
    setupImage(anchor, renderer, scene, camera);

    anchor.onTargetFound = () => {
      setIsMarkerFound(true);
      setIsScanning(false);
      showImage();
      setTimeout(showText, 1000);
    };

    anchor.onTargetLost = () => {
      setIsMarkerFound(false);
      setIsScanning(true);
      hideText();
      hideImage();
    };

    const onTouchStart = (event: TouchEvent) => {
      handleTouch(event, camera);
    };

    window.addEventListener('touchstart', onTouchStart);

    return () => {
      anchor.onTargetFound = null;
      anchor.onTargetLost = null;
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, [guestName]);

  return (
    <>
      <div style={{ width: '100%', height: '100%' }} ref={containerRef} />
      {isScanning && <Searching />}
      <Detail
        isLoading={isLoading}
        isScanning={isScanning}
        isMarkerFound={isMarkerFound}
        isTouching={isTouching}
      />
    </>
  );
}

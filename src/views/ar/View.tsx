import { useEffect } from 'react';
import useARSetup from './useARSetup';
import useTextSetup from './useTextSetup';
import useImageSetup from './useImageSetup';
import AROverlay from './AROverlay';
import Searching from './Searching';
import Detail from './Detail';

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
    error,
    setIsScanning,
  } = useARSetup();

  const { setupText, showText, hideText } = useTextSetup(guestName, message);
  const { isTouching, setupImage, showImage, hideImage, handleTouch } =
    useImageSetup();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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

    window.addEventListener('touchstart', (event) =>
      handleTouch(event, camera),
    );

    return () => {
      window.removeEventListener('touchstart', (event) =>
        handleTouch(event, camera),
      );
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
      {/* <AROverlay
        isLoading={isLoading}
        isScanning={isScanning}
        error={error}
        isMarkerFound={isMarkerFound}
        isTouching={isTouching}
      /> */}
    </>
  );
}

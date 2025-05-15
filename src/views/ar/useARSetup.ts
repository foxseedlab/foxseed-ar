import { useEffect, useRef, useState } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const markerPath = '/foxseed-card.mind';

export default function useARSetup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mindarThreeRef = useRef<MindARThree | null>(null);
  const [isMarkerFound, setIsMarkerFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mindarThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: markerPath,
      filterMinCF: 0.1,
      filterBeta: 0.1,
      warmupTolerance: 5,
      missTolerance: 5,
      userDeviceId: null,
      environmentDeviceId: null,
      uiLoading: 'no',
      uiScanning: 'no',
      uiError: 'no',
    });

    mindarThreeRef.current = mindarThree;

    mindarThree.onLoading = () => {
      setIsLoading(true);
      setIsScanning(false);
      setError(null);
    };

    mindarThree.onScanning = () => {
      setIsLoading(false);
      setIsScanning(true);
      setError(null);
    };

    mindarThree.onError = (error: Error) => {
      setIsLoading(false);
      setIsScanning(false);
      setError(error.message);
    };

    const { renderer, scene, camera } = mindarThree;
    const anchor = mindarThree.addAnchor(0);

    // ライトの追加
    const mainLight = new THREE.DirectionalLight(0xffffff, 3.5);
    mainLight.position.set(0.5, 0.8, 0.5);
    anchor.group.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 2.0);
    fillLight.position.set(-0.5, 0.3, -0.5);
    anchor.group.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    anchor.group.add(ambientLight);

    mindarThree
      .start()
      .then(() => {
        setIsLoading(false);
        setIsScanning(true);
      })
      .catch((error) => {
        setError(error.message);
      });

    renderer.setAnimationLoop(() => {
      TWEEN.update();
      renderer.render(scene, camera);
    });

    return () => {
      if (mindarThreeRef.current) {
        renderer.setAnimationLoop(null);
        try {
          if (mindarThreeRef.current.video?.srcObject) {
            const tracks = (
              mindarThreeRef.current.video.srcObject as MediaStream
            ).getTracks();
            for (const track of tracks) {
              track.stop();
            }
          }

          if (mindarThreeRef.current.controller) {
            mindarThreeRef.current.stop();
          }
        } catch (error) {
          console.warn('Error stopping MindAR:', error);
        }
        mindarThreeRef.current = null;
      }
    };
  }, []);

  return {
    containerRef,
    mindarThreeRef,
    isMarkerFound,
    setIsMarkerFound,
    isLoading,
    isScanning,
    setIsScanning,
    error,
  };
}

import * as TWEEN from '@tweenjs/tween.js';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const markerPath = '/foxseed-card.mind';

function stopMediaTracks(stream: MediaStream | null | undefined) {
  if (!stream) return;

  for (const track of stream.getTracks()) {
    track.stop();
  }
}

function cleanupMindAR(
  mindarThree: MindARThree | null,
  renderer: THREE.WebGLRenderer,
) {
  renderer.setAnimationLoop(null);

  if (!mindarThree) return;

  try {
    stopMediaTracks(
      mindarThree.video?.srcObject as MediaStream | null | undefined,
    );

    if (mindarThree.controller) {
      mindarThree.stop();
    }
  } catch (error) {
    console.warn('Error stopping MindAR:', error);
  }
}

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
      cleanupMindAR(mindarThreeRef.current, renderer);
      mindarThreeRef.current = null;
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

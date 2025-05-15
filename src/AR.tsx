import { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

export default function AR() {
  const containerRef = useRef(null);
  const mindarThreeRef = useRef<MindARThree | null>(null);

  useEffect(() => {
    const mindarThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: '/foxseed-card.mind',
    });
    mindarThreeRef.current = mindarThree;

    const { renderer, scene, camera } = mindarThree;
    const anchor = mindarThree.addAnchor(0);
    const geometry = new THREE.PlaneGeometry(1, 0.55);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });
    const plane = new THREE.Mesh(geometry, material);
    anchor.group.add(plane);

    // THREE.WebGLRendererの警告に対応
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // レンダラーのピクセル比を最適化
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // カメラの解像度設定
    const constraints = {
      audio: false,
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        frameRate: { ideal: 30, max: 60 },
      },
    };

    // カメラの初期化
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // MindARの初期化を待ってからvideo要素を設定
        return mindarThree.start().then(() => {
          if (mindarThree.video) {
            mindarThree.video.srcObject = stream;
            renderer.setAnimationLoop(() => {
              renderer.render(scene, camera);
            });
          } else {
            throw new Error('Video element not found');
          }
        });
      })
      .catch((error) => {
        console.error('Error starting AR:', error);
      });

    return () => {
      if (mindarThreeRef.current) {
        renderer.setAnimationLoop(null);
        try {
          mindarThreeRef.current.stop();
        } catch (error) {
          console.warn('Error stopping MindAR:', error);
        }
        mindarThreeRef.current = null;
      }
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef} />;
}

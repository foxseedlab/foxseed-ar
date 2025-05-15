import { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

export default function AR2({
  markerNo,
}: {
  markerNo: number;
}) {
  const containerRef = useRef(null);
  const mindarThreeRef = useRef<MindARThree | null>(null);

  useEffect(() => {
    const mindarThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: `/targets (${markerNo}).mind`,
      filterMinCF: 1.0, // smoothing をほぼ OFF
      filterBeta: 10000, // レイテンシをさらに低減
      warmupTolerance: 1,
      missTolerance: 1,
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

    mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    return () => {
      if (mindarThreeRef.current) {
        renderer.setAnimationLoop(null);
        try {
          // ストリームの停止を追加
          if (mindarThreeRef.current.video?.srcObject) {
            const tracks = (
              mindarThreeRef.current.video.srcObject as MediaStream
            ).getTracks();
            for (const track of tracks) {
              track.stop();
            }
          }
          // MindARの停止処理を安全に行う
          if (mindarThreeRef.current.controller) {
            mindarThreeRef.current.stop();
          }
        } catch (error) {
          console.warn('Error stopping MindAR:', error);
        }
        mindarThreeRef.current = null;
      }
    };
  }, [markerNo]);

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef} />;
}

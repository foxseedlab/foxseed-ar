import { useEffect, useRef, useState } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

const markerPath = '/foxseed-card.mind';

export default function AR() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mindarThreeRef = useRef<MindARThree | null>(null);
  const [isMarkerFound, setIsMarkerFound] = useState(false);

  useEffect(() => {
    const mindarThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: markerPath,

      // OneEuroFilterのカットオフ周波数。値を大きくするとフィルタリングが弱まり、追従が速くなる
      filterMinCF: 1.0,
      // OneEuroFilterの速度係数(β)。値を大きくするとレイテンシがさらに減り、急激な動きへの追従が向上する
      filterBeta: 10000,
      // 連続してマーカー検出に成功するまでのフレーム数。小さいほど検出開始がほぼ即時に
      warmupTolerance: 1,
      // 連続してマーカー検出に失敗（ロスト）するまでのフレーム数。小さいほどロスト判定がほぼ即時に
      missTolerance: 1,
      // 使用する前面カメラのデバイスID。null/undefinedでデフォルトを使用
      userDeviceId: null,
      // 使用する背面カメラのデバイスID。null/undefinedでデフォルトを使用
      environmentDeviceId: null,

      // 読み込み中のUI表示。'yes'で表示、'no'で非表示
      uiLoading: 'yes',
      // スキャン中のUI表示。'yes'で表示、'no'で非表示
      uiScanning: 'yes',
      // エラー発生時のUI表示。'yes'で表示、'no'で非表示
      uiError: 'yes',
    });

    mindarThreeRef.current = mindarThree;

    const { renderer, scene, camera } = mindarThree;
    const anchor = mindarThree.addAnchor(0);

    // マーカー検出時のイベントリスナーを追加
    anchor.onTargetFound = () => {
      setIsMarkerFound(true);
    };

    anchor.onTargetLost = () => {
      setIsMarkerFound(false);
    };

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

  return (
    <>
      <div style={{ width: '100%', height: '100%' }} ref={containerRef} />
      {isMarkerFound && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          マーカーが反応しました
        </div>
      )}
    </>
  );
}

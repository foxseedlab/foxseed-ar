import { useEffect, useRef, useState } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as TWEEN from '@tweenjs/tween.js';
import type { Font } from 'three/examples/jsm/Addons';

const markerPath = '/foxseed-card.mind';

export default function AR() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mindarThreeRef = useRef<MindARThree | null>(null);
  const [isMarkerFound, setIsMarkerFound] = useState(false);
  const textRef = useRef<THREE.Group | null>(null);

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

    // フォントの読み込み
    const fontLoader = new FontLoader();
    fontLoader.load('/font-for-label.json', (font: Font) => {
      const textGroup = new THREE.Group();
      textRef.current = textGroup;

      // テキストのマテリアル設定
      const createTextMaterial = () => {
        const material = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          specular: 0xffffff,
          shininess: 100,
          flatShading: true,
        });
        return material;
      };

      // アウトライン用のマテリアル
      const createOutlineMaterial = () => {
        return new THREE.MeshPhongMaterial({
          color: 0xcccccc,
          specular: 0xffffff,
          shininess: 30,
          flatShading: true,
        });
      };

      // 1行目のテキスト
      const textGeometry1 = new TextGeometry('ふぉくしーどさん', {
        font: font,
        size: 0.2,
        // @ts-ignore 新フィールド名の depth にすると深すぎて表示がおかしくなる
        height: 0.05,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.003,
        bevelSize: 0.002,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const textMaterial1 = createTextMaterial();
      const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial1);
      textGeometry1.computeBoundingBox();
      const textWidth1 = textGeometry1.boundingBox
        ? textGeometry1.boundingBox.max.x - textGeometry1.boundingBox.min.x
        : 0;
      textMesh1.position.set(-textWidth1 / 2, 0.2, 0);

      // 1行目のアウトライン
      const outlineGeometry1 = textGeometry1.clone();
      const outlineMaterial1 = createOutlineMaterial();
      const outlineMesh1 = new THREE.Mesh(outlineGeometry1, outlineMaterial1);
      outlineMesh1.position.copy(textMesh1.position);
      outlineMesh1.position.z -= 0.001;

      // 2行目のテキスト
      const textGeometry2 = new TextGeometry('こんにちは', {
        font: font,
        size: 0.2,
        // @ts-ignore 新フィールド名の depth にすると深すぎて表示がおかしくなる
        height: 0.05,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.003,
        bevelSize: 0.002,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const textMaterial2 = createTextMaterial();
      const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
      textGeometry2.computeBoundingBox();
      const textWidth2 = textGeometry2.boundingBox
        ? textGeometry2.boundingBox.max.x - textGeometry2.boundingBox.min.x
        : 0;
      textMesh2.position.set(-textWidth2 / 2, -0.2, 0);

      // 2行目のアウトライン
      const outlineGeometry2 = textGeometry2.clone();
      const outlineMaterial2 = createOutlineMaterial();
      const outlineMesh2 = new THREE.Mesh(outlineGeometry2, outlineMaterial2);
      outlineMesh2.position.copy(textMesh2.position);
      outlineMesh2.position.z -= 0.001;

      textGroup.add(outlineMesh1);
      textGroup.add(textMesh1);
      textGroup.add(outlineMesh2);
      textGroup.add(textMesh2);
      textGroup.visible = false;
      anchor.group.add(textGroup);
    });

    // ライトの追加
    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(1, 1, 1);
    anchor.group.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1);
    fillLight.position.set(-1, 0.5, -1);
    anchor.group.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    anchor.group.add(ambientLight);

    anchor.onTargetFound = () => {
      setIsMarkerFound(true);
      if (textRef.current) {
        textRef.current.visible = true;
        textRef.current.scale.set(0, 0, 0);
        const animation = new TWEEN.Tween(textRef.current.scale)
          .to({ x: 1, y: 1, z: 1 }, 1000)
          .easing(TWEEN.Easing.Elastic.Out)
          .start();
      }
    };

    anchor.onTargetLost = () => {
      setIsMarkerFound(false);
      if (textRef.current) {
        textRef.current.visible = false;
      }
    };

    mindarThree.start();
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

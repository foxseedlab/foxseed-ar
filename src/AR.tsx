import { useEffect, useRef, useState } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as TWEEN from '@tweenjs/tween.js';
import type { Font } from 'three/examples/jsm/Addons';

const jsonFontPath = '/font-for-label.json';
const markerPath = '/foxseed-card.mind';
const characterImagePath = '/jumpout-foxseed.webp';

const textColor = 0xffffff;
const textSpecularColor = 0x13240f;

export default function AR() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mindarThreeRef = useRef<MindARThree | null>(null);
  const [isMarkerFound, setIsMarkerFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textRef = useRef<THREE.Group | null>(null);
  const imageRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const mindarThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: markerPath,

      // OneEuroFilterのカットオフ周波数。値を大きくするとフィルタリングが弱まり、追従が速くなる
      filterMinCF: 0.1,
      // OneEuroFilterの速度係数(β)。値を大きくするとレイテンシがさらに減り、急激な動きへの追従が向上する
      filterBeta: 0.1,
      // 連続してマーカー検出に成功するまでのフレーム数。小さいほど検出開始がほぼ即時に
      warmupTolerance: 5,
      // 連続してマーカー検出に失敗（ロスト）するまでのフレーム数。小さいほどロスト判定がほぼ即時に
      missTolerance: 5,
      // 使用する前面カメラのデバイスID。null/undefinedでデフォルトを使用
      userDeviceId: null,
      // 使用する背面カメラのデバイスID。null/undefinedでデフォルトを使用
      environmentDeviceId: null,

      // 読み込み中のUI表示。'yes'で表示、'no'で非表示
      uiLoading: 'no',
      // スキャン中のUI表示。'yes'で表示、'no'で非表示
      uiScanning: 'no',
      // エラー発生時のUI表示。'yes'で表示、'no'で非表示
      uiError: 'no',
    });

    mindarThreeRef.current = mindarThree;

    // イベントリスナーの設定
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

    // フォントの読み込み
    const fontLoader = new FontLoader();
    fontLoader.load(jsonFontPath, (font: Font) => {
      const textGroup = new THREE.Group();
      textRef.current = textGroup;

      // テキストのマテリアル設定
      const createTextMaterial = () => {
        const material = new THREE.MeshPhongMaterial({
          color: textColor, // テキストの色
          specular: textSpecularColor, // 反射光の色
          shininess: 200, // 光沢をさらに強く
          flatShading: true,
          emissive: 0x222222, // 自己発光を追加
        });
        return material;
      };

      // アウトライン用のマテリアル
      const createOutlineMaterial = () => {
        return new THREE.MeshPhongMaterial({
          color: 0xdddddd, // より明るいグレーに
          specular: 0xffffff,
          shininess: 150, // 光沢をさらに強く
          flatShading: true,
          emissive: 0x111111, // 自己発光を追加
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
      textMesh1.position.set(-textWidth1 / 2, 1.2, 0);
      textMesh1.rotation.x = Math.PI / 6; // 30度回転（カメラの方向に向ける）

      // 1行目のアウトライン
      const outlineGeometry1 = textGeometry1.clone();
      const outlineMaterial1 = createOutlineMaterial();
      const outlineMesh1 = new THREE.Mesh(outlineGeometry1, outlineMaterial1);
      outlineMesh1.position.copy(textMesh1.position);
      outlineMesh1.rotation.copy(textMesh1.rotation);
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
      textMesh2.position.set(-textWidth2 / 2, 0.8, 0);
      textMesh2.rotation.x = Math.PI / 6; // 30度回転（カメラの方向に向ける）

      // 2行目のアウトライン
      const outlineGeometry2 = textGeometry2.clone();
      const outlineMaterial2 = createOutlineMaterial();
      const outlineMesh2 = new THREE.Mesh(outlineGeometry2, outlineMaterial2);
      outlineMesh2.position.copy(textMesh2.position);
      outlineMesh2.rotation.copy(textMesh2.rotation);
      outlineMesh2.position.z -= 0.001;

      textGroup.add(outlineMesh1);
      textGroup.add(textMesh1);
      textGroup.add(outlineMesh2);
      textGroup.add(textMesh2);
      textGroup.visible = false;
      anchor.group.add(textGroup);
    });

    // 2Dイラストの読み込みと設定
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(characterImagePath, (texture) => {
      const imageGroup = new THREE.Group();
      imageRef.current = imageGroup;

      // 画像のアスペクト比を計算
      const imageAspect = texture.image.width / texture.image.height;
      const baseWidth = 1.5; // 基本の幅を大きくする
      const baseHeight = baseWidth / imageAspect;

      // メインのスプライト
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const geometry = new THREE.PlaneGeometry(baseWidth, baseHeight);
      const sprite = new THREE.Mesh(geometry, material);
      sprite.position.z = 0.2;

      // 影用のスプライト
      const shadowMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const shadowSprite = new THREE.Mesh(geometry, shadowMaterial);
      shadowSprite.position.z = 0.05;

      imageGroup.add(shadowSprite);
      imageGroup.add(sprite);
      imageGroup.visible = false;
      anchor.group.add(imageGroup);

      // アニメーションの設定
      const animate = () => {
        if (imageGroup.visible) {
          // 基本のゆらゆら動き
          imageGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
          imageGroup.position.y = Math.sin(Date.now() * 0.002) * 0.05;

          // プイプイ回転のアニメーション
          const time = Date.now() * 0.001;
          // 表示開始から3秒待機
          if (time < 3) {
            // 待機中は水平を維持
            imageGroup.rotation.z = 0;
            return;
          }

          // 6秒周期（3秒のアニメーション + 3秒の待機）
          const cycleTime = (time - 5) % 6;

          if (cycleTime < 3) {
            // 最初の3秒でアニメーション
            // 3秒で2回の往復（1.5秒に1回）
            const progress = cycleTime / 3; // 0から1の進行度
            const piipiiRotation = Math.sin(progress * Math.PI * 4) * 0.135; // 振幅を0.135に減少（半分）

            // 現在の回転値と目標値の差分を計算
            const currentRotation = imageGroup.rotation.z;
            const targetRotation = piipiiRotation;
            // より自然な補間
            imageGroup.rotation.z += (targetRotation - currentRotation) * 0.15;
          } else {
            // 残りの3秒は中央で待機（より自然な収束）
            const currentRotation = imageGroup.rotation.z;
            imageGroup.rotation.z += (0 - currentRotation) * 0.08;
          }
        } else {
          // 非表示時は確実に水平に
          imageGroup.rotation.z = 0;
        }
      };

      renderer.setAnimationLoop(() => {
        TWEEN.update();
        animate();
        renderer.render(scene, camera);
      });
    });

    // ライトの追加
    const mainLight = new THREE.DirectionalLight(0xffffff, 3.5); // 強度を大幅に上げる
    mainLight.position.set(0.5, 0.8, 0.5);
    anchor.group.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 2.0); // 強度を上げる
    fillLight.position.set(-0.5, 0.3, -0.5);
    anchor.group.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // 環境光を強める
    anchor.group.add(ambientLight);

    // マーカーの読み込み完了時の処理
    mindarThree
      .start()
      .then(() => {
        setIsLoading(false);
        setIsScanning(true);
      })
      .catch((error) => {
        setError(error.message);
      });

    // レンダリングループの設定
    renderer.setAnimationLoop(() => {
      TWEEN.update();
      renderer.render(scene, camera);
    });

    anchor.onTargetFound = () => {
      setIsMarkerFound(true);
      setIsLoading(false);
      setIsScanning(false);
      setError(null);
      if (imageRef.current) {
        imageRef.current.visible = true;
        imageRef.current.scale.set(0, 0, 0);
        new TWEEN.Tween(imageRef.current.scale)
          .to({ x: 1, y: 1, z: 1 }, 1000)
          .easing(TWEEN.Easing.Elastic.Out)
          .onComplete(() => {
            // 画像のアニメーション完了後に文字を表示
            if (textRef.current) {
              textRef.current.visible = true;
              textRef.current.scale.set(0, 0, 0);
              new TWEEN.Tween(textRef.current.scale)
                .to({ x: 1, y: 1, z: 1 }, 1000)
                .easing(TWEEN.Easing.Elastic.Out)
                .start();
            }
          })
          .start();
      }
    };

    anchor.onTargetLost = () => {
      setIsMarkerFound(false);
      setIsScanning(true);
      if (textRef.current) {
        textRef.current.visible = false;
      }
      if (imageRef.current) {
        imageRef.current.visible = false;
      }
    };

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
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '20px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          読み込み中...
        </div>
      )}
      {isScanning && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '20px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          マーカーをスキャン中...
        </div>
      )}
      {error && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            color: 'white',
            padding: '20px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          エラー: {error}
        </div>
      )}
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

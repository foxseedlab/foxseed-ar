import { useRef } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as TWEEN from '@tweenjs/tween.js';
import type { Font } from 'three/examples/jsm/Addons';
import type { Anchor } from 'mind-ar/dist/mindar-image-three.prod.js';

const jsonFontPath = '/font-for-label.json';
const textColor = 0xffffff;
const textSpecularColor = 0x13240f;
const honorific = 'さん';

export default function useTextSetup(guestName: string, message: string) {
  const textRef = useRef<THREE.Group | null>(null);

  const setupText = (anchor: Anchor) => {
    const fontLoader = new FontLoader();
    fontLoader.load(jsonFontPath, (font: Font) => {
      const textGroup = new THREE.Group();
      textRef.current = textGroup;

      const createTextMaterial = () => {
        return new THREE.MeshPhongMaterial({
          color: textColor,
          specular: textSpecularColor,
          shininess: 200,
          flatShading: true,
          emissive: 0x222222,
        });
      };

      const createOutlineMaterial = () => {
        return new THREE.MeshPhongMaterial({
          color: 0xdddddd,
          specular: 0xffffff,
          shininess: 150,
          flatShading: true,
          emissive: 0x111111,
        });
      };

      // お名前行
      const nameTextGeometry = new TextGeometry(guestName + honorific, {
        font: font,
        size: 0.2,
        // @ts-ignore
        height: 0.05,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.003,
        bevelSize: 0.002,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const nameTextMaterial = createTextMaterial();
      const nameTextMesh = new THREE.Mesh(nameTextGeometry, nameTextMaterial);
      nameTextGeometry.computeBoundingBox();
      const nameTextWidth = nameTextGeometry.boundingBox
        ? nameTextGeometry.boundingBox.max.x -
          nameTextGeometry.boundingBox.min.x
        : 0;
      nameTextMesh.position.set(-nameTextWidth / 2, 1.2, 0);
      nameTextMesh.rotation.x = Math.PI / 6;

      // お名前行のアウトライン
      const nameTextOutlineGeometry = nameTextGeometry.clone();
      const nameTextOutlineMaterial = createOutlineMaterial();
      const nameTextOutlineMesh = new THREE.Mesh(
        nameTextOutlineGeometry,
        nameTextOutlineMaterial,
      );
      nameTextOutlineMesh.position.copy(nameTextMesh.position);
      nameTextOutlineMesh.rotation.copy(nameTextMesh.rotation);
      nameTextOutlineMesh.position.z -= 0.001;

      // メッセージ行
      const msgTextGeometry = new TextGeometry(message, {
        font: font,
        size: 0.2,
        // @ts-ignore
        height: 0.05,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.003,
        bevelSize: 0.002,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const msgTextMaterial = createTextMaterial();
      const msgTextMesh = new THREE.Mesh(msgTextGeometry, msgTextMaterial);
      msgTextGeometry.computeBoundingBox();
      const msgTextWidth = msgTextGeometry.boundingBox
        ? msgTextGeometry.boundingBox.max.x - msgTextGeometry.boundingBox.min.x
        : 0;
      msgTextMesh.position.set(-msgTextWidth / 2, 0.8, 0);
      msgTextMesh.rotation.x = Math.PI / 6;

      // メッセージ行のアウトライン
      const msgTextOutlineGeometry = msgTextGeometry.clone();
      const msgTextOutlineMaterial = createOutlineMaterial();
      const msgTextOutlineMesh = new THREE.Mesh(
        msgTextOutlineGeometry,
        msgTextOutlineMaterial,
      );
      msgTextOutlineMesh.position.copy(msgTextMesh.position);
      msgTextOutlineMesh.rotation.copy(msgTextMesh.rotation);
      msgTextOutlineMesh.position.z -= 0.001;

      textGroup.add(nameTextOutlineMesh);
      textGroup.add(nameTextMesh);
      textGroup.add(msgTextOutlineMesh);
      textGroup.add(msgTextMesh);
      textGroup.visible = false;
      anchor.group.add(textGroup);
    });
  };

  const showText = () => {
    if (textRef.current) {
      textRef.current.visible = true;
      textRef.current.scale.set(0, 0, 0);
      new TWEEN.Tween(textRef.current.scale)
        .to({ x: 1, y: 1, z: 1 }, 1000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start();
    }
  };

  const hideText = () => {
    if (textRef.current) {
      textRef.current.visible = false;
    }
  };

  return {
    textRef,
    setupText,
    showText,
    hideText,
  };
}

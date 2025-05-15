import { useRef, useState } from 'react';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import type { Anchor } from 'mind-ar/dist/mindar-image-three.prod.js';

const characterImagePath = '/jumpout-foxseed.webp';

export default function useImageSetup() {
  const imageRef = useRef<THREE.Group | null>(null);
  const [isTouching, setIsTouching] = useState(false);

  const setupImage = (
    anchor: Anchor,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
  ) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(characterImagePath, (texture) => {
      const imageGroup = new THREE.Group();
      imageRef.current = imageGroup;

      const imageAspect = texture.image.width / texture.image.height;
      const baseWidth = 1.5;
      const baseHeight = baseWidth / imageAspect;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const geometry = new THREE.PlaneGeometry(baseWidth, baseHeight);
      const sprite = new THREE.Mesh(geometry, material);
      sprite.position.z = 0.2;

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

      const animate = () => {
        if (imageGroup.visible) {
          imageGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
          imageGroup.position.y = Math.sin(Date.now() * 0.002) * 0.05;

          const time = Date.now() * 0.001;
          if (time < 3) {
            imageGroup.rotation.z = 0;
            return;
          }

          const cycleTime = (time - 5) % 6;

          if (cycleTime < 3) {
            const progress = cycleTime / 3;
            const piipiiRotation = Math.sin(progress * Math.PI * 4) * 0.135;

            const currentRotation = imageGroup.rotation.z;
            const targetRotation = piipiiRotation;
            imageGroup.rotation.z += (targetRotation - currentRotation) * 0.15;
          } else {
            const currentRotation = imageGroup.rotation.z;
            imageGroup.rotation.z += (0 - currentRotation) * 0.08;
          }
        } else {
          imageGroup.rotation.z = 0;
        }
      };

      renderer.setAnimationLoop(() => {
        TWEEN.update();
        animate();
        renderer.render(scene, camera);
      });
    });
  };

  const showImage = () => {
    if (imageRef.current) {
      imageRef.current.visible = true;
      imageRef.current.scale.set(0, 0, 0);
      new TWEEN.Tween(imageRef.current.scale)
        .to({ x: 1, y: 1, z: 1 }, 1000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start();
    }
  };

  const hideImage = () => {
    if (imageRef.current) {
      imageRef.current.visible = false;
    }
  };

  const handleTouch = (event: TouchEvent, camera: THREE.Camera) => {
    if (!imageRef.current || !camera) return;

    const touch = event.touches[0];
    const mouse = new THREE.Vector2(
      (touch.clientX / window.innerWidth) * 2 - 1,
      -(touch.clientY / window.innerHeight) * 2 + 1,
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(
      imageRef.current.children[1],
      true,
    );

    if (intersects.length > 0) {
      setIsTouching(true);

      new TWEEN.Tween(imageRef.current.scale)
        .to({ x: 1.2, y: 1.2, z: 1.2 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .yoyo(true)
        .repeat(1)
        .start();

      setTimeout(() => setIsTouching(false), 500);
    }
  };

  return {
    imageRef,
    isTouching,
    setupImage,
    showImage,
    hideImage,
    handleTouch,
  };
}

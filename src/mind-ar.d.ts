declare module 'mind-ar/dist/mindar-image-three.prod.js' {
  import type * as THREE from 'three';

  interface UI {
    showLoading(): void;
    hideLoading(): void;
    showScanning(): void;
    hideScanning(): void;
    showCompatibility(): void;
  }

  interface ControllerOptions {
    inputWidth: number;
    inputHeight: number;
    filterMinCF: number | null;
    filterBeta: number | null;
    warmupTolerance: number | null;
    missTolerance: number | null;
    maxTrack: number | undefined;
    onUpdate: (data: {
      type: string;
      targetIndex?: number;
      worldMatrix?: number[] | null;
    }) => void;
  }

  interface Controller {
    addImageTargets(imageTargetSrc: string): Promise<{
      dimensions: [number, number][];
    }>;
    dummyRun(video: HTMLVideoElement): Promise<void>;
    getProjectionMatrix(): number[];
    processVideo(video: HTMLVideoElement): void;
    stopProcessVideo(): void;
  }

  interface Anchor {
    group: THREE.Group;
    targetIndex: number;
    onTargetFound: (() => void) | null;
    onTargetLost: (() => void) | null;
    onTargetUpdate: (() => void) | null;
    css: boolean;
    visible: boolean;
  }

  export class MindARThree {
    constructor(options: {
      container: HTMLElement | null;
      imageTargetSrc: string;
      maxTrack?: number;
      uiLoading?: string;
      uiScanning?: string;
      uiError?: string;
      filterMinCF?: number | null;
      filterBeta?: number | null;
      warmupTolerance?: number | null;
      missTolerance?: number | null;
      userDeviceId?: string | null;
      environmentDeviceId?: string | null;
    });

    container: HTMLElement | null;
    imageTargetSrc: string;
    maxTrack: number | undefined;
    filterMinCF: number | null;
    filterBeta: number | null;
    warmupTolerance: number | null;
    missTolerance: number | null;
    ui: UI;
    userDeviceId: string | null;
    environmentDeviceId: string | null;
    shouldFaceUser: boolean;
    scene: THREE.Scene;
    cssScene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    cssRenderer: {
      domElement: HTMLElement;
      setSize(width: number, height: number): void;
    };
    camera: THREE.PerspectiveCamera;
    anchors: Array<Anchor>;
    video: HTMLVideoElement;
    controller: Controller;
    postMatrixs: THREE.Matrix4[];

    start(): Promise<void>;
    stop(): void;
    switchCamera(): void;
    resize(): void;
    addAnchor(targetIndex: number): Anchor;
    addCSSAnchor(targetIndex: number): Anchor;

    private _startVideo(): Promise<void>;
    private _startAR(): Promise<void>;
  }
}

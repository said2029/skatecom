"use client";

import {
  CameraControls,
  Environment,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useCustomizerControls } from "./context";
import { asImageSrc } from "@prismicio/client";
import * as THREE from "three";
import { Skateboard } from "@/components/Skateboard";
import { color } from "three/tsl";

const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";
const ENVIRONMENT_COLOR = "#3B3A3A";

type Props = {
  wheelTextureURLs: string[];
  deckTextureURLs: string[];
};

export default function Preview({ deckTextureURLs, wheelTextureURLs }: Props) {
  const cameraControls = useRef<CameraControls>(null);
  const floorRef = useRef<THREE.Mesh>(null);
  const { selectedBolt, selectedDeck, selectedTruck, selectedWheel } =
    useCustomizerControls();

  const wheelTexureURL =
    asImageSrc(selectedWheel?.texture) ?? DEFAULT_WHEEL_TEXTURE;
  const deckTexureURL =
    asImageSrc(selectedDeck?.texture) ?? DEFAULT_DECK_TEXTURE;
  const truckColor = selectedTruck?.color ?? DEFAULT_TRUCK_COLOR;
  const boltColor = selectedBolt?.color ?? DEFAULT_BOLT_COLOR;
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        <Environment
          files={"/hdr/warehouse-512.hdr"}
          environmentIntensity={0.6}
        />
        <directionalLight
          castShadow
          lookAt={[0, 0, 0]}
          position={[1, 1, 1]}
          intensity={1.6}
        />
        <fog attach={"fog"} args={[ENVIRONMENT_COLOR,3,10]} />
        <color attach="background" args={[ENVIRONMENT_COLOR]} />
        <StageFloor />
        <Skateboard
          wheelTextureURLs={wheelTextureURLs}
          wheelTextureURL={wheelTexureURL}
          deckTextureURLs={deckTextureURLs}
          deckTextureURL={deckTexureURL}
          truckColor={truckColor}
          boltColor={boltColor}
          pose="side"
        />

        <CameraControls
          ref={cameraControls}
          minDistance={0.2}
          maxDistance={4}
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
}

function StageFloor() {
  const normalMap = useTexture("/concrete-normal.avif");
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(30, 30);
  normalMap.anisotropy = 8;

  const material = new THREE.MeshStandardMaterial({
    roughness: 75,
    color: ENVIRONMENT_COLOR,
    normalMap: normalMap,
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
      castShadow
      receiveShadow
      position={[0, -0.005, 0]}
    >
      <circleGeometry args={[20, 32]} />
    </mesh>
  );
}

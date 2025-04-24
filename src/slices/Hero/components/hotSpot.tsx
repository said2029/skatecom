import { Billboard } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
interface HotSpotProps {
  position: [number, number, number];
  isVisible: boolean;
  color?: string;
}
export default function HotSpot({
  isVisible,
  position,
  color = "#E6FC6A",
}: HotSpotProps) {
  const hotSpotRef = useRef<THREE.Mesh>(null);
  return (
    <Billboard position={position}>
      <mesh ref={hotSpotRef} visible={isVisible}>
        <circleGeometry args={[0.02, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <mesh
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
        ref={hotSpotRef}
        visible={isVisible}
      >
        <circleGeometry args={[0.03, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Billboard>
  );
}

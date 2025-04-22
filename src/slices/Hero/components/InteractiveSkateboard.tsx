"use client";
import { Skateboard } from "@/components/Skateboard";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

export default function InteractiveSkateboard() {
  return (
    <div className="absolute top-0 inset-0 flex justify-center items-center">
      <Canvas
        className="min-h-[60rem] w-full "
        camera={{ position: [1.5, 1, 1.4], fov: 55 }}
      >
        <Suspense fallback={"loading.."}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene() {
  return (
    <group>
      <OrbitControls/>
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <Skateboard/>
      <ContactShadows opacity={.6} position={[0,-.08,0]}/>
    </group>
  );
}

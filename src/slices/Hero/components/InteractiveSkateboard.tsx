"use client";
import { Skateboard } from "@/components/Skateboard";
import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import gsap from "gsap";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import HotSpot from "./hotSpot";

const INITIAL_CAMERA_POSITION = [1.5, 1, 1.4] as const;

type Props = {
  deckTextureURL: string;
  wheelTextureURL: string;
  truckColor: string;
  boltColor: string;
};

export default function InteractiveSkateboard({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) {
  return (
    <div className="absolute top-0 inset-0 flex justify-center items-center">
      <Canvas
        className="min-h-[60rem] w-full "
        camera={{ position: INITIAL_CAMERA_POSITION, fov: 55 }}
      >
        <Suspense fallback={"loading.."}>
          <Scene
            deckTextureURL={deckTextureURL}
            wheelTextureURL={wheelTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) {
  const containerRef = useRef<THREE.Group>(null);
  const originRef = useRef<THREE.Group>(null);

  const [isJumping, setIsJumping] = useState(false);

  // Camera
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(-0.3, 0.15, 0));
    setZoom();
    window.addEventListener("resize", setZoom);
    function setZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1);
      camera.position.x = INITIAL_CAMERA_POSITION[0] * scale;
      camera.position.y = INITIAL_CAMERA_POSITION[1] * scale;
      camera.position.z = INITIAL_CAMERA_POSITION[2] * scale;
    }
    return () => {
      window.removeEventListener("resize", setZoom);
    };
  }, [camera]);

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const board = containerRef.current;
    const origin = originRef.current;
    if (!board || !origin || isJumping) return;
    const { name } = event.object;

    jumpBoard(board);
    if (name === "back") {
      back(board);
    } else if (name === "middle") {
      KickFlip(board);
    } else if (name === "front") {
      frontSide360(board, origin);
    }
  };

  // animations of skateboard gsap
  function KickFlip(board: THREE.Group) {
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "power2.in",
      })
      .to(
        board.rotation,
        {
          z: `+=${Math.PI * 2}`,
          duration: 0.78,
          ease: "none",
        },
        "<"
      )
      .to(board.rotation, {
        x: 0,
        duration: 0.12,
        ease: "none",
      });
  }
  function back(board: THREE.Group) {
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "power2.in",
      })
      .to(board.rotation, {
        x: 0,
        duration: 0.12,
        ease: "none",
      });
  }
  function frontSide360(board: THREE.Group, origin: THREE.Group) {
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "power2.in",
      })
      .to(
        origin.rotation,
        {
          y: `+=${Math.PI * 2}`,
          duration: 0.77,
          ease: "none",
        },
        "<"
      )
      .to(board.rotation, {
        x: 0,
        duration: 0.14,
        ease: "none",
      });
  }
  function jumpBoard(board: THREE.Group) {
    setIsJumping(true);
    gsap
      .timeline({ onComplete: () => setIsJumping(false) })
      .to(board.position, {
        y: 0.8,
        duration: 0.51,
        ease: "power2.out",
        delay: 0.26,
      })
      .to(board.position, {
        y: 0,
        duration: 0.43,
        ease: "power2.in",
      });
  }

  return (
    <group>
      {/* <OrbitControls /> */}
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <group ref={originRef}>
        <group ref={containerRef} position={[-0.25, 0.086, -0.635]}>
          <group position={[0, -0.086, 0.635]}>
            <Skateboard
              wheelTextureURLs={[wheelTextureURL]}
              wheelTextureURL={wheelTextureURL}
              deckTextureURLs={[deckTextureURL]}
              deckTextureURL={deckTextureURL}
              truckColor={truckColor}
              boltColor={boltColor}
              constantWheelSpin
            />

            <HotSpot isVisible position={[0, 0.35, 1]} />
            <HotSpot color="#03fc90" isVisible position={[0, 0.35, 0]} />
            <HotSpot color="#a903fc" isVisible position={[0, 0.35, -1]} />

            <mesh
              onClick={onClick}
              rotation={[-0.2, 0, 0]}
              position={[0, 0.27, 0.9]}
              name="front"
            >
              <boxGeometry args={[0.6, 0.1, 0.6]} />
              <meshStandardMaterial visible={false} />
            </mesh>
            <mesh onClick={onClick} position={[0, 0.27, 0]} name="middle">
              <boxGeometry args={[0.6, 0.1, 1.2]} />
              <meshStandardMaterial visible={false} />
            </mesh>
            <mesh
              onClick={onClick}
              rotation={[0.2, 0, 0]}
              position={[0, 0.27, -0.9]}
              name="back"
            >
              <boxGeometry args={[0.6, 0.1, 0.6]} />
              <meshStandardMaterial visible={false} />
            </mesh>
          </group>
        </group>
      </group>
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}

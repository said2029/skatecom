import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

type SkateboardProps = {
  wheelTextureURLs: string[];
  wheelTextureURL: string;
  deckTextureURLs: string[];
  deckTextureURL: string;
  truckColor: string;
  boltColor: string;
  constantWheelSpin?: boolean;
  pose?: "upright" | "side";
};
type GLTFResult = GLTF & {
  nodes: {
    GripTape: THREE.Mesh;
    Wheel1: THREE.Mesh;
    Wheel2: THREE.Mesh;
    Deck: THREE.Mesh;
    Wheel4: THREE.Mesh;
    Bolts: THREE.Mesh;
    Wheel3: THREE.Mesh;
    Baseplates: THREE.Mesh;
    Truck1: THREE.Mesh;
    Truck2: THREE.Mesh;
  };
};

export function Skateboard({
  boltColor,
  deckTextureURL,
  deckTextureURLs,
  truckColor,
  wheelTextureURL,
  wheelTextureURLs,
  constantWheelSpin = false,
  pose="upright"
}: SkateboardProps) {
  const { nodes } = useGLTF("/skateboard.gltf") as unknown as GLTFResult;

  // #region REFs
  const wheelRefs = useRef<THREE.Object3D[]>([]);
  // #endregion REFs

  //#region  wheel Texture
  const wheelTextures = useTexture(wheelTextureURLs);
  wheelTextures.forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });
  const wheelIndexTexture = wheelTextureURLs.findIndex(
    (url) => url === wheelTextureURL
  );
  const WheelTexture = wheelTextures[wheelIndexTexture];
  //#endregion

  // #region Deck Texture
  const deckTextures = useTexture(deckTextureURLs);
  deckTextures.forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });
  const deckIndexTexture = deckTextureURLs.findIndex(
    (url) => url === deckTextureURL
  );
  const DeckTexture = deckTextures[deckIndexTexture];

  // #endregion Deck Texture

  const gripeTapeDiffuse = useTexture("/skateboard/griptape-diffuse.webp");
  const gripeTapeRoughness = useTexture("/skateboard/griptape-roughness.webp");

  const griptTapeMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: gripeTapeDiffuse,
      bumpMap: gripeTapeRoughness,
      roughnessMap: gripeTapeRoughness,
      bumpScale: 3.5,
      roughness: 0.8,
      color: "#555555",
    });

    if (gripeTapeDiffuse) {
      gripeTapeDiffuse.wrapS = THREE.RepeatWrapping;
      gripeTapeDiffuse.wrapT = THREE.RepeatWrapping;
      gripeTapeDiffuse.repeat.set(9, 9);
      gripeTapeDiffuse.needsUpdate = true;

      gripeTapeRoughness.wrapS = THREE.RepeatWrapping;
      gripeTapeRoughness.wrapT = THREE.RepeatWrapping;
      gripeTapeRoughness.repeat.set(9, 9);
      gripeTapeRoughness.needsUpdate = true;

      gripeTapeRoughness.anisotropy = 8;
    }
    return material;
  }, [gripeTapeDiffuse, gripeTapeRoughness]);

  const boltMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: boltColor,
        metalness: 0.5,
        roughness: 0.2,
      }),
    [boltColor]
  );

  const metalMaterial = useTexture("/skateboard/metal-normal.avif");
  metalMaterial.wrapS = THREE.RepeatWrapping;
  metalMaterial.wrapT = THREE.RepeatWrapping;
  metalMaterial.anisotropy = 8;
  metalMaterial.repeat.set(8, 8);

  const TruckMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: truckColor,
        normalMap: metalMaterial,
        normalScale: new THREE.Vector2(0.3, 0.3),
        metalness: 0.8,
        roughness: 0.2,
      }),
    [truckColor, metalMaterial]
  );

  const DeckMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: DeckTexture,
        roughness: 0.4,
      }),
    [DeckTexture]
  );

  const WheelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: WheelTexture,
        roughness: 0.35,
      }),
    [WheelTexture]
  );

  // add wheel ref
  const addToWheelRef = (ref: THREE.Object3D | null) => {
    if (ref && !wheelRefs.current.includes(ref)) {
      wheelRefs.current.push(ref);
    }
  };

  useFrame(() => {
    if (!wheelRefs.current || !constantWheelSpin) return;

    for (const wheel of wheelRefs.current) {
      wheel.rotation.x += 0.2;
    }
  });

  useEffect(() => {
    if (!wheelRefs.current || constantWheelSpin) return;

    for (const wheel of wheelRefs.current) {
      gsap.to(wheel.rotation, {
        x: "+=30",
        duration: 2.5,
        ease: "circ.out",
      });
      // gsap
    }
  }, [constantWheelSpin, wheelTextureURL]);

  const position = useMemo(() => ({
    upright: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    },
    side: {
      position: [0, 0.295, 0],
      rotation: [0, 0, Math.PI / 2],
    },
  }) as const,[]);

  return (
    <group rotation={position[pose].rotation} position={position[pose].position} dispose={null}>
      <group name="Scene">
        <mesh
          name="GripTape"
          castShadow
          receiveShadow
          geometry={nodes.GripTape.geometry}
          material={griptTapeMaterial}
          position={[0, 0.286, -0.002]}
        />
        <mesh
          ref={addToWheelRef}
          name="Wheel1"
          castShadow
          receiveShadow
          geometry={nodes.Wheel1.geometry}
          material={WheelMaterial}
          position={[0.238, 0.086, 0.635]}
        />
        <mesh
          name="Wheel2"
          castShadow
          receiveShadow
          geometry={nodes.Wheel2.geometry}
          material={WheelMaterial}
          ref={addToWheelRef}
          position={[-0.237, 0.086, 0.635]}
        />
        <mesh
          name="Deck"
          castShadow
          receiveShadow
          geometry={nodes.Deck.geometry}
          material={DeckMaterial}
          position={[0, 0.271, -0.002]}
        />
        <mesh
          name="Wheel4"
          castShadow
          receiveShadow
          geometry={nodes.Wheel4.geometry}
          material={WheelMaterial}
          position={[-0.238, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
          ref={addToWheelRef}
        />
        <mesh
          name="Bolts"
          castShadow
          receiveShadow
          geometry={nodes.Bolts.geometry}
          material={boltMaterial}
          position={[0, 0.198, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          name="Wheel3"
          castShadow
          receiveShadow
          geometry={nodes.Wheel3.geometry}
          material={WheelMaterial}
          position={[0.237, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
          ref={addToWheelRef}
        />
        <mesh
          name="Baseplates"
          castShadow
          receiveShadow
          geometry={nodes.Baseplates.geometry}
          material={boltMaterial}
          position={[0, 0.211, 0]}
        />
        <mesh
          name="Truck1"
          castShadow
          receiveShadow
          geometry={nodes.Truck1.geometry}
          material={TruckMaterial}
          position={[0, 0.101, -0.617]}
        />
        <mesh
          name="Truck2"
          castShadow
          receiveShadow
          geometry={nodes.Truck2.geometry}
          material={TruckMaterial}
          position={[0, 0.101, 0.617]}
          rotation={[Math.PI, 0, Math.PI]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/skateboard.gltf");

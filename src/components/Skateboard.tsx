import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useMemo } from "react";

type SkateboardProps = {};
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

export function Skateboard(props: SkateboardProps) {
  const { nodes } = useGLTF("/skateboard.gltf") as unknown as GLTFResult;

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

  const BoltColor = "#555555";

  const boltMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: BoltColor,
        metalness: 0.5,
        roughness: 0.2,
      }),
    [BoltColor]
  );

  const metalMaterial = useTexture("/skateboard/metal-normal.avif");
  metalMaterial.wrapS = THREE.RepeatWrapping;
  metalMaterial.wrapT = THREE.RepeatWrapping;
  metalMaterial.anisotropy = 8;
  metalMaterial.repeat.set(8, 8);

  const TruckMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: BoltColor,
        normalMap: metalMaterial,
        normalScale: new THREE.Vector2(0.3, 0.3),
        metalness: 0.8,
        roughness: 0.2,
      }),
    [BoltColor, metalMaterial]
  );

  const DeckTexture = useTexture("/skateboard/Deck.webp");
  const DeckMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: DeckTexture,
        roughness: 0.4,
      }),
    [DeckTexture]
  );
  
  const WheelTexture = useTexture("/skateboard/SkateWheel1.png");
  WheelTexture.flipY=false;
  const WheelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: WheelTexture,
        roughness: 0.35,
      }),
    [WheelTexture]
  );

  return (
    <group {...props} dispose={null}>
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

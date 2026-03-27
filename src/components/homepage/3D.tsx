// components/Moving3DBackground.tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Environment} from "@react-three/drei";

import * as THREE from "three";

function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null!);

  // Animate the whole group + individual objects
  useFrame((state: { clock: THREE.Clock }) => {
    const t: number = state.clock.elapsedTime;

    // Gentle group movement
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.5;
      groupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating glowing spheres */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (i % 4 - 1.5) * 8,
            Math.random() * 10 - 5,
            -10 - i * 2,
          ]}
        >
          <sphereGeometry args={[0.8 + Math.random() * 0.6]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#3b82f6" : "#a855f7"}
            emissive={i % 2 === 0 ? "#1e40af" : "#6b21a8"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Rotating cubes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`cube-${i}`}
          position={[
            (i - 2.5) * 7,
            -3 + Math.sin(i) * 4,
            -15,
          ]}
        >
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial
            color="#eab308"
            emissive="#ca8a04"
            metalness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Moving3DBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#c084fc" />

        <FloatingObjects />

        {/* Optional: nice starry background */}
        <Stars
          radius={300}
          depth={50}
          count={800}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Soft environment lighting */}
        <Environment preset="night" />

        {/* Remove OrbitControls if you don't want user dragging */}
        {/* <OrbitControls enablePan={false} enableZoom={false} /> */}
      </Canvas>
    </div>
  );
}
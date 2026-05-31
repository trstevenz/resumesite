import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../hooks/usePerformance';

export default function AvatarHologram() {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.Mesh>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  
  const { lowPerformance } = usePerformance();

  // Create green/gold data particles orbiting inside the cube
  const count = lowPerformance ? 200 : 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute randomly inside a 1.4 x 1.4 x 1.4 bounding box
      pos[i3] = (Math.random() - 0.5) * 1.4;     // X
      pos[i3 + 1] = (Math.random() - 0.5) * 1.4; // Y
      pos[i3 + 2] = (Math.random() - 0.5) * 1.4; // Z
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    // Follow cursor
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 1.5, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 1.5, 0.05);

    // Spin speed
    meshRef.current.rotation.y = time * 0.12;
    meshRef.current.rotation.x = time * 0.06;

    if (coreRef.current) {
      coreRef.current.rotation.y = -time * 0.35;
      coreRef.current.rotation.z = time * 0.2;
    }

    if (gridRef.current) {
      gridRef.current.rotation.x = -time * 0.1;
      gridRef.current.rotation.y = -time * 0.2;
    }

    if (scannerRef.current) {
      // Horizontal laser sweep up and down
      scannerRef.current.position.y = Math.sin(time * 2.5) * 0.8;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Central 3D QA Debugger Core Box */}
      <mesh ref={coreRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#00f076" /* Mint Green */
          wireframe={true}
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbiting Scanning Grid Sphere */}
      <mesh ref={gridRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#ffb300" /* Warning Amber */
          wireframe={true}
          transparent={true}
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Laser Scanning Bar */}
      <mesh ref={scannerRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.7, 0.02, 1.7]} />
        <meshBasicMaterial
          color="#00f076"
          transparent={true}
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Internal Telemetry Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f076"
          size={0.03}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Core Glowing Halo */}
      {!lowPerformance && (
        <mesh scale={1.1}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color="#00f076"
            transparent={true}
            opacity={0.05}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
}

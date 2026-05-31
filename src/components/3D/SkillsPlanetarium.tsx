import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface GridNodeProps {
  position: [number, number, number];
  color: string;
  size: number;
  timeOffset: number;
}

function TestGridNode({ position, color, size, timeOffset }: GridNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + timeOffset;
    if (meshRef.current) {
      // Float slightly
      meshRef.current.position.y = position[1] + Math.sin(time * 2.0) * 0.05;
      // Self rotate
      meshRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], position[1], position[2]]}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={color} wireframe={true} />
    </mesh>
  );
}

export default function SkillsPlanetarium({ active }: { active: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.4;
      coreRef.current.rotation.x = time * 0.2;
    }
  });

  // Nodes representing different skill categories in 3D grid space
  const center: [number, number, number] = [0, 3.0, 0];
  const nodeJava: [number, number, number] = [-1.2, 3.1, -0.8];
  const nodePlaywright: [number, number, number] = [1.2, 2.9, 0.8];
  const nodeSQL: [number, number, number] = [-0.8, 2.8, 1.2];
  const nodePostman: [number, number, number] = [0.8, 3.2, -1.2];
  const nodeManual: [number, number, number] = [-1.5, 3.0, 0.5];
  const nodeGuidewire: [number, number, number] = [1.5, 3.0, -0.5];

  if (!active) return null;

  return (
    <group>
      {/* Central Command Core (Automation hub) */}
      <mesh ref={coreRef} position={center}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial color="#00f076" wireframe={true} />
      </mesh>

      {/* Outer Grid Cluster Nodes */}
      <TestGridNode position={nodeJava} color="#ffb300" size={0.12} timeOffset={0} />
      <TestGridNode position={nodePlaywright} color="#00f076" size={0.15} timeOffset={1} />
      <TestGridNode position={nodeSQL} color="#ff2e5b" size={0.11} timeOffset={2} />
      <TestGridNode position={nodePostman} color="#00f076" size={0.12} timeOffset={3} />
      <TestGridNode position={nodeManual} color="#ffb300" size={0.14} timeOffset={4} />
      <TestGridNode position={nodeGuidewire} color="#00f076" size={0.15} timeOffset={5} />

      {/* Grid Interconnect Lines (Tests telemetry beams) */}
      <Line points={[center, nodeJava]} color="#ffb300" lineWidth={1.0} transparent={true} opacity={0.3} />
      <Line points={[center, nodePlaywright]} color="#00f076" lineWidth={1.5} transparent={true} opacity={0.5} />
      <Line points={[center, nodeSQL]} color="#ff2e5b" lineWidth={1.0} transparent={true} opacity={0.3} />
      <Line points={[center, nodePostman]} color="#00f076" lineWidth={1.0} transparent={true} opacity={0.4} />
      <Line points={[center, nodeManual]} color="#ffb300" lineWidth={1.0} transparent={true} opacity={0.3} />
      <Line points={[center, nodeGuidewire]} color="#00f076" lineWidth={1.5} transparent={true} opacity={0.5} />

      {/* Interlocking border line rings */}
      <Line
        points={[nodeJava, nodePostman, nodeGuidewire, nodePlaywright, nodeSQL, nodeManual, nodeJava]}
        color="rgba(0, 240, 118, 0.15)"
        lineWidth={0.5}
      />
    </group>
  );
}

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface NodeProps {
  position: [number, number, number];
  color: string;
  timeOffset: number;
}

function PipelineServer({ position, color, timeOffset }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + timeOffset;
    if (meshRef.current) {
      // Float up and down
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.08;
      // Pulse scale
      const s = 1.0 + Math.sin(time * 4.0) * 0.05;
      meshRef.current.scale.set(s, s, s);
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.8;
      coreRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.08;
    }
  });

  return (
    <group>
      {/* Outer server casing box */}
      <mesh ref={meshRef} position={[position[0], position[1], position[2]]}>
        <boxGeometry args={[0.26, 0.35, 0.26]} />
        <meshBasicMaterial color={color} wireframe={true} transparent={true} opacity={0.3} />
      </mesh>

      {/* Inner glowing core */}
      <mesh ref={coreRef} position={[position[0], position[1], position[2]]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshBasicMaterial color={color} wireframe={true} />
      </mesh>
    </group>
  );
}

export default function ExperienceNodes({ active }: { active: boolean }) {
  const signalRef = useRef<THREE.Mesh>(null);

  // Server positions in the 3D pipeline
  const node1: [number, number, number] = [-2.2, -1.2, 0];       // Western Reserve Group
  const node2: [number, number, number] = [-1.4, -0.9, 0.4];     // Southern Pioneer
  const node3: [number, number, number] = [-0.6, -1.3, -0.1];    // AFR Mutual

  useFrame((state) => {
    if (!signalRef.current) return;
    const time = state.clock.getElapsedTime();
    const cycle = (time * 0.6) % 2; // ranges from 0 to 2
    
    const p1 = new THREE.Vector3(...node1);
    const p2 = new THREE.Vector3(...node2);
    const p3 = new THREE.Vector3(...node3);
    
    // Animate signal pulse flowing along pipelines
    if (cycle < 1) {
      signalRef.current.position.lerpVectors(p1, p2, cycle);
    } else {
      signalRef.current.position.lerpVectors(p2, p3, cycle - 1);
    }
    
    // Add floating jitter to matching the server movements
    const floatTime = time + (cycle < 1 ? 0 : 2);
    signalRef.current.position.y += Math.sin(floatTime * 1.5) * 0.08;
  });

  if (!active) return null;

  return (
    <group>
      {/* 3D Pipeline Server nodes */}
      <PipelineServer position={node1} color="#00f076" timeOffset={0} />
      <PipelineServer position={node2} color="#ffb300" timeOffset={2} />
      <PipelineServer position={node3} color="#ff2e5b" timeOffset={4} />

      {/* Pipeline connection lines */}
      <Line
        points={[node1, node2]}
        color="#00f076"
        lineWidth={1.5}
        transparent={true}
        opacity={0.4}
      />
      <Line
        points={[node2, node3]}
        color="#ffb300"
        lineWidth={1.5}
        transparent={true}
        opacity={0.4}
      />

      {/* Pulsing signal packet */}
      <mesh ref={signalRef}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#00f076" blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* Matrix grid base floor */}
      <gridHelper args={[8, 8, '#00f076', 'rgba(0, 240, 118, 0.08)']} position={[-1.4, -2.0, 0]} />
    </group>
  );
}

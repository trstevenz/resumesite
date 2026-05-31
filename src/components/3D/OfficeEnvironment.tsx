import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function OfficeEnvironment() {
  const serverLEDsRef = useRef<THREE.Group>(null);
  const consoleRef = useRef<THREE.Group>(null);
  const seatRef = useRef<THREE.Mesh>(null);

  // Blinking LEDs on server racks & subtle floating rotation for sci-fi consoles
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (serverLEDsRef.current) {
      serverLEDsRef.current.children.forEach((led, idx) => {
        const blinkSpeed = 3 + (idx % 4);
        const intensity = 0.2 + Math.sin(time * blinkSpeed + idx) * 0.8;
        const mat = (led as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = intensity > 0.5 ? 1.0 : 0.25;
        }
      });
    }

    if (consoleRef.current) {
      // Levitating float animation
      consoleRef.current.position.y = Math.sin(time * 1.2) * 0.03;
    }

    if (seatRef.current) {
      seatRef.current.rotation.y = time * 0.25;
      seatRef.current.position.y = Math.sin(time * 1.5) * 0.04;
    }
  });

  return (
    <group position={[0, -1.2, 0]}>
      {/* 1. Cyber Grid Floor (Mint Green Grid Matrix) */}
      <gridHelper args={[40, 40, '#00f076', 'rgba(0, 240, 118, 0.05)']} position={[0, -0.05, 0]} />

      {/* 2. Floating Cyber Walls / Grid Panels */}
      {/* Back Wall Grid */}
      <gridHelper args={[30, 15, '#00f076', 'rgba(0, 240, 118, 0.03)']} position={[0, 3.5, -8]} rotation={[Math.PI / 2, 0, 0]} />
      {/* Left Wall Grid */}
      <gridHelper args={[30, 15, '#00f076', 'rgba(0, 240, 118, 0.03)']} position={[-8, 3.5, 0]} rotation={[0, 0, Math.PI / 2]} />

      {/* Floating Holographic Whiteboard (Glass screen with neon border) */}
      <group position={[1.22, 1.25, 4.2]}>
        {/* Holographic glowing borders */}
        <mesh>
          <boxGeometry args={[0.02, 1.34, 2.14]} />
          <meshBasicMaterial color="#00f076" wireframe={true} transparent={true} opacity={0.4} />
        </mesh>
        {/* Translucent glass board sheet */}
        <mesh position={[-0.005, 0, 0]}>
          <boxGeometry args={[0.005, 1.24, 2.0]} />
          <meshBasicMaterial color="#00f076" transparent={true} opacity={0.06} />
        </mesh>
      </group>

      {/* 3. Levitating Holographic Command Console (Floating glass plate) */}
      <group ref={consoleRef}>
        {/* Console Desktop Plate */}
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[2.5, 0.02, 1.2]} />
          <meshBasicMaterial color="#00f076" transparent={true} opacity={0.15} />
        </mesh>
        {/* Glowing Neon Desktop Border */}
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[2.52, 0.025, 1.22]} />
          <meshBasicMaterial color="#00f076" wireframe={true} transparent={true} opacity={0.5} />
        </mesh>
        
        {/* Levitating nodes instead of solid legs */}
        <mesh position={[-1.1, 0.3, -0.5]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color="#00f076" wireframe={true} />
        </mesh>
        <mesh position={[1.1, 0.3, -0.5]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color="#00f076" wireframe={true} />
        </mesh>
        <mesh position={[-1.1, 0.3, 0.5]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color="#00f076" wireframe={true} />
        </mesh>
        <mesh position={[1.1, 0.3, 0.5]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color="#00f076" wireframe={true} />
        </mesh>
      </group>

      {/* 4. Levitating Seat Core Node (Holographic Data Crystal) */}
      <group position={[0, 0.45, 0.8]}>
        {/* Base Grid */}
        <gridHelper args={[1.2, 4, '#ffb300', 'rgba(255, 179, 0, 0.15)']} position={[0, -0.4, 0]} />
        
        {/* Spinning Levitating Octahedron core node representing the Seat */}
        <mesh ref={seatRef} position={[0, 0.05, 0]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshBasicMaterial color="#ffb300" wireframe={true} transparent={true} opacity={0.6} />
        </mesh>
      </group>

      {/* 5. Translucent Hologram Monitor Screen bezel */}
      <group position={[0, 0.8, -0.1]}>
        {/* Hologram Core Base */}
        <mesh position={[0, 0.05, 0]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color="#00f076" wireframe={true} />
        </mesh>
        {/* Floating Screen bezel wireframe */}
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[0.92, 0.52, 0.01]} />
          <meshBasicMaterial color="#00f076" wireframe={true} transparent={true} opacity={0.5} />
        </mesh>
        {/* Screen glass backing */}
        <mesh position={[0, 0.26, 0.005]}>
          <planeGeometry args={[0.9, 0.5]} />
          <meshBasicMaterial color="#00f076" transparent={true} opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 6. Wireframe Keyboard Console */}
      <mesh position={[0, 0.785, 0.2]}>
        <boxGeometry args={[0.46, 0.015, 0.16]} />
        <meshBasicMaterial color="#00f076" wireframe={true} transparent={true} opacity={0.4} />
      </mesh>

      {/* 7. Cyber Server Cabinets (Glowing wireframe racks) */}
      <group position={[-2.8, 1.0, -1.0]}>
        {/* Wireframe Tower Cabinet Box */}
        <mesh>
          <boxGeometry args={[1.0, 2.0, 0.9]} />
          <meshBasicMaterial color="#00f076" wireframe={true} transparent={true} opacity={0.25} />
        </mesh>
        {/* Inner solid translucent glass cabinet */}
        <mesh scale={0.98}>
          <boxGeometry args={[1.0, 2.0, 0.9]} />
          <meshBasicMaterial color="#0c121e" transparent={true} opacity={0.5} />
        </mesh>
        
        {/* Server Horizontal Slot Trays */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[0, 0.8 - i * 0.22, 0.46]}>
            <boxGeometry args={[0.88, 0.12, 0.01]} />
            <meshBasicMaterial color="#00f076" wireframe={true} transparent={true} opacity={0.4} />
          </mesh>
        ))}

        {/* LED rack status indicators */}
        <group ref={serverLEDsRef}>
          {Array.from({ length: 8 }).map((_, i) => {
            const y = 0.8 - i * 0.22;
            const isGreen = i % 3 === 0;
            return (
              <mesh key={i} position={[0.35, y, 0.47]}>
                <sphereGeometry args={[0.018, 8, 8]} />
                <meshBasicMaterial color={isGreen ? '#00f076' : '#ffb300'} transparent={true} />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
}

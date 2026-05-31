import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function OfficeEnvironment() {
  const serverLEDsRef = useRef<THREE.Group>(null);

  // Blinking LEDs on server racks
  useFrame((state) => {
    if (!serverLEDsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    serverLEDsRef.current.children.forEach((led, idx) => {
      // Create random blinking intervals for server rack indicators
      const blinkSpeed = 3 + (idx % 4);
      const intensity = 0.2 + Math.sin(time * blinkSpeed + idx) * 0.8;
      
      const mat = (led as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = intensity > 0.5 ? 1.0 : 0.2;
      }
    });
  });

  return (
    <group position={[0, -1.2, 0]}>
      {/* 1. Office Floor (Dark Grey Corporate Carpet) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1f2937" roughness={0.9} />
      </mesh>

      {/* 2. Office Wall (Light Grey Painted Drywall) */}
      <mesh position={[0, 4, -8]}>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.8} />
      </mesh>
      
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-8, 4, 0]}>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.8} />
      </mesh>

      {/* Drywall partition on the right side of corridor (hallway boundary) */}
      <mesh position={[1.25, 1.25, 4.0]}>
        <boxGeometry args={[0.04, 2.5, 5.0]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.8} />
      </mesh>

      {/* Presentation Whiteboard mounted on the right partition */}
      <group position={[1.22, 1.25, 4.2]}>
        {/* Whiteboard metal frame */}
        <mesh>
          <boxGeometry args={[0.02, 1.3, 2.1]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Whiteboard white board sheet */}
        <mesh position={[-0.005, 0, 0]}>
          <boxGeometry args={[0.01, 1.24, 2.0]} />
          <meshStandardMaterial color="#f9fafb" roughness={0.1} />
        </mesh>
      </group>

      {/* 3. Executive Office Desk (Walnut Wood Top & Steel Legs) */}
      {/* Desk Top */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[2.5, 0.06, 1.2]} />
        <meshStandardMaterial color="#78350f" roughness={0.5} metalness={0.1} /> {/* Brown walnut color */}
      </mesh>
      {/* Desk Legs */}
      <mesh position={[-1.1, 0.375, -0.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.75]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.1, 0.375, -0.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.75]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-1.1, 0.375, 0.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.75]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.1, 0.375, 0.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.75]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 4. Ergonomic Mesh Office Chair (Desk Seat, Support, Armrests) */}
      <group position={[0, 0.45, 0.8]}>
        {/* Support Base & Wheels Base */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05]} />
          <meshStandardMaterial color="#111827" metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.35]} />
          <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Seat Cushion */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.55, 0.06, 0.55]} />
          <meshStandardMaterial color="#1f2937" roughness={0.8} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.35, -0.25]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.5, 0.6, 0.05]} />
          <meshStandardMaterial color="#111827" roughness={0.7} />
        </mesh>
        {/* Chair Neck Support */}
        <mesh position={[0, 0.7, -0.27]}>
          <boxGeometry args={[0.25, 0.1, 0.04]} />
          <meshStandardMaterial color="#1f2937" roughness={0.7} />
        </mesh>
      </group>

      {/* 5. LCD Computer Workstation Monitor Screen */}
      <group position={[0, 0.8, -0.1]}>
        {/* Monitor Base Support Stand */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.015, 0.025, 0.15]} />
          <meshStandardMaterial color="#374151" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.0, 0]}>
          <boxGeometry args={[0.25, 0.01, 0.2]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Monitor Frame */}
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[0.9, 0.5, 0.04]} />
          <meshStandardMaterial color="#1f2937" roughness={0.4} />
        </mesh>
        {/* LCD Glass Screen Panel (underlay for 3D HTML) */}
        <mesh position={[0, 0.26, 0.021]}>
          <planeGeometry args={[0.86, 0.46]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>

      {/* 6. Desk Accessories: Keyboard, Coffee Mug & Desk Plant */}
      {/* Keyboard */}
      <mesh position={[0, 0.785, 0.2]}>
        <boxGeometry args={[0.45, 0.01, 0.15]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      {/* Coffee Mug */}
      <mesh position={[-0.6, 0.835, 0.15]}>
        <cylinderGeometry args={[0.04, 0.04, 0.1]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} /> {/* Red mug */}
      </mesh>
      {/* Potted desk plant */}
      <group position={[0.7, 0.85, -0.15]}>
        {/* Pot */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.06, 0.045, 0.08]} />
          <meshStandardMaterial color="#d97706" roughness={0.6} /> {/* Terracotta pot */}
        </mesh>
        {/* Green leaves */}
        <mesh position={[0, 0.03, 0]}>
          <sphereGeometry args={[0.075, 8, 8]} />
          <meshStandardMaterial color="#059669" roughness={0.8} />
        </mesh>
        <mesh position={[0.04, 0.05, 0.03]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#10b981" roughness={0.8} />
        </mesh>
      </group>

      {/* 7. Standard Corporate Server Cabinets */}
      <group position={[-2.8, 1.0, -1.0]}>
        {/* Main Cabinet Box */}
        <mesh>
          <boxGeometry args={[1.0, 2.0, 0.9]} />
          <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Server Horizontal Slots Details */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[0, 0.8 - i * 0.22, 0.46]}>
            <boxGeometry args={[0.88, 0.12, 0.01]} />
            <meshStandardMaterial color="#1f2937" roughness={0.6} />
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
                <meshBasicMaterial color={isGreen ? '#10b981' : '#f59e0b'} transparent={true} />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* 8. Extra Potted Office Palm Plant in corner */}
      <group position={[3.2, 0.6, -4.5]}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.25, 0.2, 0.4]} />
          <meshStandardMaterial color="#f3f4f6" roughness={0.3} />
        </mesh>
        {/* Palm Leaves */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.35, 12, 12]} />
          <meshStandardMaterial color="#047857" roughness={0.9} />
        </mesh>
        <mesh position={[0.2, 0.6, 0.1]}>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshStandardMaterial color="#065f46" roughness={0.9} />
        </mesh>
        <mesh position={[-0.2, 0.5, -0.15]}>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshStandardMaterial color="#065f46" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

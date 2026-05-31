import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../hooks/usePerformance';

export default function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { lowPerformance } = usePerformance();

  // Create falling binary/telemetry streams
  const count = lowPerformance ? 800 : 2500;
  
  // We keep track of starting configurations in memo arrays
  const [positions, colors, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const spds = new Float32Array(count);

    const greenColor = new THREE.Color('#00f076');
    const goldColor = new THREE.Color('#ffb300');
    const darkSlate = new THREE.Color('#1e293b');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Place streams on a grid-like horizontal layout with noise
      const gridCol = (i % 25) - 12.5; // X distribution
      const gridRow = Math.floor(i / 25) % 25 - 12.5; // Z distribution
      
      const xNoise = (Math.random() - 0.5) * 0.8;
      const zNoise = (Math.random() - 0.5) * 0.8;

      pos[i3] = gridCol * 1.2 + xNoise; // X
      pos[i3 + 1] = (Math.random() - 0.5) * 15; // Y (height ranges from -7.5 to 7.5)
      pos[i3 + 2] = gridRow * 1.2 + zNoise; // Z

      // Speeds of falling columns
      spds[i] = 1.5 + Math.random() * 2.5;

      // Color nodes: 80% passing green, 15% warning gold, 5% blank/slate
      const roll = Math.random();
      let pointColor = greenColor;
      if (roll > 0.9) {
        pointColor = darkSlate;
      } else if (roll > 0.75) {
        pointColor = goldColor;
      }

      cols[i3] = pointColor.r;
      cols[i3 + 1] = pointColor.g;
      cols[i3 + 2] = pointColor.b;
    }
    return [pos, cols, spds];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    
    if (!posAttr) return;

    // Shift Y positions downwards based on speeds
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let y = posAttr.array[i3 + 1];
      
      // Decrease height
      y -= speeds[i] * delta * 0.8;
      
      // Reset to top if it drops below floor
      if (y < -8) {
        y = 8;
      }
      
      posAttr.array[i3 + 1] = y;
    }
    
    posAttr.needsUpdate = true;
    
    // Add subtle rotational shift to the matrix streams grid
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={lowPerformance ? 0.08 : 0.05}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        transparent={true}
        opacity={0.25}
      />
    </points>
  );
}

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HumanCharacterProps {
  scrollPercent: number;
}

export default function HumanCharacter({ scrollPercent }: HumanCharacterProps) {
  const characterRef = useRef<THREE.Group>(null);
  
  // Limbs references for walk/sit animations
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const torsoRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!characterRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Position Interpolation based on scroll
    // Scroll 0% -> entrance corridor [0, -0.3, 5.0]
    // Scroll 25% -> desk chair position [0, -0.75, 0.8]
    // Facing desk (which sits at Z = 0)
    
    let targetPos = new THREE.Vector3(0, -1.15, 5.0);
    let targetRotY = 0; // facing the hallway
    let sittingPercent = 0; // 0 = standing, 1 = sitting

    if (scrollPercent <= 0.25) {
      // Walking down the corridor on the floor (Y = -1.15) towards the desk
      const t = scrollPercent / 0.25;
      targetPos.set(0, -1.15 + t * 0.175, 5.0 - t * 4.2); // Y goes to -0.975 (chair cushion), Z goes to 0.8
      targetRotY = Math.PI; // Face the desk
      sittingPercent = t; // Interpolate sitting posture
    } else {
      // Sitting at desk typing
      targetPos.set(0, -0.975, 0.8);
      targetRotY = Math.PI;
      sittingPercent = 1;
    }

    // Smoothly apply position and rotation
    characterRef.current.position.lerp(targetPos, 0.1);
    characterRef.current.rotation.y = THREE.MathUtils.lerp(characterRef.current.rotation.y, targetRotY, 0.1);

    // 2. Animate limbs based on walk vs. sit states
    const isWalking = scrollPercent > 0.01 && scrollPercent < 0.25;

    if (isWalking) {
      // Walk cycle oscillations (arms and legs swing opposite)
      const swingSpeed = 12;
      const swingAngle = 0.5;
      
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(time * swingSpeed) * swingAngle;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(time * swingSpeed) * swingAngle;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -Math.sin(time * swingSpeed) * swingAngle * 0.8;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(time * swingSpeed) * swingAngle * 0.8;
    } else if (sittingPercent >= 0.9) {
      // Seated posture (legs bent 90deg, arms raised to keyboard typing)
      const typingWobble = Math.sin(time * 15) * 0.05; // tiny typing arm wiggle

      if (leftLegRef.current) leftLegRef.current.rotation.x = -Math.PI / 2.2;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.PI / 2.2;
      
      // Arms up typing on keyboard
      if (leftArmRef.current) leftArmRef.current.rotation.x = -Math.PI / 2.5 + typingWobble;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -Math.PI / 2.5 - typingWobble;
    } else {
      // Reset limbs stand straight
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (leftArmRef.current) leftArmRef.current.rotation.x = 0;
      if (rightArmRef.current) rightArmRef.current.rotation.x = 0;
    }
  });

  return (
    <group ref={characterRef} position={[0, -1.15, 5.0]}>
      {/* Torso (Blue Dress Shirt) */}
      <mesh ref={torsoRef} position={[0, 0.45, 0]}>
        <boxGeometry args={[0.26, 0.45, 0.16]} />
        <meshStandardMaterial color="#2563eb" roughness={0.7} /> {/* Blue shirt */}
      </mesh>

      {/* Head & Hair */}
      <group position={[0, 0.76, 0]}>
        {/* Face */}
        <mesh ref={headRef}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#fbcfe8" roughness={0.8} /> {/* Flesh pink */}
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 0.05, -0.02]}>
          <boxGeometry args={[0.24, 0.1, 0.22]} />
          <meshStandardMaterial color="#451a03" roughness={0.9} /> {/* Brown hair */}
        </mesh>
      </group>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.17, 0.45, 0]} name="leftArm">
        {/* Pivot offset so rotation happens at shoulder (Y: +0.22) */}
        <boxGeometry args={[0.07, 0.35, 0.07]} />
        <meshStandardMaterial color="#2563eb" roughness={0.7} />
      </mesh>

      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.17, 0.45, 0]} name="rightArm">
        <boxGeometry args={[0.07, 0.35, 0.07]} />
        <meshStandardMaterial color="#2563eb" roughness={0.7} />
      </mesh>

      {/* Left Leg (Grey Trousers) */}
      <mesh ref={leftLegRef} position={[-0.09, 0.1, 0]} name="leftLeg">
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <meshStandardMaterial color="#374151" roughness={0.8} /> {/* Dark trousers */}
      </mesh>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.09, 0.1, 0]} name="rightLeg">
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <meshStandardMaterial color="#374151" roughness={0.8} />
      </mesh>
    </group>
  );
}

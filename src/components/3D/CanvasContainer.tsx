import { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import OfficeEnvironment from './OfficeEnvironment';
import HumanCharacter from './HumanCharacter';
import BackgroundParticles from './BackgroundParticles';
import ExperienceNodes from './ExperienceNodes';
import SkillsPlanetarium from './SkillsPlanetarium';
import { usePerformance } from '../../hooks/usePerformance';

// Import 2D Overlay content panels to embed in 3D
import Hero from '../Hero';
import About from '../About';
import Experience from '../Experience';
import Skills from '../Skills';
import Projects from '../Projects';
import Education from '../Education';
import Contact from '../Contact';

// Internal controller to handle camera movements relative to scroll position
function CameraController({ scrollPercent }: { scrollPercent: number }) {
  const { camera } = useThree();
  
  // Interpolate camera position and target based on scroll fraction (0 to 1)
  useFrame(() => {
    // 0.0 -> entrance corridor (looking at wall whiteboard face-on)
    // 0.20 -> sitting down (monitor view over shoulder)
    // 0.45 -> servers (experience log checkups)
    // 0.70 -> skills (desk tablet console)
    // 0.88 -> contact (holographic terminal)
    // 1.0 -> exit zoom
    
    let targetPos = new THREE.Vector3(0.6, 0.4, 6.0);
    let targetLook = new THREE.Vector3(0, 0.2, 0);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (scrollPercent <= 0.2) {
      // 1. Hero Plaque Focus (Looking face-on at X = 1.20, Z = 4.2 from the left X = -0.5)
      const t = scrollPercent / 0.2;
      const startX = isMobile ? -1.0 : -0.5;
      const startZ = isMobile ? 5.2 : 5.0;
      const endX = 0.0;
      const endY = 0.15;
      const endZ = isMobile ? 1.6 : 1.25;
      
      targetPos.set(
        startX + t * (endX - startX),
        0.05 + t * (endY - 0.05),
        startZ + t * (endZ - startZ)
      );
      targetLook.set(
        1.20 + t * (0.0 - 1.20),
        0.05 + t * (-0.1 - 0.05),
        4.2 + t * (-0.1 - 4.2)
      );
    } else if (scrollPercent <= 0.45) {
      // 2. About Dossier (Workstation Monitor over-the-shoulder view)
      const t = (scrollPercent - 0.2) / 0.25;
      const startX = 0.0;
      const startY = 0.15;
      const startZ = isMobile ? 1.6 : 1.25;
      const endX = -1.025;
      const endY = 0.05;
      const endZ = isMobile ? 1.0 : 0.6;
      
      targetPos.set(
        startX + t * (endX - startX),
        startY + t * (endY - startY),
        startZ + t * (endZ - startZ)
      );
      targetLook.set(
        0.0 + t * (-1.75 - 0.0),
        -0.1 + t * (0.05 - (-0.1)),
        -0.1 + t * (-0.4 - (-0.1))
      );
    } else if (scrollPercent <= 0.7) {
      // 3. Experience server logs (Looking at servers X = -1.75, Z = -0.4)
      const t = (scrollPercent - 0.45) / 0.25;
      const startX = -1.025;
      const startY = 0.05;
      const startZ = isMobile ? 1.0 : 0.6;
      const endX = 0.55;
      const endY = 0.4;
      const endZ = isMobile ? 1.3 : 0.86;
      
      targetPos.set(
        startX + t * (endX - startX),
        startY + t * (endY - startY),
        startZ + t * (endZ - startZ)
      );
      targetLook.set(-1.75 + t * 2.3, 0.05 - t * 0.45, -0.4 + t * 0.68);
    } else if (scrollPercent <= 0.88) {
      // 4. Skills desk tablet (Looking at tablet X = 0.55, Z = 0.28)
      const t = (scrollPercent - 0.7) / 0.18;
      const startX = 0.55;
      const startY = 0.4;
      const startZ = isMobile ? 1.3 : 0.86;
      const endX = 0.0;
      const endY = 0.25;
      const endZ = isMobile ? 1.8 : 1.3;
      
      targetPos.set(
        startX + t * (endX - startX),
        startY + t * (endY - startY),
        startZ + t * (endZ - startZ)
      );
      targetLook.set(0.55 - t * 0.55, -0.4 + t * 0.65, 0.28 - t * 0.18);
    } else {
      // 5. Contact hologram (Looking center above keyboard)
      const startX = 0.0;
      const startY = 0.25;
      const startZ = isMobile ? 1.8 : 1.3;
      
      targetPos.set(startX, startY, startZ);
      targetLook.set(0.0, 0.25, 0.1);
    }

    // Smoothly transition camera position
    camera.position.lerp(targetPos, 0.06);
    
    // Look at target smoothly
    const currentLook = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLook.lerp(targetLook, 0.06);
    camera.lookAt(currentLook);
  });

  return null;
}

interface CanvasContainerProps {
  scrollPercent: number;
}

export default function CanvasContainer({ scrollPercent }: CanvasContainerProps) {
  const { lowPerformance } = usePerformance();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent">
      <Canvas
        gl={{ antialias: !lowPerformance, alpha: true, powerPreference: "high-performance" }}
        dpr={lowPerformance ? 1 : [1, 2]}
        camera={{ position: [0, 0.4, 6.0], fov: 50 }}
      >
        {/* Desk lights - standard natural office illumination */}
        <ambientLight intensity={lowPerformance ? 1.4 : 1.0} />
        <pointLight position={[0, 3, 0]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-2.8, 2.5, -1.0]} intensity={1.0} color="#10b981" /> {/* Green server glow */}
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fef08a" /> {/* Sunny window light */}

        {/* Office Room Geometry */}
        <OfficeEnvironment />

        {/* Stylized Human Character */}
        <HumanCharacter scrollPercent={scrollPercent} />

        {/* Faint falling binary code streams in the windows/background grids */}
        <BackgroundParticles />
        
        {/* Server connection nodes & Skills grid cluster overlays */}
        {scrollPercent > 0.45 && scrollPercent < 0.8 && <ExperienceNodes active={true} />}
        {scrollPercent > 0.65 && <SkillsPlanetarium active={true} />}

        {/* Camera Rig controller */}
        <CameraController scrollPercent={scrollPercent} />

        {/* ========================================================= */}
        {/* 3D EMBEDDED RESUME DETAILS PANEL MATRIX (Drei HTML 3D transforms) */}
        {/* ========================================================= */}

        {/* 1. HERO WALL PLAQUE (Entrance corridor wall - Whiteboard style) */}
        {scrollPercent <= 0.20 && (
          <group position={[1.20, 0.05, 4.2]} rotation={[0, -Math.PI / 2, 0]}>
            <Html
              transform
              pointerEvents="auto"
              distanceFactor={isMobile ? 0.28 : 0.8}
              className={`${isMobile ? 'w-[340px]' : 'w-[1000px]'} pointer-events-auto select-none select-text animate-fade-in`}
            >
              <Hero />
            </Html>
          </group>
        )}

        {/* 2. ABOUT INFO (Rendered directly inside computer screen monitor) */}
        {scrollPercent > 0.20 && scrollPercent <= 0.45 && (
          <group position={[0, -0.14, -0.076]} rotation={[0, 0, 0]}>
            <Html
              transform
              pointerEvents="auto"
              distanceFactor={isMobile ? 0.29 : 0.75} // Fits tightly inside the monitor width bounds in over-the-shoulder view
              className={`${isMobile ? 'w-[340px] h-[500px]' : 'w-[860px] h-[460px]'} pointer-events-auto overflow-y-auto overflow-x-hidden scrollbar-thin rounded-md animate-fade-in`}
            >
              <About />
            </Html>
          </group>
        )}

        {/* 3. EXPERIENCE DOSSIER (Floating beside the server racks) */}
        {scrollPercent > 0.45 && scrollPercent <= 0.70 && (
          <group position={[-1.73, 0.05, -0.38]} rotation={[0, Math.PI / 5, 0]}>
            <Html
              transform
              pointerEvents="auto"
              distanceFactor={isMobile ? 0.29 : 0.8}
              className={`${isMobile ? 'w-[340px] h-[520px]' : 'w-[950px]'} pointer-events-auto overflow-y-auto overflow-x-hidden scrollbar-thin animate-fade-in`}
            >
              <Experience />
            </Html>
          </group>
        )}

        {/* 4. SKILLS & PROJECTS (Slanted tablet panel sitting on the desk top) */}
        {scrollPercent > 0.70 && scrollPercent <= 0.88 && (
          <group position={[0.55, -0.4, 0.28]} rotation={[-Math.PI / 5, 0, 0]}>
            <Html
              transform
              pointerEvents="auto"
              distanceFactor={isMobile ? 0.26 : 0.65}
              className={`${isMobile ? 'w-[340px] h-[600px]' : 'w-[850px] h-[580px]'} pointer-events-auto overflow-y-auto scrollbar-thin rounded-2xl animate-fade-in`}
            >
              <div className="space-y-6 pb-6 bg-[#090b0f]/95 border-[8px] border-slate-900 rounded-3xl p-8 shadow-2xl relative">
                {/* Mock tablet details */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-1 bg-slate-800 rounded-full" />
                <div className="absolute top-2 right-6 flex items-center gap-1 text-[8px] font-share text-slate-500 select-none">
                  <span>📶 100% 🔋</span>
                </div>
                
                <div className="space-y-8 pt-4">
                  <Skills />
                  <Projects />
                </div>
              </div>
            </Html>
          </group>
        )}

        {/* 5. EDUCATION & CONTACT TERMINAL (Holographic projection above desk) */}
        {scrollPercent > 0.88 && (
          <group position={[0, 0.35, 0.1]} rotation={[-Math.PI / 18, 0, 0]}>
            <Html
              transform
              pointerEvents="auto"
              distanceFactor={isMobile ? 0.29 : 0.8}
              className={`${isMobile ? 'w-[340px] h-[600px]' : 'w-[950px] h-[650px]'} pointer-events-auto overflow-y-auto scrollbar-thin animate-fade-in`}
            >
              <div className="space-y-8 pb-4">
                <Education />
                <Contact />
              </div>
            </Html>
          </group>
        )}

        {/* Vignette postprocessing effect */}
        {!lowPerformance && (
          <EffectComposer multisampling={4}>
            <Vignette eskil={false} offset={0.15} darkness={0.95} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

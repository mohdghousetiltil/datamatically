
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing JSX intrinsic elements in TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      icosahedronGeometry: any;
      meshStandardMaterial: any;
      octahedronGeometry: any;
      torusKnotGeometry: any;
      sphereGeometry: any;
      boxGeometry: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      fog: any;
    }
  }
}

interface SceneProps {
  isDark: boolean;
}

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const GalaxyWrapper = ({ children }: { children?: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null!);
  
  // Optimization: Don't query DOM geometry every frame. 
  // We use a normalized scroll approximation.
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Use window.scrollY directly, it's generally performant enough.
      // Normalize roughly against a typical page height (e.g., 5000px) for effect
      // instead of forcing layout calc with document.body.scrollHeight
      const scrollY = window.scrollY;
      const scrollP = Math.min(scrollY / 4000, 1); 

      const targetRot = scrollP * Math.PI * 2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot, delta * 1.5);

      const targetZ = scrollP * 5;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 1.5);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

const ParticleField = ({ isDark, isMobile }: { isDark: boolean, isMobile: boolean }) => {
  const ref = useRef<THREE.Points>(null!);
  
  // Drastically reduce count for mobile to ensure accessibility/performance
  const count = isMobile ? 800 : 2000; 
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;     
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35; 
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 50; // Slower rotation for less dizziness/noise
      // Reduced mouse influence for accessibility
      const x = state.pointer.x * 0.05;
      const y = state.pointer.y * 0.05;
      ref.current.rotation.x += (y - ref.current.rotation.x) * delta * 0.2;
      ref.current.rotation.y += (x - ref.current.rotation.y) * delta * 0.2;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isDark ? "#3b82f6" : "#2563eb"}
          size={isMobile ? 0.04 : 0.025} // Slightly larger but fewer points on mobile
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isDark ? 0.25 : 0.4} // Lower opacity for better text contrast
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Component helper for the satellites
const OrbitalRing = ({ radius, speed, axis = 'x', color = "#60a5fa" }: { radius: number, speed: number, axis?: 'x'|'y'|'z', color?: string }) => {
    const ref = useRef<THREE.Group>(null!);
    
    useFrame((state, delta) => {
        if(ref.current) {
            if(axis === 'x') ref.current.rotation.x += delta * speed;
            if(axis === 'y') ref.current.rotation.y += delta * speed;
            if(axis === 'z') ref.current.rotation.z += delta * speed;
        }
    });

    return (
        <group ref={ref}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusKnotGeometry args={[radius, 0.02, 64, 8, 2, 3]} /> 
                <meshStandardMaterial color={color} wireframe opacity={0.2} transparent />
            </mesh>
        </group>
    )
}

const OrbitalParticle = ({ radius, speed, offset, size, color }: { radius: number, speed: number, offset: number, size: number, color: string }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if(ref.current) {
      const t = state.clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
    }
  });
  return (
     <mesh ref={ref}>
       <sphereGeometry args={[size, 16, 16]} />
       <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} toneMapped={false} />
     </mesh>
  )
}

const DataNucleus = ({ isDark, isMobile }: { isDark: boolean, isMobile: boolean }) => {
    const coreRef = useRef<THREE.Mesh>(null!);
    const shellRef = useRef<THREE.Group>(null!);

    useFrame((state, delta) => {
        if (coreRef.current) {
             const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05; // gentler pulse
             coreRef.current.scale.set(scale, scale, scale);
             coreRef.current.rotation.y += delta * 0.3;
             coreRef.current.rotation.z += delta * 0.1;
        }
        if (shellRef.current) {
            shellRef.current.rotation.y -= delta * 0.1;
        }
    });
    
    const coreColor = isDark ? "#3b82f6" : "#2563eb";
    const shellColor = isDark ? "#8b5cf6" : "#7c3aed";
    const ringColor = isDark ? "#10b981" : "#059669";

    return (
        <group>
            {/* Central Core */}
            <mesh ref={coreRef} position={[0,0,0]}>
                <octahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial 
                    color={coreColor} 
                    wireframe 
                    opacity={isDark ? 0.6 : 0.4} 
                    transparent 
                    emissive={coreColor}
                    emissiveIntensity={isDark ? 0.4 : 0.2}
                />
            </mesh>

            {/* Rotating Shells - hidden on very small screens if needed, but keeping for now */}
            <group ref={shellRef}>
                <mesh>
                    <icosahedronGeometry args={[2.2, 0]} />
                    <meshStandardMaterial color={shellColor} wireframe opacity={isDark ? 0.1 : 0.2} transparent side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* Reduced orbital complexity on mobile */}
            {!isMobile && (
              <>
                <OrbitalRing radius={3} speed={0.15} axis="z" color={ringColor} />
                <OrbitalRing radius={3.5} speed={0.1} axis="x" color={shellColor} />
              </>
            )}
            
            <OrbitalParticle radius={4} speed={0.4} offset={0} size={isMobile ? 0.08 : 0.1} color={isDark ? "#60a5fa" : "#3b82f6"} />
            <OrbitalParticle radius={4} speed={0.4} offset={2} size={isMobile ? 0.08 : 0.1} color={isDark ? "#a78bfa" : "#8b5cf6"} />
        </group>
    )
}

const InteractiveShapes = ({ isDark, isMobile }: { isDark: boolean, isMobile: boolean }) => {
    const groupRef = useRef<THREE.Group>(null!);
    
    useFrame((state, delta) => {
        if(groupRef.current) {
             groupRef.current.rotation.y += delta * 0.03; // slower default rotation
             
             // Very subtle mouse interaction to avoid distraction
             const x = state.pointer.x * 0.05;
             const y = state.pointer.y * 0.05;
             groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y, delta * 2);
             groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, x, delta * 2);
        }
    });

    const matProps = {
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.08 : 0.15 // Reduced opacity for accessibility
    };

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[4, 2, -5]}>
                    <icosahedronGeometry args={[1.5, 0]} />
                    <meshStandardMaterial color={isDark ? "#60a5fa" : "#2563eb"} {...matProps} />
                </mesh>
            </Float>
            
            {/* Show fewer distracting shapes on mobile */}
            {!isMobile && (
              <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                  <mesh position={[3, 5, -12]}>
                      <torusKnotGeometry args={[1.2, 0.4, 100, 16]} />
                      <meshStandardMaterial color={isDark ? "#10b981" : "#059669"} {...matProps} />
                  </mesh>
              </Float>
            )}

            <group position={[0, 0, -15]}>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <DataNucleus isDark={isDark} isMobile={isMobile} />
                </Float>
            </group>
        </group>
    )
}

const Scene = ({ isDark }: SceneProps) => {
  const isMobile = useMobile();

  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none" aria-hidden="true">
      {/* 
        Performance Optimization: 
        dpr={[1, 2]} caps the pixel ratio to 2. 
        Most mobiles have 3 or 4, which kills battery/performance for 3D.
      */}
      <Canvas 
        camera={{ position: [0, 0, 6], fov: isMobile ? 60 : 50 }} 
        dpr={[1, 2]}
        gl={{ 
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          alpha: true,
          powerPreference: "high-performance" 
        }}
      >
        <GalaxyWrapper>
            <ambientLight intensity={isDark ? 0.5 : 0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1} color={isDark ? "#60a5fa" : "#3b82f6"} />
            <pointLight position={[-10, -10, -5]} intensity={1} color={isDark ? "#8b5cf6" : "#7c3aed"} />
            
            <ParticleField isDark={isDark} isMobile={isMobile} />
            <InteractiveShapes isDark={isDark} isMobile={isMobile} />
        </GalaxyWrapper>
        
        <fog attach="fog" args={[isDark ? '#030712' : '#f8fafc', 5, 40]} />
      </Canvas>
    </div>
  );
};

export default Scene;

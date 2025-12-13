import React, { useRef, useMemo } from 'react';
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

declare module 'react' {
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

const GalaxyWrapper = ({ children }: { children?: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const scrollMax = document.body.scrollHeight - window.innerHeight;
    const scrollP = window.scrollY / (scrollMax || 1);

    if (groupRef.current) {
      const targetRot = scrollP * Math.PI * 2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot, delta * 1.5);

      const targetZ = scrollP * 8;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 1.5);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

const ParticleField = ({ isDark }: { isDark: boolean }) => {
  const ref = useRef<THREE.Points>(null!);
  
  const count = 4000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;     
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; 
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      const x = state.pointer.x * 0.1;
      const y = state.pointer.y * 0.1;
      ref.current.rotation.x += (y - ref.current.rotation.x) * delta * 0.2;
      ref.current.rotation.y += (x - ref.current.rotation.y) * delta * 0.2;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isDark ? "#3b82f6" : "#2563eb"} // Darker blue in light mode for visibility
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isDark ? 0.3 : 0.6} // More opaque in light mode
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
                <meshStandardMaterial color={color} wireframe opacity={0.3} transparent />
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
       <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
     </mesh>
  )
}

const DataNucleus = ({ isDark }: { isDark: boolean }) => {
    const coreRef = useRef<THREE.Mesh>(null!);
    const shellRef = useRef<THREE.Group>(null!);

    useFrame((state, delta) => {
        if (coreRef.current) {
             // Pulsating core
             const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
             coreRef.current.scale.set(scale, scale, scale);
             coreRef.current.rotation.y += delta * 0.5;
             coreRef.current.rotation.z += delta * 0.2;
        }
        if (shellRef.current) {
            shellRef.current.rotation.y -= delta * 0.2;
        }
    });
    
    // Wireframe colors based on theme
    const coreColor = isDark ? "#3b82f6" : "#2563eb";
    const shellColor = isDark ? "#8b5cf6" : "#7c3aed";
    const ringColor = isDark ? "#10b981" : "#059669";

    return (
        <group>
            {/* Central Crystalline Core */}
            <mesh ref={coreRef} position={[0,0,0]}>
                <octahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial 
                    color={coreColor} 
                    wireframe 
                    opacity={isDark ? 0.8 : 0.6} 
                    transparent 
                    emissive={coreColor}
                    emissiveIntensity={isDark ? 0.5 : 0.2}
                />
            </mesh>

            {/* Rotating Shells */}
            <group ref={shellRef}>
                <mesh>
                    <icosahedronGeometry args={[2.2, 0]} />
                    <meshStandardMaterial color={shellColor} wireframe opacity={isDark ? 0.15 : 0.25} transparent side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* Orbiting Elements */}
            <OrbitalRing radius={3} speed={0.2} axis="z" color={ringColor} />
            <OrbitalRing radius={3.5} speed={0.15} axis="x" color={shellColor} />
            
            <OrbitalParticle radius={4} speed={0.5} offset={0} size={0.1} color={isDark ? "#60a5fa" : "#3b82f6"} />
            <OrbitalParticle radius={4} speed={0.5} offset={2} size={0.1} color={isDark ? "#a78bfa" : "#8b5cf6"} />
            <OrbitalParticle radius={4} speed={0.5} offset={4} size={0.1} color={isDark ? "#34d399" : "#10b981"} />
        </group>
    )
}

const InteractiveShapes = ({ isDark }: { isDark: boolean }) => {
    const groupRef = useRef<THREE.Group>(null!);
    
    useFrame((state, delta) => {
        if(groupRef.current) {
             groupRef.current.rotation.y += delta * 0.05;
             const x = state.pointer.x * 0.1;
             const y = state.pointer.y * 0.1;
             groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y, delta * 4);
             groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, x, delta * 4);
        }
    });

    const matProps = {
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.1 : 0.2 // Darker lines in light mode
    };

    return (
        <group ref={groupRef}>
            {/* Floating geometric elements surrounding the user */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[4, 2, -5]}>
                    <icosahedronGeometry args={[1.5, 0]} />
                    <meshStandardMaterial color={isDark ? "#60a5fa" : "#2563eb"} {...matProps} />
                </mesh>
            </Float>
            <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
                <mesh position={[3, 5, -12]}>
                    <torusKnotGeometry args={[1.2, 0.4, 100, 16]} />
                    <meshStandardMaterial color={isDark ? "#10b981" : "#059669"} {...matProps} />
                </mesh>
            </Float>
            <Float speed={0.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[-8, 8, -25]}>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color={isDark ? "#ef4444" : "#dc2626"} {...matProps} />
                </mesh>
            </Float>

            {/* Replaced simple sphere with Complex Data Nucleus */}
            <group position={[0, 0, -15]}>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <DataNucleus isDark={isDark} />
                </Float>
            </group>
        </group>
    )
}

const Scene = ({ isDark }: SceneProps) => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <GalaxyWrapper>
            <ambientLight intensity={isDark ? 0.5 : 0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1} color={isDark ? "#60a5fa" : "#3b82f6"} />
            <pointLight position={[-10, -10, -5]} intensity={1} color={isDark ? "#8b5cf6" : "#7c3aed"} />
            
            <ParticleField isDark={isDark} />
            <InteractiveShapes isDark={isDark} />
        </GalaxyWrapper>
        
        {/* Dynamic Fog: Black in dark mode, White-ish in light mode */}
        <fog attach="fog" args={[isDark ? '#030712' : '#f8fafc', 5, 40]} />
      </Canvas>
    </div>
  );
};

export default Scene;
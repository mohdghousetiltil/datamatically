
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

// Fix for JSX.IntrinsicElements errors in Three.js/Fiber environments.
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const TorusKnotGeometry = 'torusKnotGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const SphereGeometry = 'sphereGeometry' as any;
const OctahedronGeometry = 'octahedronGeometry' as any;
const IcosahedronGeometry = 'icosahedronGeometry' as any;
const BoxGeometry = 'boxGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const DirectionalLight = 'directionalLight' as any;
const PointLight = 'pointLight' as any;
const Fog = 'fog' as any;

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

// Represents flowing business data streams
const DataStream = ({ isDark, isMobile }: { isDark: boolean, isMobile: boolean }) => {
  const ref = useRef<THREE.Points>(null!);
  const count = isMobile ? 300 : 800;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60; // Vertical spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      const positionAttribute = ref.current.geometry.getAttribute('position');
      for (let i = 0; i < count; i++) {
        let y = positionAttribute.getY(i);
        y -= delta * 5; // Move downwards
        if (y < -30) y = 30; // Reset
        positionAttribute.setY(i, y);
      }
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={isDark ? "#60a5fa" : "#3b82f6"}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isDark ? 0.15 : 0.3}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Connected AI Node Network
const NeuralCluster = ({ isDark, isMobile }: { isDark: boolean, isMobile: boolean }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const nodeCount = isMobile ? 8 : 12;
  
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ),
      size: Math.random() * 0.08 + 0.05
    }));
  }, [nodeCount]);

  // Connect pairs of nodes with lines
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 4) {
          lines.push([nodes[i].position, nodes[j].position]);
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Group ref={groupRef} position={[-6, 4, -10]}>
      {nodes.map((node, i) => (
        <Mesh key={i} position={node.position.toArray()}>
          <SphereGeometry args={[node.size, 16, 16]} />
          <MeshStandardMaterial 
            color={isDark ? "#8b5cf6" : "#7c3aed"} 
            emissive={isDark ? "#8b5cf6" : "#7c3aed"} 
            emissiveIntensity={1} 
          />
        </Mesh>
      ))}
      {connections.map((points, i) => (
        <Line 
          key={i} 
          points={points} 
          color={isDark ? "#60a5fa" : "#3b82f6"} 
          lineWidth={0.5} 
          transparent 
          opacity={0.15} 
        />
      ))}
    </Group>
  );
};

// Represents high-density data arrays
const DataArray = ({ isDark }: { isDark: boolean }) => {
  const count = 20;
  const blocks = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 20
      ] as [number, number, number],
      scale: [Math.random() * 0.5 + 0.1, Math.random() * 2 + 0.5, 0.2] as [number, number, number]
    }));
  }, []);

  return (
    <Group>
      {blocks.map((block, i) => (
        <Mesh key={i} position={block.position}>
          <BoxGeometry args={block.scale} />
          <MeshStandardMaterial 
            color={isDark ? "#3b82f6" : "#2563eb"} 
            transparent 
            opacity={isDark ? 0.05 : 0.1} 
            wireframe={i % 2 === 0}
          />
        </Mesh>
      ))}
    </Group>
  );
};

const GalaxyWrapper = ({ children }: { children?: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      const scrollP = Math.min(scrollY / 4000, 1); 
      const targetRot = scrollP * Math.PI * 0.4;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot, delta * 1.5);
      const targetZ = scrollP * 2;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 1.5);
    }
  });

  return <Group ref={groupRef}>{children}</Group>;
};

const ParticleField = ({ isDark, isMobile }: { isDark: boolean, isMobile: boolean }) => {
  const ref = useRef<THREE.Points>(null!);
  const count = isMobile ? 500 : 1200; 
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;     
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; 
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 100;
      ref.current.rotation.y += delta / 120;
    }
  });

  return (
    <Group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isDark ? "#3b82f6" : "#2563eb"}
          size={isMobile ? 0.02 : 0.012}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isDark ? 0.2 : 0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </Group>
  );
};

const DataNucleus = ({ isDark, isMobile }: { isDark: boolean, isMobile: boolean }) => {
    const coreRef = useRef<THREE.Mesh>(null!);
    const shellRef = useRef<THREE.Group>(null!);

    useFrame((state, delta) => {
        if (coreRef.current) {
             const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
             coreRef.current.scale.set(scale, scale, scale);
             coreRef.current.rotation.y += delta * 0.5;
        }
        if (shellRef.current) {
            shellRef.current.rotation.y -= delta * 0.15;
            shellRef.current.rotation.z += delta * 0.05;
        }
    });
    
    const coreColor = isDark ? "#3b82f6" : "#2563eb";
    const shellColor = isDark ? "#8b5cf6" : "#7c3aed";

    return (
        <Group>
            {/* Core Nucleus - Octahedron */}
            <Mesh ref={coreRef} position={[0,0,0]}>
                <OctahedronGeometry args={[1.4, 0]} />
                <MeshStandardMaterial 
                    color={coreColor} 
                    wireframe 
                    opacity={isDark ? 0.7 : 0.5} 
                    transparent 
                    emissive={coreColor}
                    emissiveIntensity={isDark ? 0.6 : 0.3}
                />
            </Mesh>

            <Group ref={shellRef}>
                <Mesh>
                    <IcosahedronGeometry args={[2.4, 0]} />
                    <MeshStandardMaterial color={shellColor} wireframe opacity={isDark ? 0.1 : 0.2} transparent side={THREE.DoubleSide} />
                </Mesh>
            </Group>
        </Group>
    )
}

const InteractiveShapes = ({ isDark, isMobile }: { isDark: boolean, isMobile: boolean }) => {
    const groupRef = useRef<THREE.Group>(null!);
    
    useFrame((state, delta) => {
        if(groupRef.current) {
             const x = state.pointer.x * 0.08;
             const y = state.pointer.y * 0.08;
             groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y, delta * 2);
             groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, x, delta * 2);
        }
    });

    return (
        <Group ref={groupRef}>
            {/* The Main Brain/Data Core */}
            <Group position={[0, 0, -18]}>
                <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
                    <DataNucleus isDark={isDark} isMobile={isMobile} />
                </Float>
            </Group>

            {/* Neural Net Simulation */}
            <NeuralCluster isDark={isDark} isMobile={isMobile} />
            
            {/* Business Data Storage Arrays */}
            <DataArray isDark={isDark} />

            {/* Downward Data Pulse */}
            <DataStream isDark={isDark} isMobile={isMobile} />
        </Group>
    )
}

const Scene = ({ isDark }: SceneProps) => {
  const isMobile = useMobile();

  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none" aria-hidden="true">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: isMobile ? 65 : 55 }} 
        dpr={[1, 1.5]}
        gl={{ 
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance" 
        }}
      >
        <GalaxyWrapper>
            <AmbientLight intensity={isDark ? 0.4 : 0.7} />
            <DirectionalLight position={[5, 10, 5]} intensity={1.2} color={isDark ? "#60a5fa" : "#3b82f6"} />
            <PointLight position={[-8, -8, -5]} intensity={0.8} color={isDark ? "#8b5cf6" : "#7c3aed"} />
            
            <ParticleField isDark={isDark} isMobile={isMobile} />
            <InteractiveShapes isDark={isDark} isMobile={isMobile} />
        </GalaxyWrapper>
        
        <Fog attach="fog" args={[isDark ? '#030712' : '#f8fafc', 5, 45]} />
      </Canvas>
    </div>
  );
};

export default Scene;

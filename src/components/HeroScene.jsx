import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const pointsRef = useRef();
  const { mouse } = useThree();

  // Generate random particles
  const count = 4000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // spread in a large volume
      pos[i * 3] = (Math.random() - 0.5) * 25;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; // z
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Base slow rotation for cinematic feel
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.02;
      
      // Subtle mouse parallax effect
      pointsRef.current.position.x += (mouse.x * 1.5 - pointsRef.current.position.x) * 0.05;
      pointsRef.current.position.y += (mouse.y * 1.5 - pointsRef.current.position.y) * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c8a97d" /* Warm amber accent to match palette */
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

const HeroScene = () => {
  return (
    <div className="hero-scene-3d" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default HeroScene;

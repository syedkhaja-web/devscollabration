
'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Box(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
    }
  });
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'#8A2BE2'} />
    </mesh>
  );
}

export function WolfAnimation() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box />
      <OrbitControls />
    </Canvas>
  );
}

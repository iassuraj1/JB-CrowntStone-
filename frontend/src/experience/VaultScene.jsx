import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, useCursor, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function CameraRig({ progress, isMobile, panelOpen }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const position = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const arc = (progress - 0.5) * Math.PI * 0.32;
    const radius = isMobile ? 9.2 : 8.25;
    const y = isMobile ? 2.28 - progress * 0.18 : 2.38 - progress * 0.34;
    const zOffset = 1.72 - progress * 0.68;
    const xOffset = panelOpen && !isMobile ? -0.62 : 0;

    position.set(Math.sin(arc) * 0.9 + xOffset, y, Math.cos(arc) * radius + zOffset);
    target.set(panelOpen && !isMobile ? -0.38 : 0, 0.46, -0.74);
    camera.position.lerp(position, 0.075);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
  });

  return null;
}

function VaultCrest({ progress, selectedId, panelOpen }) {
  const texture = useTexture('/yo2.png');
  const groupRef = useRef(null);
  const crestMaterialRef = useRef(null);
  const pointerTargetRef = useRef(new THREE.Vector2());
  const hoverStrengthRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetScale = useMemo(() => new THREE.Vector3(), []);
  const pointerCurrent = useMemo(() => new THREE.Vector2(), []);

  const updatePointer = (event) => {
    event.stopPropagation();
    if (!event.uv) return;
    pointerTargetRef.current.set((event.uv.x - 0.5) * 2, (event.uv.y - 0.5) * 2);
  };

  const releasePointer = () => {
    pointerTargetRef.current.set(0, 0);
    setHovered(false);
  };

  useFrame((_, delta) => {
    hoverStrengthRef.current = THREE.MathUtils.damp(
      hoverStrengthRef.current,
      hovered ? 1 : 0,
      7,
      delta
    );
    pointerCurrent.lerp(pointerTargetRef.current, 1 - Math.exp(-10 * delta));

    const hover = hoverStrengthRef.current;
    const pointerX = pointerCurrent.x * hover;
    const pointerY = pointerCurrent.y * hover;

    if (groupRef.current) {
      const scale = (selectedId ? 0.92 : 1.08) + hover * 0.045;
      targetPosition.set(
        (panelOpen ? -0.42 : 0) + pointerX * 0.045,
        0.54 - progress * 0.06 + hover * 0.035 + pointerY * 0.025,
        0.92 - progress * 0.18 + hover * 0.12
      );
      targetScale.set(scale, scale, scale);
      groupRef.current.position.lerp(targetPosition, 0.09);
      groupRef.current.scale.lerp(targetScale, 0.09);
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -pointerY * 0.16,
        8,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        (progress - 0.5) * 0.045 + pointerX * 0.2,
        8,
        delta
      );
      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        -pointerX * 0.035,
        8,
        delta
      );
    }
    if (crestMaterialRef.current) crestMaterialRef.current.opacity = 0.96 + hover * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 0.54, 0.92]} scale={1.08}>
      <mesh position={[0, 0, 0]} renderOrder={3}>
        <planeGeometry args={[3.18, 3.18]} />
        <meshBasicMaterial ref={crestMaterialRef} map={texture} transparent opacity={0.96} toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh
        position={[0, 0, 0.08]}
        renderOrder={4}
        onPointerOver={(event) => {
          setHovered(true);
          updatePointer(event);
        }}
        onPointerMove={updatePointer}
        onPointerOut={releasePointer}
      >
        <planeGeometry args={[3.28, 3.28]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function ServiceMonolith({ service, index, active, selected, panelOpen, onSelect }) {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const accent = service.accent;
  const activeTone = active || hovered || selected;
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetScale = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();
    if (!groupRef.current) return;
    const floatY = Math.sin(elapsed * 0.78 + index * 0.92) * 0.075;
    const swayX = Math.sin(elapsed * 0.48 + index * 1.16) * 0.045;
    const liftZ = activeTone ? 0.12 : 0;
    const scaleValue = selected ? 0.82 : activeTone ? 0.74 : 0.66;

    targetPosition.set(service.position[0] + swayX, service.position[1] + floatY, service.position[2] + liftZ);
    targetScale.set(scaleValue, scaleValue, scaleValue);
    groupRef.current.position.lerp(targetPosition, 1 - Math.exp(-7 * delta));
    groupRef.current.scale.lerp(targetScale, 1 - Math.exp(-8 * delta));
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      Math.sin(elapsed * 0.42 + index) * 0.035,
      6,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      -0.16 + Math.sin(elapsed * 0.38 + index * 0.7) * 0.09,
      6,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      Math.sin(elapsed * 0.58 + index * 0.5) * 0.035,
      6,
      delta
    );
  });

  return (
    <group
      ref={groupRef}
      position={service.position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(service);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {service.id === 'real-estate' && (
        <group>
          <RoundedBox args={[1.18, 0.18, 0.52]} radius={0.035} smoothness={6} position={[0, -1.06, 0]}>
            <meshStandardMaterial color="#18130a" emissive={accent} emissiveIntensity={activeTone ? 0.34 : 0.16} metalness={0.72} roughness={0.24} />
          </RoundedBox>
          {[-0.38, -0.12, 0.14, 0.4].map((x, towerIndex) => (
            <RoundedBox
              key={x}
              args={[0.18, 1.12 + towerIndex * 0.18, 0.34]}
              radius={0.025}
              smoothness={5}
              position={[x, -0.42 + towerIndex * 0.08, 0]}
            >
              <meshStandardMaterial color="#161820" emissive={accent} emissiveIntensity={activeTone ? 0.36 : 0.18} metalness={0.84} roughness={0.2} />
            </RoundedBox>
          ))}
          <mesh position={[0.14, 0.74, 0.03]} rotation={[0, 0, 0.16]}>
            <boxGeometry args={[0.84, 0.055, 0.42]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.58} metalness={1} roughness={0.14} />
          </mesh>
        </group>
      )}
      {service.id === 'gold-loans' && (
        <group rotation={[0, 0, -0.08]}>
          {[-0.56, -0.22, 0.12, 0.46].map((y, barIndex) => (
            <RoundedBox
              key={y}
              args={[1.08 - barIndex * 0.12, 0.24, 0.44]}
              radius={0.035}
              smoothness={6}
              position={[barIndex % 2 ? -0.1 : 0.08, y, 0]}
            >
              <meshStandardMaterial color={barIndex % 2 ? '#d9982f' : '#ffd56f'} emissive={accent} emissiveIntensity={activeTone ? 0.5 : 0.24} metalness={1} roughness={0.12} />
            </RoundedBox>
          ))}
          <mesh position={[0, 0.78, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.46, 0.025, 12, 80]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.54} metalness={1} roughness={0.16} />
          </mesh>
        </group>
      )}
      {service.id === 'asset-management' && (
        <group>
          <mesh position={[0, -0.02, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.64, 0.02, 12, 96]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={activeTone ? 0.52 : 0.24} metalness={1} roughness={0.14} />
          </mesh>
          {[-0.34, 0, 0.34].map((x, columnIndex) => (
            <RoundedBox
              key={x}
              args={[0.16, 1.5 - Math.abs(columnIndex - 1) * 0.26, 0.34]}
              radius={0.03}
              smoothness={6}
              position={[x, -0.42 + columnIndex * 0.06, 0]}
            >
              <meshStandardMaterial color="#151821" emissive={accent} emissiveIntensity={activeTone ? 0.34 : 0.15} metalness={0.88} roughness={0.18} />
            </RoundedBox>
          ))}
          <mesh position={[0, -1.18, 0]}>
            <boxGeometry args={[1.1, 0.06, 0.46]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.52} metalness={1} roughness={0.14} />
          </mesh>
        </group>
      )}
      {service.id === 'smart-connect' && (
        <group>
          {[
            [-0.42, -0.48, 0],
            [0.35, -0.32, 0],
            [-0.22, 0.28, 0],
            [0.48, 0.48, 0],
            [0, 0.86, 0],
          ].map((positionValue, nodeIndex) => (
            <mesh key={nodeIndex} position={positionValue}>
              <sphereGeometry args={[nodeIndex === 4 ? 0.13 : 0.105, 24, 16]} />
              <meshStandardMaterial color={nodeIndex === 4 ? '#ffffff' : accent} emissive={accent} emissiveIntensity={activeTone ? 0.68 : 0.32} metalness={0.5} roughness={0.14} />
            </mesh>
          ))}
          {[
            [0, -0.41, 0.02, 0.8, 0.035, 0.035, 0.22],
            [0.08, 0.05, 0.02, 0.76, 0.03, 0.03, -0.73],
            [0.2, 0.67, 0.02, 0.62, 0.028, 0.028, 1.08],
          ].map((link, linkIndex) => (
            <mesh key={linkIndex} position={[link[0], link[1], link[2]]} rotation={[0, 0, link[6]]}>
              <boxGeometry args={[link[3], link[4], link[5]]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={activeTone ? 0.62 : 0.28} metalness={0.6} roughness={0.16} />
            </mesh>
          ))}
        </group>
      )}
      {service.id === 'fnb' && (
        <group>
          <mesh position={[-0.22, -0.08, 0]}>
            <cylinderGeometry args={[0.18, 0.24, 1.36, 28]} />
            <meshStandardMaterial color="#3a220f" emissive={accent} emissiveIntensity={activeTone ? 0.78 : 0.46} metalness={0.86} roughness={0.14} />
          </mesh>
          <mesh position={[-0.22, 0.78, 0]}>
            <cylinderGeometry args={[0.08, 0.11, 0.48, 28]} />
            <meshStandardMaterial color="#ffd18a" emissive={accent} emissiveIntensity={0.92} metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[0.35, -0.18, 0]}>
            <cylinderGeometry args={[0.22, 0.12, 0.72, 30]} />
            <meshStandardMaterial color="#4a2a13" emissive={accent} emissiveIntensity={activeTone ? 0.86 : 0.5} metalness={0.58} roughness={0.1} transparent opacity={0.92} />
          </mesh>
          <mesh position={[0.35, -0.58, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.34, 24]} />
            <meshStandardMaterial color="#ffd18a" emissive={accent} emissiveIntensity={0.78} metalness={1} roughness={0.12} />
          </mesh>
          <mesh position={[0.08, -0.1, -0.04]}>
            <sphereGeometry args={[0.72, 36, 20]} />
            <meshBasicMaterial color={accent} transparent opacity={activeTone ? 0.13 : 0.08} depthWrite={false} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function ServiceClusterGuide({ services, isMobile }) {
  if (isMobile) return null;

  return (
    <group position={[0, 0, -2.62]}>
      <mesh position={[6.55, 0.48, 0]}>
        <ringGeometry args={[1.14, 1.154, 80]} />
        <meshBasicMaterial color="#f7c85f" transparent opacity={0.18} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[6.55, -0.68, 0]}>
        <ringGeometry args={[0.8, 0.814, 80]} />
        <meshBasicMaterial color="#f7c85f" transparent opacity={0.14} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[6.55, 1.08, 0]}>
        <boxGeometry args={[1.2, 0.018, 0.018]} />
        <meshBasicMaterial color="#f7c85f" transparent opacity={0.2} depthWrite={false} />
      </mesh>
      <mesh position={[6.55, -0.28, 0]}>
        <boxGeometry args={[1.2, 0.018, 0.018]} />
        <meshBasicMaterial color="#f7c85f" transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <mesh position={[6.55, -0.95, 0]}>
        <boxGeometry args={[0.018, 1.34, 0.018]} />
        <meshBasicMaterial color="#f7c85f" transparent opacity={0.14} depthWrite={false} />
      </mesh>
      {services.map((service) => (
        <mesh key={service.id} position={[service.position[0], service.position[1], 0.03]}>
          <sphereGeometry args={[0.055, 18, 12]} />
          <meshBasicMaterial color={service.accent} transparent opacity={0.78} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField({ count = 220 }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * 14;
      values[i * 3 + 1] = Math.random() * 5 - 1.35;
      values[i * 3 + 2] = (Math.random() - 0.5) * 9 - 1.5;
    }
    return values;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f7c85f" size={0.022} transparent opacity={0.78} sizeAttenuation />
    </points>
  );
}

function VaultArchitecture({ progress }) {
  const gateRef = useRef(null);

  useFrame(({ clock }) => {
    if (!gateRef.current) return;
    gateRef.current.rotation.y = (progress - 0.5) * 0.16;
    gateRef.current.position.z = -0.4 - progress * 0.75 + Math.sin(clock.getElapsedTime() * 0.35) * 0.025;
  });

  return (
    <group ref={gateRef}>
      <mesh position={[0, -1.26, -1.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 5.8, 96]} />
        <meshBasicMaterial color="#d6a84a" transparent opacity={0.11} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -1.24, -1.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.72, 1.77, 96]} />
        <meshBasicMaterial color="#f7c85f" transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>
      <group position={[0, 0.35, -2.35]}>
        <mesh position={[-3.35, 0, 0]}>
          <boxGeometry args={[0.1, 4.6, 0.1]} />
          <meshStandardMaterial color="#d9ad55" emissive="#64450f" emissiveIntensity={0.22} metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[3.35, 0, 0]}>
          <boxGeometry args={[0.1, 4.6, 0.1]} />
          <meshStandardMaterial color="#d9ad55" emissive="#64450f" emissiveIntensity={0.22} metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, 2.25, 0]}>
          <boxGeometry args={[6.8, 0.1, 0.1]} />
          <meshStandardMaterial color="#d9ad55" emissive="#64450f" emissiveIntensity={0.22} metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function SceneContents({ progress, services, activeId, selectedId, onSelect, onClear, isMobile }) {
  const panelOpen = Boolean(selectedId);

  return (
    <>
      <color attach="background" args={['#020308']} />
      <fog attach="fog" args={['#020308', 8, 18]} />
      <CameraRig progress={progress} isMobile={isMobile} panelOpen={panelOpen} />
      <ambientLight intensity={0.42} />
      <spotLight position={[0, 6, 6]} angle={0.46} penumbra={0.65} intensity={3.2} color="#f7c85f" />
      <pointLight position={[-3.5, 1.8, 2.8]} intensity={1.8} color="#6ea8ff" />
      <pointLight position={[3.5, 1.2, 2.6]} intensity={1.4} color="#c48b55" />
      <VaultArchitecture progress={progress} />
      <VaultCrest progress={progress} selectedId={selectedId} panelOpen={panelOpen} />
      <ServiceClusterGuide services={services} isMobile={isMobile} />
      {services.map((service, index) => (
        <ServiceMonolith
          key={service.id}
          service={service}
          index={index}
          active={service.id === activeId}
          selected={service.id === selectedId}
          panelOpen={panelOpen}
          onSelect={onSelect}
        />
      ))}
      <ParticleField count={isMobile ? 90 : 280} />
      <gridHelper args={[13, 26, '#9d7a35', '#1b1820']} position={[0, -1.28, -1.2]} />
    </>
  );
}

export default function VaultScene(props) {
  return (
    <Canvas
      className="vault-canvas"
      dpr={props.isMobile ? [1, 1.2] : [1, 1.65]}
      camera={{ position: [0, 2.55, 8.1], fov: props.isMobile ? 45 : 38, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onPointerMissed={props.onClear}
    >
      <SceneContents {...props} />
    </Canvas>
  );
}

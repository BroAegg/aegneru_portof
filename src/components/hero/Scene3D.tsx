"use client";

import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Environment } from "@react-three/drei";
import * as THREE from "three";

const RADIUS = 2.0;
const MAX_ASTEROIDS = 25;
const MOON_TEXTURE_PATH = "/textures/moon_1024.jpg";

/* ============================================
   Realistic Moon Sphere with Local Texture
   ============================================ */
const RealisticMoon = ({
  onClick,
  prefersReducedMotion,
}: {
  onClick?: () => void;
  prefersReducedMotion: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const colorMap = useTexture(MOON_TEXTURE_PATH);

  useFrame((_, delta) => {
    if (meshRef.current && !prefersReducedMotion) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        bumpMap={colorMap}
        bumpScale={0.02}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
};

/* ============================================
   Particle Ring Generator (Adaptive Desktop / Mobile)
   ============================================ */
function generateRingData(count: number) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const rnd = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const rDist = Math.pow(Math.random(), 1.5);
    const radius = 2.2 + rDist * 2.2;
    const thickness = 0.4 - rDist * 0.2;
    const ySpread = Math.random() + Math.random() + Math.random() - 1.5;
    const y = ySpread * thickness;

    pos[i * 3] = Math.cos(angle) * radius;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(angle) * radius;

    const intensity = 1.0 - rDist;
    const paletteType = Math.random();
    let baseR: number, baseG: number, baseB: number;

    if (paletteType < 0.8) {
      baseR = 0.25;
      baseG = 0.3;
      baseB = 0.35;
    } else if (paletteType < 0.92) {
      baseR = 0.0;
      baseG = 0.6;
      baseB = 0.8;
    } else {
      baseR = 0.6;
      baseG = 0.2;
      baseB = 0.8;
    }

    baseR = Math.min(1, Math.max(0, baseR + (Math.random() - 0.5) * 0.1));
    baseG = Math.min(1, Math.max(0, baseG + (Math.random() - 0.5) * 0.1));
    baseB = Math.min(1, Math.max(0, baseB + (Math.random() - 0.5) * 0.1));

    const sparkle = Math.random() > 0.95 ? 2.5 : 1.0;
    col[i * 3] = baseR * intensity * sparkle;
    col[i * 3 + 1] = baseG * intensity * sparkle;
    col[i * 3 + 2] = baseB * intensity * sparkle;
    rnd[i] = Math.random();
  }
  return { pos, col, rnd };
}

const desktopRingData = generateRingData(60000);
const mobileRingData = generateRingData(14000);

/* ============================================
   Particle Ring with GLSL shader animation
   ============================================ */
const ParticleRing = ({
  ringState,
  massiveAsteroidsRef,
  isMobile,
  prefersReducedMotion,
}: {
  ringState: "hidden" | "animating" | "visible";
  massiveAsteroidsRef: React.MutableRefObject<Float32Array>;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const ringData = isMobile ? mobileRingData : desktopRingData;

  const uniforms = useRef({
    uProgress: { value: ringState === "visible" ? 1.0 : 0.0 },
    uAsteroids: { value: new Float32Array(MAX_ASTEROIDS * 4) },
    time: { value: 0 },
  });

  useFrame((state, delta) => {
    if (pointsRef.current) {
      if (!prefersReducedMotion) {
        pointsRef.current.rotation.y -= delta * 0.02;
      }
      pointsRef.current.updateMatrix();

      const invMat = new THREE.Matrix4().copy(pointsRef.current.matrix).invert();
      const localAsteroids = new Float32Array(MAX_ASTEROIDS * 4);
      for (let i = 0; i < MAX_ASTEROIDS; i++) {
        const ast = new THREE.Vector3(
          massiveAsteroidsRef.current[i * 4],
          massiveAsteroidsRef.current[i * 4 + 1],
          massiveAsteroidsRef.current[i * 4 + 2]
        );
        ast.applyMatrix4(invMat);
        localAsteroids[i * 4] = ast.x;
        localAsteroids[i * 4 + 1] = ast.y;
        localAsteroids[i * 4 + 2] = ast.z;
        localAsteroids[i * 4 + 3] = massiveAsteroidsRef.current[i * 4 + 3];
      }
      uniforms.current.uAsteroids.value = localAsteroids;
    }
    uniforms.current.time.value = state.clock.elapsedTime;

    if (ringState === "animating") {
      uniforms.current.uProgress.value += delta * 0.35;
      if (uniforms.current.uProgress.value > 1.0)
        uniforms.current.uProgress.value = 1.0;
    } else if (ringState === "visible") {
      uniforms.current.uProgress.value = 1.0;
    } else {
      uniforms.current.uProgress.value = 0.0;
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onBeforeCompile = (shader: any) => {
    shader.uniforms.uProgress = uniforms.current.uProgress;
    shader.uniforms.uAsteroids = uniforms.current.uAsteroids;
    shader.uniforms.time = uniforms.current.time;

    shader.vertexShader = `
      uniform float uProgress;
      uniform vec4 uAsteroids[${MAX_ASTEROIDS}];
      uniform float time;
      attribute float aRandom;
      varying float vProgress;
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      `#include <begin_vertex>`,
      `
      vec3 transformed = vec3(position);
      float angle = atan(transformed.x, transformed.z);
      float normalizedAngle = abs(angle) / 3.14159265359;
      float spawnThreshold = 1.0 - normalizedAngle;
      float progressValue = (uProgress * 1.4) - spawnThreshold;
      float particleProgress = smoothstep(0.0, 0.4, progressValue);
      vProgress = particleProgress;
      transformed.y += sin(angle * 10.0 + time) * 0.05 * aRandom;
      if (uProgress > 0.5) {
        for(int i = 0; i < ${MAX_ASTEROIDS}; i++) {
          vec4 astData = uAsteroids[i];
          vec3 delta = transformed - astData.xyz;
          float dist = length(delta);
          float rad = astData.w * 2.0 + 0.15;
          if (dist < rad) {
             float force = pow((rad - dist) / rad, 2.0);
             transformed += normalize(delta) * force * 0.4;
             transformed.y += force * 0.20 * (aRandom - 0.5);
          }
        }
      }
      float swirl = (1.0 - particleProgress) * 4.0;
      float s = sin(swirl);
      float c = cos(swirl);
      transformed.xz = mat2(c, -s, s, c) * transformed.xz;
      transformed.y += (1.0 - particleProgress) * (transformed.y >= 0.0 ? 1.0 : -1.0);
      vec3 moonSurface = normalize(transformed) * 2.1;
      transformed = mix(moonSurface, transformed, particleProgress);
      `
    );

    shader.fragmentShader = `
      varying float vProgress;
      ${shader.fragmentShader}
    `;

    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <color_fragment>`,
      `
      #include <color_fragment>
      diffuseColor.a *= vProgress;
      `
    );
  };

  return (
    <points ref={pointsRef} rotation={[-Math.PI / 2, 0, 0]}>
      <bufferGeometry key={isMobile ? "mobile" : "desktop"}>
        <bufferAttribute
          attach="attributes-position"
          args={[ringData.pos, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[ringData.col, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[ringData.rnd, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        onBeforeCompile={onBeforeCompile}
      />
    </points>
  );
};

/* ============================================
   Asteroid Belt (Adaptive Count: 24 desktop, 8 mobile)
   ============================================ */
const generateAsteroids = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const baseRadius = 2.8 + Math.random() * 2.0;
    const radialAmplitude = 0.5 + Math.random() * 1.5;
    const radialSpeed = 0.15 + Math.random() * 0.25;
    const phase = Math.random() * Math.PI * 2;
    const angle = Math.random() * Math.PI * 2;
    const zOffset = (Math.random() - 0.5) * 0.8;
    const speed =
      (0.04 + Math.random() * 0.08) * (Math.random() > 0.5 ? 1 : -1);
    const scale = 0.02 + Math.pow(Math.random(), 4) * 0.18;

    data.push({
      angle,
      baseRadius,
      radialAmplitude,
      radialSpeed,
      phase,
      zOffset,
      speed,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      rsx: (Math.random() - 0.5) * 0.05,
      rsy: (Math.random() - 0.5) * 0.05,
      rsz: (Math.random() - 0.5) * 0.05,
      scale,
    });
  }
  data.sort((a, b) => b.scale - a.scale);
  return data;
};

const AsteroidBelt = ({
  ringState,
  massiveAsteroidsRef,
  isMobile,
  prefersReducedMotion,
}: {
  ringState: "hidden" | "animating" | "visible";
  massiveAsteroidsRef: React.MutableRefObject<Float32Array>;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const colorMap = useTexture(MOON_TEXTURE_PATH);
  const count = isMobile ? 8 : 24;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const [asteroids] = useState(() => generateAsteroids(count));
  const scaleRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = ringState === "hidden" ? 0 : 1;
    const lerpSpeed = ringState === "hidden" ? 5 : 2;
    scaleRef.current = THREE.MathUtils.lerp(
      scaleRef.current,
      targetScale,
      delta * lerpSpeed
    );

    if (scaleRef.current < 0.01) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;

    asteroids.forEach((ast, i) => {
      if (!prefersReducedMotion) {
        ast.angle += ast.speed * delta;
        ast.phase += ast.radialSpeed * delta;
      }
      let currentRadius =
        ast.baseRadius + Math.sin(ast.phase) * ast.radialAmplitude;
      if (currentRadius < 2.15) {
        const penetration = 2.15 - currentRadius;
        currentRadius = 2.15 + penetration * 0.85;
      }
      const x = Math.cos(ast.angle) * currentRadius;
      const y = Math.sin(ast.angle) * currentRadius;

      massiveAsteroidsRef.current[i * 4] = x;
      massiveAsteroidsRef.current[i * 4 + 1] = y;
      massiveAsteroidsRef.current[i * 4 + 2] = ast.zOffset;
      massiveAsteroidsRef.current[i * 4 + 3] = ast.scale;

      if (!prefersReducedMotion) {
        ast.rx += ast.rsx;
        ast.ry += ast.rsy;
        ast.rz += ast.rsz;
      }
      dummy.position.set(x, y, ast.zOffset);
      dummy.rotation.set(ast.rx, ast.ry, ast.rz);
      dummy.scale.setScalar(ast.scale * scaleRef.current);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow
      receiveShadow
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        map={colorMap}
        bumpMap={colorMap}
        bumpScale={0.08}
        color="#ffffff"
        roughness={0.7}
        metalness={0.1}
      />
    </instancedMesh>
  );
};

/* ============================================
   Main Scene3D Export — Lunar Gravity (Adaptive)
   ============================================ */
export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ringState, setRingState] = useState<
    "hidden" | "animating" | "visible"
  >("hidden");
  const massiveAsteroidsRef = useRef<Float32Array>(new Float32Array(MAX_ASTEROIDS * 4));

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  const [isInView, setIsInView] = useState(true);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    // 1. Resize listener for mobile breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", checkMobile);

    // 2. Listener for prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    // 3. Viewport Intersection Observer (pause rendering when scrolled out)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

  // Graceful Fallback if WebGL crashes or is unsupported
  if (hasWebGLError) {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute h-64 w-64 rounded-full bg-gradient-to-tr from-accent/20 to-accent-blue/30 blur-2xl" />
        <div className="relative h-56 w-56 rounded-full border border-white/10 shadow-2xl bg-gradient-to-br from-zinc-700 via-zinc-900 to-black overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="h-44 w-44 rounded-full border border-white/5 opacity-80" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        shadows
        camera={{ position: [0, 4, 10], fov: 45 }}
        dpr={typeof window !== "undefined" && window.devicePixelRatio > 1.5 ? 1.5 : 1}
        gl={{ powerPreference: "low-power", antialias: true, alpha: true }}
        frameloop={!isInView ? "never" : prefersReducedMotion ? "demand" : "always"}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            setHasWebGLError(true);
          });
        }}
      >
        <Environment preset="city" />

        <ambientLight intensity={0.02} />
        <directionalLight
          position={[8, 5, 5]}
          intensity={1.5}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[-5, -3, -5]}
          intensity={0.15}
          color="#4a90e2"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />

        <group rotation={[Math.PI / 8, 0, 0]}>
          <Suspense fallback={null}>
            <RealisticMoon
              onClick={() => {
                if (ringState === "hidden") setRingState("animating");
              }}
              prefersReducedMotion={prefersReducedMotion}
            />
            <ParticleRing
              ringState={ringState}
              massiveAsteroidsRef={massiveAsteroidsRef}
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
            />
            <AsteroidBelt
              ringState={ringState}
              massiveAsteroidsRef={massiveAsteroidsRef}
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
}

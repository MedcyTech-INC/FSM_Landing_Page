"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// Suppress harmless Three.js warnings from cluttering the Next.js terminal
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && (args[0].includes('THREE.Clock') || args[0].includes('WebGLProgram'))) return;
    originalWarn(...args);
  };
}

function GeometricForms({ reduceMotion, isMobile }: { reduceMotion: boolean, isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && !reduceMotion) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <Float speed={reduceMotion ? 0 : 2} rotationIntensity={reduceMotion ? 0 : 0.5} floatIntensity={reduceMotion ? 0 : 1}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={isMobile ? 2 : 4}
            thickness={0.8}
            chromaticAberration={0.03}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={reduceMotion ? 0 : 0.1}
            color="#E0F2FE"
            attenuationDistance={5}
            attenuationColor="#7DD3FC"
            roughness={0.05}
          />
        </mesh>
      </Float>

      {/* Orbiting ring 1 */}
      <Float speed={reduceMotion ? 0 : 1.5} rotationIntensity={reduceMotion ? 0 : 1} floatIntensity={reduceMotion ? 0 : 2}>
        <mesh position={[-1, 1, -2]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.5, 0.1, 16, isMobile ? 50 : 100]} />
          <meshPhysicalMaterial 
            color="#1677FF" 
            roughness={0.1} 
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Orbiting ring 2 */}
      <Float speed={reduceMotion ? 0 : 2.5} rotationIntensity={reduceMotion ? 0 : 1.5} floatIntensity={reduceMotion ? 0 : 1.5}>
        <mesh position={[1, -1, 1]} rotation={[-Math.PI / 3, -Math.PI / 4, Math.PI / 8]}>
          <torusGeometry args={[3, 0.05, 16, isMobile ? 50 : 100]} />
          <meshPhysicalMaterial 
            color="#08D5F5" 
            roughness={0.2} 
            metalness={0.9} 
            emissive="#08D5F5"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Small floating particles - reduced on mobile */}
      {Array.from({ length: isMobile ? 5 : 20 }).map((_, i) => (
        <Float key={i} speed={reduceMotion ? 0 : 1 + Math.random() * 2} rotationIntensity={reduceMotion ? 0 : 2} floatIntensity={reduceMotion ? 0 : 3}>
          <mesh 
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}
          >
            <sphereGeometry args={[0.05 + Math.random() * 0.05, 8, 8]} />
            <meshStandardMaterial color={Math.random() > 0.5 ? "#08D5F5" : "#1677FF"} emissive={Math.random() > 0.5 ? "#08D5F5" : "#1677FF"} emissiveIntensity={0.5} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    // Check for mobile to reduce geometry complexity
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handleMotionChange);
    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-65 pointer-events-none">
      {/* Static Fallback for WebGL failure/disabled */}
      <div className="absolute inset-0 bg-hero-gradient -z-10" />

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={isMobile ? [1, 1.5] : [1, 2]} gl={{ antialias: !isMobile, powerPreference: "low-power" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#08D5F5" />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} color="#1677FF" />
        <GeometricForms reduceMotion={reduceMotion} isMobile={isMobile} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

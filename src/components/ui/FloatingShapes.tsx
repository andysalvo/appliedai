'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Shape({
  position,
  geometry,
  color,
  speed,
  floatSpeed,
  floatIntensity,
}: {
  position: [number, number, number]
  geometry: 'octahedron' | 'dodecahedron' | 'icosahedron' | 'torus'
  color: string
  speed: number
  floatSpeed: number
  floatIntensity: number
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * speed * 0.3
      mesh.current.rotation.y += delta * speed * 0.2
    }
  })

  const geo = useMemo(() => {
    switch (geometry) {
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 32]} />
    }
  }, [geometry])

  return (
    <Float speed={floatSpeed} floatIntensity={floatIntensity} rotationIntensity={0.3}>
      <mesh ref={mesh} position={position}>
        {geo}
        <meshStandardMaterial color={color} transparent opacity={0.15} wireframe roughness={0.5} />
      </mesh>
    </Float>
  )
}

function CursorLight() {
  const light = useRef<THREE.PointLight>(null)
  const { viewport } = useThree()

  useFrame(({ pointer }) => {
    if (light.current) {
      light.current.position.x = (pointer.x * viewport.width) / 2
      light.current.position.y = (pointer.y * viewport.height) / 2
    }
  })

  return <pointLight ref={light} intensity={2} color="#96BEE6" distance={15} position={[0, 0, 4]} />
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#FFFFFF" />
      <CursorLight />

      <Shape
        position={[-3.5, 1.5, -2]}
        geometry="octahedron"
        color="#96BEE6"
        speed={0.4}
        floatSpeed={1.5}
        floatIntensity={1.2}
      />
      <Shape
        position={[3.8, -1, -1.5]}
        geometry="dodecahedron"
        color="#009CDE"
        speed={0.3}
        floatSpeed={1.2}
        floatIntensity={1}
      />
      <Shape
        position={[0, 2.5, -3]}
        geometry="icosahedron"
        color="#1E407C"
        speed={0.5}
        floatSpeed={1}
        floatIntensity={0.8}
      />
      <Shape
        position={[-2, -2, -2]}
        geometry="torus"
        color="#96BEE6"
        speed={0.2}
        floatSpeed={1.3}
        floatIntensity={1.5}
      />
      <Shape
        position={[2.5, 1.8, -2.5]}
        geometry="octahedron"
        color="#009CDE"
        speed={0.35}
        floatSpeed={1.1}
        floatIntensity={0.9}
      />
    </>
  )
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState, Suspense } from "react";
import * as THREE from "three";
import { useState, Suspense } from "react";
import House from "./components/House";
import "./App.css";

export default function App() {
  const day = "/textures/sunrise.hdr";
  const night = "/textures/skybox3.hdr";
  const [background, setBackground] = useState(day);
  // Paths for HDR files
  const forest = "/textures/forest.hdr"
  const skybox3 = "/textures/skybox3.hdr";

  const isDay = background === day;
  // State Management
  const [background, setBackground] = useState(forest);

  // Toggle Environment
  const toggleBackground = () => {
    setBackground((prev) => (prev === day ? night : day));
    setBackground((prev) => (prev === forest ? skybox3 : forest));
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Clickable sun button */}
      <div
        style={{
          position: "fixed",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100px",
          height: "100px",
          backgroundColor: "yellow",
          borderRadius: "50%",
          boxShadow: "0 0 50px orange",
          zIndex: 10,
          cursor: "pointer",
        }}
        onClick={toggleBackground}
      />

      {/* 3D Scene */}
      <Canvas camera={{ position: [-6, -1, 12], fov: 50 }}>
        {/* Optional atmospheric fog */}
        {/* You can remove this if using bottom fog only */}
        {/* {isDay && <fogExp2 attach="fog" args={["#dff9fb", 0.08]} />} */}

        <Canvas camera={{ position: [-6, -1, 12], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <House />

          {/* Simple bottom fog plane */}
          {isDay && (
            <mesh
              position={[0, -1.45, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[30, 30, 1]}
            >
              <planeGeometry args={[30, 30]} />
              <meshBasicMaterial
                transparent
                opacity={0.25}
                color="#dff9fb"
                depthWrite={false}
              />
            </mesh>
          )}

          <Suspense fallback={<color attach="background" args={["#333"]} />}>
            <Environment files={background} background />
          </Suspense>

          <OrbitControls
            target={[0, -1, 0]}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.2}
          />

          <Suspense fallback={<color attach="background" args={["#333"]} />}>
            {/* Directly pass the path string */}
            <Environment files={background} background />
          </Suspense>

          <OrbitControls target={[0, -1, 0]} />
        </Canvas>

        {/* UI Overlay */}
        <div className="overlay">
          <div className="info-container">
            <div className="logo-container">
              <img src="logo.jpg" alt="University Logo" />
            </div>
            <h2>Alisa Ermel</h2>
            <p className="subtitle">Press the sun!</p>
          </div>
        </div>
    </div>
  );
}

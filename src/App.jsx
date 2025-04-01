import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState, useEffect } from "react";
import { MeshStandardMaterial } from "three";
import House from "./components/House";
import "./App.css";

function Star({ onClick }) {
  return (
    <mesh position={[2, 2, 0]} onClick={onClick}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={1} />
    </mesh>
  );
}

export default function App() {
  const [background, setBackground] = useState("/textures/skybox7.hdr");
  const [cameraPosition, setCameraPosition] = useState([-6, -1, 12]);

  useEffect(() => {
    setCameraPosition([-6, -1, 12]);
  }, []);

  const toggleBackground = () => {
    setBackground((prev) =>
      prev === "/textures/skybox7.hdr" ? "/textures/skybox3.hdr" : "/textures/skybox7.hdr"
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: cameraPosition, fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <House />
        <Star onClick={toggleBackground} />
        <Environment files={background} background />
        <OrbitControls target={[0, -1, 0]} />

      </Canvas>

      <div className="overlay">
        <h2>Alisa Ermel</h2>
      </div>

      <div className="logo-container">
        <img src="logo.jpg" alt="University Logo" />
      </div>
    </div>
  );
}
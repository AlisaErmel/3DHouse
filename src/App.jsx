import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState, useEffect } from "react";
import House from "./components/House";
import "./App.css";

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
      {/* Fixed Sun Overlay */}
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
        }}
        onClick={toggleBackground}
      ></div>

      <Canvas camera={{ position: cameraPosition, fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <House />
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

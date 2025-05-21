import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState, Suspense } from "react";
import House from "./components/House";
import "./App.css";

export default function App() {
  // Paths for HDR files
  const forest = "/textures/forest.hdr"
  const skybox3 = "/textures/skybox3.hdr";

  // State Management
  const [background, setBackground] = useState(forest);

  // Toggle Environment
  const toggleBackground = () => {
    setBackground((prev) => (prev === forest ? skybox3 : forest));
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

      <Canvas camera={{ position: [-6, -1, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <House />

        <Suspense fallback={<color attach="background" args={["#333"]} />}>
          {/* Directly pass the path string */}
          <Environment files={background} background />
        </Suspense>

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

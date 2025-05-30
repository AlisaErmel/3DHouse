import { useGLTF } from "@react-three/drei";

export default function House() {
    const { scene } = useGLTF("/house3.glb");
    return <primitive object={scene} scale={2} position={[0, -1, 0]} />;
}

"use client";

import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import Mesh from "./mesh";

export default function Background() {
    return (
        <Canvas
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
            }}
            gl={{
                antialias: false,
                powerPreference: "high-performance",
            }}
            dpr={[1, 1.5]}
        >
            <OrthographicCamera
                makeDefault
                left={-1}
                right={1}
                top={1}
                bottom={-1}
                near={0.1}
                far={10}
                position={[0, 0, 1]}
            />
            <Mesh />
        </Canvas>
    );
}
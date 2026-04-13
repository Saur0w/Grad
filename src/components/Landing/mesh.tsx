"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";
import { vertexShader, fragmentShader } from "@/lib/shaders";

export default function Mesh() {
    const matRef = useRef<ShaderMaterial>(null!);
    const mouse = useRef(new Vector2(0.5, 0.5));
    const smoothed = useRef(new Vector2(0.5, 0.5));

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new Vector2(0.5, 0.5) },
    }), []);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouse.current.set(
                e.clientX / window.innerWidth,
                1.0 - e.clientY / window.innerHeight
            );
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    useFrame(({ clock }) => {
        if (!matRef.current) return;
        const lerpFactor = 0.025;
        smoothed.current.lerp(mouse.current, lerpFactor);
        matRef.current.uniforms.uTime.value  = clock.getElapsedTime();
        matRef.current.uniforms.uMouse.value.copy(smoothed.current);
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={matRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}
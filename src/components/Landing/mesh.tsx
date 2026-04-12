"use client";

import {useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";
import { vertexShader, fragmentShader } from "@/lib/shaders";

export default function Mesh() {
    const matRef = useRef<ShaderMaterial>(null!);
    const { size } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uResolution: { value: new Vector2(size.width, size.height) },
    }), [size.width, size.height]);

    useFrame(({ clock }) => {
        if (!matRef.current) return;
        matRef.current.uniforms.uTime.value = clock.getElapsedTime();
        matRef.current.uniforms.uResolution.value.set(size.width, size.height);
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
    )
}
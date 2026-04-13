"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import Canvas from "./canvas";

gsap.registerPlugin(useGSAP, SplitText);

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const split = new SplitText(textRef.current, {
            type: "lines",
            mask: "lines"
        });

        gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.4,
            stagger: 0.09,
            ease: "power4.out",
            delay: 0.2
        });
    }, {
        scope: landingRef
    });

    return (
        <section className={styles.landing} ref={landingRef}>
            <Canvas />
            <div className={styles.para} ref={textRef}>
                <p>Fragment shaders run once per pixel, every frame, with no memory of what came before. No state. No history. Just a coordinate and a question, &#34;what colour should I be right now?&#34; I find that beautiful. This entire background is that loop, running 60 times a second.</p>
            </div>
        </section>
    );
}
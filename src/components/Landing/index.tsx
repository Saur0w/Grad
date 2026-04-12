"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

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
        })
    }, {
        scope: landingRef
    })
    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.para} ref={textRef}>
                <p>NASA’s Artemis II marks a bold step in humanity’s return to deep space exploration. As the first crewed mission of the Artemis program, it will send astronauts around the Moon, paving the way for future lunar landings. This mission reflects how far space exploration has come since the days of Apollo 11, combining advanced technology with renewed ambition. Beyond its technical goals, Artemis II symbolizes a new era where humans prepare not just to visit the Moon again, but to stay, learn, and eventually venture even farther into the vast universe.</p>
            </div>
        </section>
    );
}
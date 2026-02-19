"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    hideSlide?: boolean;
}

export const Reveal = ({
    children,
    width = "fit-content",
    className,
    delay = 0.2,
    direction = "up",
    hideSlide = false
}: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const getDirectionalVariants = () => {
        switch (direction) {
            case "up": return { hidden: { opacity: 0, y: 75, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } };
            case "down": return { hidden: { opacity: 0, y: -75, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } };
            case "left": return { hidden: { opacity: 0, x: 75, filter: "blur(10px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } };
            case "right": return { hidden: { opacity: 0, x: -75, filter: "blur(10px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } };
            default: return { hidden: { opacity: 0, y: 75, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } };
        }
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }} className={className}>
            <motion.div
                variants={getDirectionalVariants()}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>

            {!hideSlide && (
                <motion.div
                    variants={{
                        hidden: { left: 0 },
                        visible: { left: "100%" },
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.5, ease: "easeIn", delay }}
                    style={{
                        position: "absolute",
                        top: 4,
                        bottom: 4,
                        left: 0,
                        right: 0,
                        background: "hsl(var(--primary))",
                        zIndex: 20,
                        borderRadius: "4px",
                        opacity: 0.8,
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                    }}
                />
            )}
        </div>
    );
};

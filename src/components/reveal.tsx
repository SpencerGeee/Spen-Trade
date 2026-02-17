"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export const Reveal = ({
    children,
    width = "fit-content",
    delay = 0.25,
    duration = 0.5,
    direction = "up",
    className,
}: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? -40 : direction === "right" ? 40 : 0
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0
        }
    };

    return (
        <div ref={ref} style={{ position: "relative", width }} className={className}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={mainControls}
                transition={{ duration, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

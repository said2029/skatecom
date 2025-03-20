"use client";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";

type Props = {
  foregroundImage: ImageField;
  backgroundImage: ImageField;
  className?: string;
};

export function ParallaxImage({
  backgroundImage,
  foregroundImage,
  className,
}: Props) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const mouseHandler = (event: MouseEvent) => {
      const { innerHeight, innerWidth } = window;
      const XPercant = (event.clientX / innerWidth - 0.5) * 2;
      const YPercant = (event.clientY / innerHeight - 0.5) * 2;
      targetPosition.current = { x: XPercant * -20, y: YPercant * -20 };
    };
    window.addEventListener("mousemove", mouseHandler);

    const animationFrame = () => {
      const { x: TargetX, y: TargetY } = targetPosition.current;
      const { x: CurrentX, y: CurrentY } = currentPosition.current;

      const newX = CurrentX + (TargetX - CurrentX) * 0.1;
      const newY = CurrentY + (TargetY - CurrentY) * 0.1;

      currentPosition.current = { x: newX, y: newY };
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate(${-newX}px, ${-newY}px)`;
      }
      if (foregroundRef.current) {
        foregroundRef.current.style.transform = `translate(${-newX * 2}px, ${-newY * 2}px)`;
      }

      requestAnimationFrame(animationFrame);
    };
    const frameId = requestAnimationFrame(animationFrame);

    return () => {
      window.removeEventListener("mousemove", mouseHandler);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className={clsx("grid grid-cols-1 place-items-center", className)}>
      <div
        ref={backgroundRef}
        className="col-start-1 row-start-1 transition-transform"
      >
        <PrismicNextImage alt="" className="w-11/12" field={backgroundImage} />
      </div>
      <div
        ref={foregroundRef}
        className="col-start-1 row-start-1 transition-transform w-full h-full place-items-center"
      >
        <PrismicNextImage
          alt=""
          field={foregroundImage}
          imgixParams={{ height: 600 }}
          className="h-full max-h-[600px] w-auto"
        />
      </div>
    </div>
  );
}

"use client";
import { KeyTextField } from "@prismicio/client";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  youTubeID: KeyTextField;
};

export function LazyYouTubePlayer({ youTubeID }: VideoProps) {
  const [isInView, setisInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setisInView(true);
        }
      },
      {
        threshold: 0,
        rootMargin: "1500px",
      }
    );

    if (currentContainer) observer.observe(currentContainer);

    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {isInView && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youTubeID}?autoplay=1&mute=1&loop=1&playlist=${youTubeID}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="pointer-events-none h-full w-full border-0"
        />
      )}
    </div>
  );
}

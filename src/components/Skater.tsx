import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import React from "react";
import { ButtonLink } from "./ButtonLink";
import { SkaterScribble } from "@/slices/TeamGrid/SkaterScribble";
import clsx from "clsx";

export function Skater({
  skater,
  index,
}: {
  skater: Content.SkaterDocument;
  index: number;
}) {
  const colors = [
    "text-brand-blue",
    "text-brand-lime",
    "text-brand-navy",
    "text-brand-orange",
  ];
  const skaterColor = colors[index % colors.length];
  return (
    <div className="skater group relative flex flex-col gap-8 items-center">
      <div className="stack-layout overflow-hidden">
        <PrismicNextImage
          width={500}
          alt=""
          className="scale-110 group-hover:scale-100 ease-in-out transform transition-all duration-1000 group-hover:brightness-75 group-hover:saturate-50"
          imgixParams={{ q: 20 }}
          field={skater.data.image_background}
        />
        <SkaterScribble className={clsx("relative", skaterColor)} />
        <PrismicNextImage
          width={500}
          alt=""
          className="group-hover:scale-110 transform ease-in-out transition-transform duration-1000"
          field={skater.data.image_forground}
        />
        <div className="relative h-48 w-full bg-gradient-to-t from-black to-transparent place-self-end"></div>
        <h3 className="relative grid place-self-end justify-self-start p-2 text-brand-gray font-sans text-3xl font-bold">
          <span>{skater.data.first_name}</span>
          <span>{skater.data.last_name}</span>
        </h3>
      </div>
      <ButtonLink field={skater.data.customizer} size="sm">
        Build their board
      </ButtonLink>
    </div>
  );
}

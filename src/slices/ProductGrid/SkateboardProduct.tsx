import { ButtonLink } from "@/components/ButtonLink";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import { Scribble } from "@/components/Scribble";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import React from "react";
import { FaStar } from "react-icons/fa6";

type Props = {
  id: string;
};
const getDominantColor = async (url: string) => {
  const palletUrl = new URL(url);
  palletUrl.searchParams.set("palette", "json");
  const res = await fetch(palletUrl);
  const json = await res.json();
  return (
    json.dominant_colors.vibrant?.hex || json.dominant_colors.vibrant_light?.hex
  );
};

const VERTICAL_LINE =
  "absolute top-0 h-full stroke-1 text-stone-300 group-hover:text-stone-400 transition-colors";
const HORIZONTAL_LINE =
  "-mx-10 stroke-1 text-stone-300 group-hover:text-stone-400 transition-colors";

export default async function SkateboardProduct({ id }: Props) {
  const client = createClient();
  const product = await client.getByID<Content.SkateboardDocument>(id);
  const price = isFilled.number(product.data.price)
    ? `$${(product.data.price / 100).toFixed(2)}`
    : 0;

  const dominantColor = isFilled.image(product.data.image)
    ? await getDominantColor(product.data.image.url)
    : undefined;
  return (
    <div className="group relative max-w-72 mx-auto px-8 pt-4">
      <VerticalLine className={clsx(VERTICAL_LINE, "left-0")} />
      <VerticalLine className={clsx(VERTICAL_LINE, "right-0")} />
      <HorizontalLine className={HORIZONTAL_LINE} />
      <div className="flex justify-between items-center">
        <span className="text-2xl">{price}</span>
        <span className="flex gap-2 ">
          <FaStar className="text-2xl text-yellow-400" />
          37
        </span>
      </div>
      <div className="-mt-1 overflow-hidden py-4">
        <Scribble className="absolute inset-0" color={dominantColor} />
        <PrismicNextImage
          className="mx-auto max-w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"
          width={150}
          alt=""
          field={product.data.image}
        />
      </div>
      <HorizontalLine className={HORIZONTAL_LINE} />
      <h3 className="my-3 text-center font-bold font-mono leading-tight text-xl uppercase">
        {product.data.name}
      </h3>

      <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ButtonLink href={`/product/${product.uid}`}>Customize</ButtonLink>
      </div>
    </div>
  );
}

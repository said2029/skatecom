import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import clsx from "clsx";
import { Heading } from "@/components/heading";
import { ButtonLink } from "@/components/ButtonLink";
import { ParallaxImage } from "./ParallaxImage";

declare module "react" {
  interface CSSProperties {
    "--index": number;
  }
}

/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage: FC<TextAndImageProps> = ({ slice, index }) => {
  const theme = slice.primary.theme;
  return (
    <Bounded
      className={clsx("bg-texture sticky top-[calc(var(--index)*2rem)]", {
        "bg-brand-blue text-white": theme === "blue",
        "bg-brand-orange text-white": theme === "orange",
        "bg-brand-navy text-white": theme === "Navy",
        "bg-brand-lime": theme === "lime",
      })}
      style={{
        "--index": index,
      }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid items-center gap-8 grid-cols-1 lg:grid-cols-2">
        <div
          className={clsx("flex flex-col gap-8", {
            "md:order-2": slice.variation === "imageOnLift",
          })}
        >
          <Heading
            size="lg"
            as="h2"
            className="font-extrabold text-4xl md:text-6xl font-mono"
          >
            <PrismicText field={slice.primary.title} />
          </Heading>
          <div className="max-w-md text-lg leading-relaxed">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <ButtonLink
            className="w-fit"
            color={theme == "lime" ? "orange" : "lime"}
            field={slice.primary.button}
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
        <ParallaxImage
          backgroundImage={slice.primary.image}
          foregroundImage={slice.primary.forgroundimage}
        />
      </div>
    </Bounded>
  );
};

export default TextAndImage;

import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

import Bounded from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/heading";
import { TallLogo } from "./components/TallLogo";
import { WideLogo } from "./components/WideLogo";
import InteractiveSkateboard from "./components/InteractiveSkateboard";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink h-dvh overflow-hidden text-zinc-800 bg-texture"
    >
      <div className="absolute inset-0 flex items-center opacity-20 mix-blend-multiply text-brand-purple overflow-y-hidden">
        <TallLogo className="w-full block lg:hidden" />
        <WideLogo className="w-full hidden lg:block" />
      </div>
      <div className="absolute max-w-6xl mt-24 grid inset-0 mx-auto grid-rows-[1fr,auto] place-items-end px-6 p-11">
        <Heading  className="text-6xl font-extrabold relative max-w-2xl place-self-start">
          <PrismicText field={slice.primary.heading} />
        </Heading>
        <div className="flex w-full justify-between">
          <PrismicRichText field={slice.primary.body} />
          <ButtonLink
            size="lg"
            className="z-20 block mt-2"
            field={slice.primary.button}
            icon="skateboard"
          >
            {slice.primary.button.text}
          </ButtonLink>
          {/* <PrismicNextLink field={slice.primary.button} /> */}
        </div>
      </div>

      <InteractiveSkateboard/>
      
    </Bounded>
  );
};

export default Hero;

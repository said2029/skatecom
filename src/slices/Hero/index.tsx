import { FC } from "react";
import { asImageSrc, Content } from "@prismicio/client";
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
import  {InteractiveSkateboard}  from "./components/InteractiveSkateboard";

const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const deckTextureURL =
    asImageSrc(slice.primary.skateboard_deck_texture) || DEFAULT_DECK_TEXTURE;
  const wheelTextureURL =
    asImageSrc(slice.primary.skateboard_wheel_texture) || DEFAULT_WHEEL_TEXTURE;
  const truckColor =
    slice.primary.skateboard_truck_color || DEFAULT_TRUCK_COLOR;
  const boltColor = slice.primary.skateboard_bolt_color || DEFAULT_BOLT_COLOR;
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
        <Heading className="text-6xl font-extrabold relative max-w-2xl place-self-start">
          <PrismicText field={slice.primary.heading} />
        </Heading>
        <div className="flex flex-col md:flex-row w-full justify-between">
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

      <InteractiveSkateboard
        deckTextureURL={deckTextureURL}
        wheelTextureURL={wheelTextureURL}
        truckColor={truckColor}
        boltColor={boltColor}
        
      />
    </Bounded>
  );
};

export default Hero;

import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/heading";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import React from "react";
import { CustomizerControlsProvider } from "./context";
import { createClient } from "@/prismicio";
import Preview from "./Preview";
import { asImageSrc } from "@prismicio/client";

export default async function page() {
  const client = createClient();
  const customizer = await client.getSingle("board_customizer");

  const { decks, metas, wheels } = customizer.data;
  const defaultDeck = decks[0];
  const defaultWheel = wheels[0];
  const defaultTruck = metas[0];
  const defaultBolt = metas[1];
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlsProvider
        defaultWheel={defaultWheel}
        defaultDeck={defaultDeck}
        defaultTruck={defaultTruck}
        defaultBolt={defaultBolt}
      >
        <div className="relative bg-[#3a414a] aspect-square shrink-0 lg:aspect-auto lg:grow">
          <Link href={"/"}>
            <Logo className="h-12 text-white absolute top-6 left-6" />
          </Link>
          <div className="absolute inset-0">
            <Preview
              deckTextureURLs={decks
                .map((deck) => asImageSrc(deck.texture))
                .filter((url): url is string => Boolean(url))}
              wheelTextureURLs={wheels.map(
                (wheel) => asImageSrc(wheel.texture) || ""
              ).filter((url): url is string => Boolean(url))}
            />
          </div>
        </div>
        <div className="grow bg-texture text-white bg-zinc-900 lg:w-96 lg:shrink-0 lg:grow-0 p-3">
          <Heading as="h1" size="sm" className="mb-6 mt-0 text-4xl">
            Build Your Board
          </Heading>

          <ButtonLink href={""} color="lime" icon="plus">
            Add To Cart
          </ButtonLink>
        </div>
      </CustomizerControlsProvider>
    </div>
  );
}

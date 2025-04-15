import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import React from "react";
import { Logo } from "./Logo";
import Bounded from "./Bounded";
import { FooterPhysics } from "./FooterPhysics";
import { asImageSrc } from "@prismicio/client";

export async function Footer() {
  const client = createClient();
  const setting = await client.getSingle("main");
  const footerBoards = setting.data.skateboards
    .map((item) => asImageSrc(item.skateboard, { h: 600 }))
    ?.filter((url): url is string => Boolean(url));
  return (
    <footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
      <div className="relative h-[75vh] p-10 ">
        <PrismicNextImage
          fill
          className="object-cover"
          width={500}
          alt=""
          field={setting.data.footerbackground}
        />
        <FooterPhysics boardTextureURLs={footerBoards} className="absolute z-50 inset-0"/>
        <Logo className="relative h-20 pointer-events-none mix-blend-exclusion md:h-28" />
      </div>

      <Bounded as="nav">
        <ul className="flex flex-wrap justify-center gap-8 text-xl font-sans">
          {setting.data.navigation.map((link) => (
            <li key={link.link.text} className="hover:underline">
              <PrismicNextLink field={link.link}>
                {link.link.text}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </Bounded>
    </footer>
  );
}

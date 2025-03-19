import Link from "next/link";
import React from "react";
import { ButtonLink } from "./ButtonLink";
import Bounded from "./Bounded";
import { Logo } from "./Logo";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("main");
  return (
    <Bounded
      as={"header"}
      className="absolute top0 right-0 left-0 header z-50 h-48 py-6 px-6"
    >
      <div className="flex w-full justify-between items-center">
        <Link href={"/"}>
          <Logo className="text-brand-purple h-20" />
        </Link>
        <nav aria-label="Main ">
          <ul className="flex items-center gap-7 text-xl text-brand-purple">
            {settings.data.navigation.map((item, index) => (
              <li key={index}>
                <PrismicNextLink field={item.link}>
                  {item.link.text}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <ButtonLink icon="cart" href={"/"} aria-label="Cart (1)">
            Cart (1)
          </ButtonLink>
        </div>
      </div>
    </Bounded>
  );
}

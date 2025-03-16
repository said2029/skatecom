import Link from "next/link";
import React from "react";
import { ButtonLink } from "./ButtonLink";
import Bounded from "./Bounded";
import { Logo } from "./Logo";

type Props = {};

export default function Header({}: Props) {
  return (
    <Bounded as={'header'} className="absolute top0 right-0 left-0 header z-50 h-48 py-6 px-6">
      <div className="flex w-full justify-between items-center">
        <Link href={"/"}><Logo className="text-brand-purple h-20"/></Link>
        <nav aria-label="Main ">
          <ul className="flex items-center gap-4">
            <li>Brand</li>
            <li>Brand</li>
            <li>Brand</li>
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

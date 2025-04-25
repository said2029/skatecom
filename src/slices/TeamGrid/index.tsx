import React, { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Heading } from "@/components/heading";
import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Skater } from "@/components/Skater";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }) => {
  const client = createClient();
  const skaters = await client.getAllByType("skater");
  return (
    <Bounded
      className="bg-texture bg-brand-navy"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="xl" className="text-white text-center text-6xl">
        <PrismicText field={slice.primary.heading} />
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        {skaters.map((item, index) => (
          <React.Fragment key={index}>
            <Skater skater={item} index={index} />
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;

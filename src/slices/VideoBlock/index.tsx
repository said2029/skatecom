import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { LazyYouTubePlayer } from "@/components/LazyYouTubePlayer";
import clsx from "clsx";
import Image from "next/image";

const MASK_CLASSES =
  "[mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto]";

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-zinc-950"
    >
      <h2 className="sr-only">Video Reel</h2>
      <div className="relative aspect-video">
        <div className={clsx(MASK_CLASSES, "bg-brand-lime absolute inset-0")} />
        <div className={clsx(MASK_CLASSES, "relative h-full")}>
          <LazyYouTubePlayer youTubeID={slice.primary.youtube_id} />
          <Image
            draggable={false}
            className="object-cover pointer-events-none"
            alt=""
            src={"/image-texture.png"}
            width={300}
            height={300}
          />
        </div>
      </div>
    </Bounded>
  );
};

export default VideoBlock;

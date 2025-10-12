export type TabType = "videos" | "reels" | "photos";

export interface VideoIframeProps {
  src: string;
  className?: string;
  isVisible?: boolean;
}

export interface NavigationDotsProps {
  total: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}
export interface Video {
  src: string;
}
export interface ScrollCarouselProps {
  videos: Video[];
  itemClassName?: string;
  showDots?: boolean;
  type: "horizontal" | "vertical";
}

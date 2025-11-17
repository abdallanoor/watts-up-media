"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import {
  NavigationDotsProps,
  ScrollCarouselProps,
  TabType,
  VideoIframeProps,
} from "@/types/video";
import { portfolioItems } from "@/data";
import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Constants
const SCROLL_GAP = 16; // gap-4 in pixels
const INITIAL_PHOTOS_COUNT = 6;

// Navigation Dots Component
const NavigationDots = memo<NavigationDotsProps>(
  ({ total, currentIndex, onDotClick }) => (
    <div
      className="justify-center gap-2 mt-4 flex lg:hidden"
      role="tablist"
      aria-label="Video navigation"
    >
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`Go to slide ${index + 1}`}
          className={`w-2 h-2 p-1 rounded-full transition-all duration-300 ${
            index === currentIndex
              ? "bg-foreground w-5"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
          }`}
        />
      ))}
    </div>
  )
);

NavigationDots.displayName = "NavigationDots";

// Video Iframe Component
const VideoIframe = memo<VideoIframeProps>(({ src, className = "" }) => {
  const [hasError, setHasError] = useState(false);

  const iframeSrc = `${src}?autoplay=0&loop=0&muted=0&controls=1&portrait=0&title=0&byline=0&background=0&responsive=1&playsinline=1&cast=0&chromecast=0`;

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="absolute inset-0 w-full h-full">
        {hasError && (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/50 rounded-lg z-10">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-destructive/20 rounded-full flex items-center justify-center">
                <AlertCircle size={24} className="text-destructive" />
              </div>
              <span className="text-xs text-destructive">
                Failed to load video
              </span>
            </div>
          </div>
        )}

        <iframe
          src={iframeSrc}
          className="absolute inset-0 w-full h-full border-0 rounded-lg scheme-normal!"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="lazy"
          title="Video content"
          onError={handleError}
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />
      </div>
    </div>
  );
});

VideoIframe.displayName = "VideoIframe";

// Scroll Carousel Component
const ScrollCarousel = memo<ScrollCarouselProps>(
  ({ videos, showDots = true, type }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const aspectRatioClass =
      type === "horizontal" ? "aspect-video" : "aspect-[9/16]";

    // Update scroll state
    const updateScrollState = useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

      const firstChild = container.children[0] as HTMLElement;
      const itemWidth = firstChild?.clientWidth || 0;
      const newIndex = Math.round(scrollLeft / (itemWidth + SCROLL_GAP));
      setCurrentIndex(Math.min(newIndex, videos.length - 1));
    }, [videos.length]);

    const scrollToIndex = useCallback((index: number) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const firstChild = container.children[0] as HTMLElement;
      const itemWidth = firstChild?.clientWidth || 0;
      const scrollPosition = index * (itemWidth + SCROLL_GAP);

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }, []);

    const scrollLeft = useCallback(() => {
      const newIndex = Math.max(currentIndex - 1, 0);
      scrollToIndex(newIndex);
    }, [currentIndex, scrollToIndex]);

    const scrollRight = useCallback(() => {
      const newIndex = Math.min(currentIndex + 1, videos.length - 1);
      scrollToIndex(newIndex);
    }, [currentIndex, videos.length, scrollToIndex]);

    const handleDotClick = useCallback(
      (index: number) => {
        scrollToIndex(index);
      },
      [scrollToIndex]
    );

    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      updateScrollState();
      container.addEventListener("scroll", updateScrollState, {
        passive: true,
      });
      window.addEventListener("resize", updateScrollState);

      return () => {
        container.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }, [updateScrollState]);

    return (
      <>
        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {videos.map((video, index) => (
              <div
                key={`${video.src}-${index}`}
                className="flex-shrink-0 w-full"
                style={{
                  scrollSnapAlign: "center",
                }}
              >
                <div className={`${aspectRatioClass} w-full`}>
                  <VideoIframe src={video.src} />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden lg:flex justify-center mt-4 gap-3">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full border transition-all duration-300 ${
                canScrollLeft
                  ? "bg-background border-border hover:bg-muted"
                  : "bg-muted border-muted-foreground/20 cursor-not-allowed"
              }`}
              aria-label="Previous video"
            >
              <ChevronLeft
                size={20}
                className={
                  canScrollLeft ? "text-foreground" : "text-muted-foreground"
                }
              />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`p-2 rounded-full border transition-all duration-300 ${
                canScrollRight
                  ? "bg-background border-border hover:bg-muted"
                  : "bg-muted border-muted-foreground/20 cursor-not-allowed"
              }`}
              aria-label="Next video"
            >
              <ChevronRight
                size={20}
                className={
                  canScrollRight ? "text-foreground" : "text-muted-foreground"
                }
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        {showDots && (
          <NavigationDots
            total={videos.length}
            currentIndex={currentIndex}
            onDotClick={handleDotClick}
          />
        )}

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </>
    );
  }
);

ScrollCarousel.displayName = "ScrollCarousel";

// Photo Grid Item Component
const PhotoGridItem = memo<{
  item: { src: string };
  index: number;
}>(({ item, index }) => {
  return (
    <div
      className={`overflow-hidden rounded-lg bg-muted/30 max-md:aspect-[3/2] ${
        index === 0 ? "md:col-span-2 md:row-span-2" : "aspect-[3/2]"
      }`}
    >
      <Image
        src={item.src}
        alt={`Portfolio item ${index + 1}`}
        width={600}
        height={400}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
});

PhotoGridItem.displayName = "PhotoGridItem";

// Main Portfolio Component
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<TabType>("videos");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const tabs = [
    { id: "videos" as TabType, label: "Creative Highlight Videos" },
    { id: "reels" as TabType, label: "Engagement Reels" },
    { id: "photos" as TabType, label: "Photography" },
  ];

  const photosToShow = showAllPhotos
    ? portfolioItems.photography
    : portfolioItems.photography.slice(0, INITIAL_PHOTOS_COUNT);

  const handleTabChange = useCallback((tabId: TabType) => {
    setActiveTab(tabId);
  }, []);

  const handleShowMore = useCallback(() => {
    setShowAllPhotos(true);
  }, []);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="portfolio" className="border-b scroll-mt-16">
      <div className="container">
        <SectionHeader
          label="Portfolio"
          title="Our Work"
          description="Explore our portfolio of stunning real estate media"
        />
      </div>

      <div className="container p-0! border-s-0! max-sm:border-e-0!">
        <div
          className="grid grid-cols-3"
          role="tablist"
          aria-label="Portfolio categories"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(tab.id)}
              className={`cursor-pointer border border-e-0 max-md:text-xs px-2 py-5 font-medium text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-foreground bg-muted"
                  : "text-foreground/60 hover:text-foreground"
              } ${tab.id === "photos" ? "max-sm:border-e" : ""}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="inline-block"
              >
                {tab.label}
              </motion.span>
            </button>
          ))}
        </div>
      </div>

      <div className="container py-5">
        <div
          role="tabpanel"
          id="videos-panel"
          aria-labelledby="videos-tab"
          className={activeTab === "videos" ? "block" : "hidden"}
        >
          <ScrollCarousel
            type="horizontal"
            videos={portfolioItems.horizontal}
          />
        </div>

        <div
          role="tabpanel"
          id="reels-panel"
          aria-labelledby="reels-tab"
          className={activeTab === "reels" ? "block" : "hidden"}
        >
          {isMobile ? (
            <ScrollCarousel type="vertical" videos={portfolioItems.vertical} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {portfolioItems.vertical.map((item, i) => (
                <div
                  key={`reel-${i}`}
                  className="aspect-[9/16] relative overflow-hidden rounded-lg"
                >
                  <VideoIframe src={item.src} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          role="tabpanel"
          id="photos-panel"
          aria-labelledby="photos-tab"
          className={activeTab === "photos" ? "block" : "hidden"}
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {photosToShow.map((item, index) => (
              <PhotoGridItem key={`photo-${index}`} item={item} index={index} />
            ))}
          </div>

          {!showAllPhotos &&
            portfolioItems.photography.length > INITIAL_PHOTOS_COUNT && (
              <div className="flex justify-center mt-6">
                <Button onClick={handleShowMore} size="lg">
                  Show More
                </Button>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

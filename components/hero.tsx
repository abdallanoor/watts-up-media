import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="border-b pt-16 flex items-center justify-center scroll-mt-16"
    >
      <div className="container py-10">
        <div className="text-center animate-fade-in mb-10">
          <h1 className="text-4xl md:text-6xl text-primary font-bold mb-6 leading-none">
            Your
            <span className="relative">
              {" "}
              Luxury{" "}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 20"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M5,12 Q25,5 45,10 T85,12 Q125,8 165,11 T195,10"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  className="opacity-70"
                />
              </svg>
            </span>
            partner
          </h1>
          <p className="text-xl md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Luxury real estate media to impress
          </p>
          <div className="flex justify-center items-center gap-2">
            <Button className="sm:w-auto rounded-none cursor-pointer" size="lg">
              Book a Shoot
            </Button>
            <Button
              className="sm:w-auto rounded-none cursor-pointer shadow-none"
              variant="outline"
              size="lg"
            >
              Explore our Projects
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-full aspect-video max-w-5xl bg-muted p-2 rounded-sm">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover rounded-sm"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

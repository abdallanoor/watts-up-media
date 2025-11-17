"use client";

import { QuoteIcon } from "lucide-react";
import SectionHeader from "../section-header";
import { motion } from "framer-motion";

export default function Reviews() {
  const reviews = [
    "Watts Up Media is fantastic! Thomas Watts was incredibly quick and creative- he put together an amazing social media marketing piece that exceeded my expectations. Highly recommend!!",
    "Thomas always delivers great photos of our properties but what I love even more is his professionalism including great time management, he gets our photos back fast, always makes any changes or special shot requests, is so very kind and punctual to our time set. Ariel's are fantastic. The videos he does are spectacular and are our clients' favorites in this business! Total WOW of a business and a great associate in business through many transactions.",
    "I've worked with Thomas on multiple real estate shoots, and he never disappoints! His eye for detail, lighting, and angles truly brings each home to life—making my listings stand out in a competitive market. He's reliable, professional, and always delivers high-quality photos quickly. I appreciate his consistency and creativity every time we work together. Highly recommend him to anyone needing a top-notch photographer!",
    "I truly couldn't recommend them more! I'm usually a little nervous on camera, but with their guidance everything felt natural and effortless. Having worked with other videographers in the past, I can honestly say they are the best in the industry. They're incredibly efficient, capturing high-quality content quickly and delivering the finished product in record time. I can't wait for the chance to work with them again!",
    "Watts Up Media has taken my Real Estate Marketing to the next level. I attribute a lot of my success at selling my listings to Watts Up Media! Their videos are some of the best I've seen on social media. They are eye catching and they get your attention immediately. Super professional and skilled at what they do!",
  ];

  const duplicated = [...reviews, ...reviews, ...reviews];
  const shuffledDuplicated = [
    ...reviews.slice(2),
    ...reviews.slice(0, 2),
    ...reviews.slice(3),
    ...reviews.slice(0, 3),
    ...reviews.slice(1),
    ...reviews.slice(0, 1),
  ];

  return (
    <section id="reviews" className="border-b scroll-mt-16">
      <div className="container border-b">
        <SectionHeader
          label="Reviews"
          title="What Our Clients Say"
          description="Read what our satisfied clients have to say about working with Watts Up Media"
        />
      </div>

      {/* MOBILE VERSION */}
      <div className="container relative">
        <motion.div
          className="mask-t-from-70% mask-b-from-70% py-10 md:hidden overflow-hidden h-screen"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="space-y-6"
            animate={{ y: ["0%", "-33.33%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 80,
            }}
          >
            {duplicated.map((review, i) => (
              <ReviewCard key={`mobile-${i}`} review={review} fullWidth />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* DESKTOP VERSION */}
      <div className="container py-10 relative overflow-hidden hidden md:block">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative space-y-8 mask-r-from-70% mask-l-from-70%"
        >
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {duplicated.map((review, i) => (
              <ReviewCard key={`row1-${i}`} review={review} />
            ))}
          </motion.div>

          <motion.div
            className="flex gap-6"
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {shuffledDuplicated.map((review, i) => (
              <ReviewCard key={`row2-${i}`} review={review} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  fullWidth = false,
}: {
  review: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`
        bg-muted p-4 rounded-lg
        ${fullWidth ? "w-full min-h-[220px]" : ""}
        ${!fullWidth ? "min-w-[450px] min-h-[230px] lg:min-w-[550px]" : ""}
      `}
    >
      <QuoteIcon fill="currentColor" className="text-neutral-500 size-5" />
      <p className="mt-3 italic text-sm md:text-base leading-relaxed">
        &quot;{review}&quot;
      </p>
    </div>
  );
}

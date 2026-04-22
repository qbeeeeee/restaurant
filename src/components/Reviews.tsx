import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import fiveStarsImage from "./../assets/reviews/fiveStar.svg";
import profilePic from "./../assets/reviews/profilePic.svg";

const reviews = [
  {
    text: "The best dining experience I've ever had! The food was exquisite and the service was impeccable. Highly recommend!",
    author: "John Doe",
  },
  {
    text: "Absolutely stunning atmosphere and flavors that blow your mind. Every dish was a masterpiece. Will definitely be back!",
    author: "Sarah Mitchell",
  },
  {
    text: "From the moment we walked in, we felt like royalty. The staff went above and beyond to make our anniversary special.",
    author: "James & Laura Chen",
  },
  {
    text: "I've traveled the world and this restaurant ranks among the very best. The tasting menu is a must-try experience.",
    author: "Marco Rossi",
  },
  {
    text: "Incredible food, warm ambiance, and attentive service. The pasta dishes are out of this world — so fresh and flavorful!",
    author: "Emily Carter",
  },
  {
    text: "Every visit feels like a new adventure. The chef's creativity shines through every single plate. Pure perfection.",
    author: "David Nguyen",
  },
  {
    text: "We celebrated our wedding anniversary here and it could not have been more perfect. The desserts alone are worth the trip!",
    author: "Sophie & Tom Walker",
  },
  {
    text: "The finest restaurant in the city without a doubt. The wine pairing was exceptional and the staff was incredibly knowledgeable.",
    author: "Richard Thornton",
  },
  {
    text: "A hidden gem that deserves all the praise it gets. Authentic flavors, generous portions, and a cozy, welcoming environment.",
    author: "Aisha Patel",
  },
  {
    text: "We were blown away by the quality and presentation of every course. A true culinary journey from start to finish!",
    author: "Lucas Fernandez",
  },
];

const Reviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const isAnimating = useRef(false);

  const updateEdgeState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 10);
    setAtEnd(Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 20);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el || isAnimating.current) return;

    // Calculate scroll distance from actual card spacing
    const cards = el.children;
    let scrollAmount = 300;
    if (cards.length >= 2) {
      const c0 = cards[0] as HTMLElement;
      const c1 = cards[1] as HTMLElement;
      scrollAmount = c1.offsetLeft - c0.offsetLeft;
    }

    const target =
      el.scrollLeft + (dir === "right" ? scrollAmount : -scrollAmount);
    isAnimating.current = true;

    gsap.to(el, {
      scrollLeft: target,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: updateEdgeState,
      onComplete: () => {
        isAnimating.current = false;
        updateEdgeState();
      },
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-14 sm:py-20 md:py-28">
      <h1 className="text-3xl sm:text-4xl font-bold text-white">Reviews</h1>
      <p className="text-white/60 text-base sm:text-lg mt-3 max-w-md text-center">
        From our kitchen to your table, discover why our guests keep coming back
        for seconds.
      </p>

      <div
        ref={scrollRef}
        onScroll={updateEdgeState}
        className="w-full flex items-stretch gap-5 sm:gap-7 md:gap-10 mt-8 sm:mt-10 overflow-x-auto px-4 sm:px-10 md:px-16 lg:px-20 pb-4 no-scrollbar"
      >
        {reviews.map((review, i) => (
          <div
            key={i}
            className="w-[calc(100vw-2rem)] max-w-80 sm:max-w-max xs:w-72 sm:w-76 md:w-80 min-h-60 bg-neutral-900 rounded-lg p-5 sm:p-6 flex flex-col justify-between shrink-0"
          >
            <img
              src={fiveStarsImage}
              alt="*****"
              className="w-20 sm:w-24 mb-3 sm:mb-4"
            />
            <div className="flex flex-col gap-2">
              <p className="text-white text-base sm:text-lg font-semibold mb-2">
                {review.text}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={profilePic}
                  alt={review.author}
                  className="w-auto h-9 sm:h-10 rounded-full"
                />
                <p className="text-white/50 text-sm">- {review.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8 sm:mt-10">
        <button
          onClick={() => scroll("left")}
          disabled={atStart}
          className={`px-5 sm:px-6 py-2 text-white rounded-full shadow-xl text-sm transition-colors ${atStart ? "bg-neutral-600 cursor-not-allowed" : "bg-[#fe6200] cursor-pointer"}`}
        >
          Prev
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={atEnd}
          className={`px-5 sm:px-6 py-2 text-white rounded-full shadow-xl text-sm transition-colors ${atEnd ? "bg-neutral-600 cursor-not-allowed" : "bg-[#fe6200] cursor-pointer"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Reviews;

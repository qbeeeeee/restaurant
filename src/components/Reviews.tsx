import React, { useRef, useState } from "react";
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

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setAtStart(el.scrollLeft <= 0);

    // Changed '- 1' to '- 20' to absorb the remaining sub-pixels
    // Added Math.ceil to prevent decimal-pixel issues on high-res displays
    setAtEnd(Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 20);
  };

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "right" ? 360 : -360,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-28">
      <h1 className="text-4xl font-bold text-white">Reviews</h1>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full flex items-stretch gap-10 mt-10 overflow-x-auto px-20 pb-4 no-scrollbar"
      >
        {reviews.map((review, i) => (
          <div
            key={i}
            className="w-80 h-70 bg-neutral-900 rounded-lg p-6 flex flex-col justify-between shrink-0"
          >
            <img src={fiveStarsImage} alt="*****" className="w-24 mb-4" />
            <div className="flex flex-col gap-2">
              <p className="text-white text-lg font-semibold mb-2">
                {review.text}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={profilePic}
                  alt={review.author}
                  className="w-auto h-10 rounded-full"
                />
                <p className="text-white/50 text-sm">- {review.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-10">
        <button
          onClick={() => scroll("left")}
          disabled={atStart}
          className={`px-6 py-2 text-white rounded-full shadow-xl text-sm transition-colors ${atStart ? "bg-neutral-600 cursor-not-allowed" : "bg-[#fe6200] cursor-pointer"}`}
        >
          Prev
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={atEnd}
          className={`px-6 py-2 text-white rounded-full shadow-xl text-sm transition-colors ${atEnd ? "bg-neutral-600 cursor-not-allowed" : "bg-[#fe6200] cursor-pointer"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Reviews;

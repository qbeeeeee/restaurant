import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO_IMAGES } from "../constants/heroImages";

// Front = PI/2 (90deg), Left = PI (180deg), Back = -PI/2 (-90deg), Right = 0
const dishes = [
  {
    id: 1,
    src: HERO_IMAGES.dish1,
    title: "Herb-Infused Grilled Chicken",
    desc: "Organic pasture-raised chicken marinated in lemon zest and garden rosemary, wood-fired and served with a zesty garlic chimichurri.",
    baseAngle: Math.PI / 2,
  },
  {
    id: 2,
    src: HERO_IMAGES.dish2,
    title: "Signature Bone-In Ribeye",
    desc: "Dry-aged for 28 days and seared in cast iron with smoked sea salt, finished with a rich roasted garlic and herb compound butter.",
    baseAngle: Math.PI,
  },
  {
    id: 3,
    src: HERO_IMAGES.dish3,
    title: "Pan-Seared Atlantic Salmon",
    desc: "Sustainably sourced salmon with a crisp skin, drizzled with a honey-miso glaze and served over a bed of coconut-infused wild rice.",
    baseAngle: 0,
  },
  {
    id: 4,
    src: HERO_IMAGES.dish4,
    title: "Truffle Wild Mushroom Pasta",
    desc: "Hand-folded silk pappardelle tossed in a creamy truffle-infused sauce with sautéed porcini mushrooms and 24-month aged Parmesan.",
    baseAngle: -Math.PI / 2,
  },
];

const Hero: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const proxyRef = useRef({ angle: 0 });
  const targetAngleRef = useRef(0);
  const isRotatingRef = useRef(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [activeDish, setActiveDish] = useState(dishes[0]);
  const [isRotating, setIsRotating] = useState(false);
  const isMobile = window.innerWidth < 640;

  const getDishWidth = (sin: number) => {
    const size = (isMobile ? 140 : 40) + (isMobile ? 20 : 10) * sin;
    return `${size}${isMobile ? "px" : "vh"}`;
  };

  const { contextSafe } = useGSAP({ scope: container });

  const updatePositions = (angleOffset: number) => {
    dishes.forEach((dish) => {
      const currentAngle = dish.baseAngle + angleOffset;
      const sin = Math.sin(currentAngle);
      const cos = Math.cos(currentAngle);

      // Calculations are now relative to the TABLE'S dimensions, not the screen
      // X and Y are centered at 50%. Tweak the multipliers (40 and 20) to change the ellipse width/height.
      const left = 50 + 50 * cos;
      const top = 58 + 38 * sin;

      // Scale and Size shift based on depth (sin)
      const scale = 0.8 + 0.15 * sin; // Scales between 0.6 (back) and 1.0 (front)
      const width = getDishWidth(sin);
      const zIndex = Math.round(20 + 10 * sin); // zIndex between 10 and 30

      // Apply to DOM safely
      gsap.set(`.dish-${dish.id}`, {
        left: `${left}%`,
        top: `${top}%`,
        width,
        scale: scale,
        zIndex: zIndex,
        xPercent: -50,
        yPercent: -50, // Added yPercent to perfectly center the dish on the elliptical path
      });
    });
  };

  useGSAP(
    () => {
      updatePositions(0);

      const introTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      introTl
        .from(".table-intro", {
          yPercent: isMobile ? -100 : -30,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power2.out",
        })
        .from(
          ".dish-image",
          {
            y: -50,
            scale: 0.75,
            autoAlpha: 0,
            duration: 0.55,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        )
        .from(
          ".hero-signature",
          {
            y: 28,
            autoAlpha: 0,
            duration: 0.55,
          },
          "-=0.2",
        )
        .from(
          ".hero-title-desc",
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.55,
          },
          "-=0.2",
        )
        .from(
          ".hero-bottom-nav",
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.55,
          },
          "-=0.2",
        );
    },
    { scope: container },
  );

  useEffect(() => {
    if (!titleRef.current || !descRef.current) {
      return;
    }

    gsap.fromTo(
      [titleRef.current, descRef.current],
      { y: 16, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        overwrite: "auto",
      },
    );
  }, [activeDish.id]);

  const handleRotate = contextSafe((direction: "next" | "prev") => {
    if (isRotatingRef.current) {
      return;
    }

    isRotatingRef.current = true;
    setIsRotating(true);

    const step = Math.PI / 2; // 90 degrees

    const newTargetAngle =
      targetAngleRef.current + (direction === "next" ? -step : step);
    targetAngleRef.current = newTargetAngle;

    // Find the dish that will be at the front (where sin is closest to 1)
    const nextActiveDish = dishes.reduce((prev, current) => {
      const prevSin = Math.sin(prev.baseAngle + newTargetAngle);
      const currSin = Math.sin(current.baseAngle + newTargetAngle);
      return currSin > prevSin ? current : prev;
    });

    setActiveDish(nextActiveDish);

    gsap.to(proxyRef.current, {
      angle: targetAngleRef.current,
      duration: 0.7,
      ease: "power1.out",
      onUpdate: () => updatePositions(proxyRef.current.angle),
      onComplete: () => {
        isRotatingRef.current = false;
        setIsRotating(false);
      },
    });
  });

  return (
    <div
      ref={container}
      className="sm:min-h-screen h-auto sm:h-screen relative overflow-hidden mb-18"
    >
      <div
        className="table-wrapper absolute -top-10 sm:-top-[37vh] left-1/2 transform -translate-x-1/2
       h-auto sm:h-[90vh] w-65 sm:w-max min-w-60"
      >
        <div className="table-intro relative h-full w-full">
          {/* Table - Top View */}
          <img
            src={HERO_IMAGES.table}
            alt="Table"
            className="h-full w-auto object-contain pointer-events-none"
          />

          {/* Dishes mapped INSIDE the new table wrapper */}
          <div className="absolute inset-0">
            {dishes.map((dish) => {
              // Matched the initial render math exactly to the GSAP math to avoid hydration flashes
              const sin = Math.sin(dish.baseAngle);
              const cos = Math.cos(dish.baseAngle);
              const left = 50 + 50 * cos;
              const top = 58 + 38 * sin;
              const scale = 0.8 + 0.2 * sin;
              const width = getDishWidth(sin);
              const zIndex = Math.round(20 + 10 * sin);

              return (
                <img
                  key={dish.id}
                  src={dish.src}
                  alt={`Dish ${dish.id}`}
                  className={`dish-image dish-${dish.id} absolute h-auto will-change-transform origin-center`}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width,
                    zIndex: zIndex,
                    // transform: `translate(-50%, -50%) scale(${scale})`, // -50% both ways to center on the coordinate
                    transform: `scale(${scale})`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Title & Description - Left Side */}
      <div className="hero-signature mt-85 px-6 sm:px-0 sm:mt-0 sm:absolute sm:top-[70%] sm:left-8 md:left-20 md:transform md:-translate-y-1/2 flex flex-col items-start justify-center text-start w-full sm:w-auto sm:max-w-xl">
        <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white md:mb-2 max-w-50 md:max-w-125">
          Our <span className="text-[#fe6200]">Signature</span> Creations
        </h2>

        <div className="flex gap-3 sm:gap-4 md:gap-6 mt-2 sm:mt-4 flex-wrap">
          <button
            onClick={() => handleRotate("prev")}
            disabled={isRotating}
            className="px-4 sm:px-5 md:px-6 py-2 md:py-2 bg-[#fe6200] text-white rounded-full shadow-xl cursor-pointer text-xs sm:text-sm md:text-sm hover:shadow-lg hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Prev Dish
          </button>

          <button
            onClick={() => handleRotate("next")}
            disabled={isRotating}
            className="px-4 sm:px-5 md:px-6 py-2 md:py-2 bg-[#fe6200] text-white rounded-full shadow-xl cursor-pointer text-xs sm:text-sm md:text-sm hover:shadow-lg hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Next Dish
          </button>
        </div>
      </div>

      {/* Dynamic Title & Description - Right Side */}
      <div
        className="hero-title-desc px-6 sm:px-0 mt-8 sm:mt-0 sm:absolute sm:top-[70%] sm:right-8 md:right-20 sm:transform sm:-translate-y-1/2 
      w-full sm:max-w-sm md:max-w-125 text-start md:text-end flex flex-col items-end justify-center z-40"
      >
        <h2
          ref={titleRef}
          className="text-white max-w-80 sm:max-w-max text-lg sm:text-2xl md:text-3xl font-bold mb-2"
        >
          {activeDish.title}
        </h2>
        <p
          ref={descRef}
          className="text-white max-w-80 sm:max-w-max text-xs sm:text-base md:text-lg line-clamp-4 md:line-clamp-none"
        >
          {activeDish.desc}
        </p>
      </div>

      {/* Bottom menu */}
      <div
        className="hero-bottom-nav mt-20 sm:mt-0 sm:absolute sm:bottom-6 md:bottom-[7vh] sm:left-1/2 sm:transform sm:-translate-x-1/2 
      flex gap-2 sm:gap-6 md:gap-20 z-50 flex-wrap justify-center w-full"
      >
        <button className="px-4 sm:px-5 md:px-6 py-2 md:py-2 cursor-pointer text-xs sm:text-sm md:text-sm text-white hover:text-[#fe6200] transition-colors">
          Menu
        </button>
        <button className="px-6 sm:px-8 md:px-10 py-2 md:py-2.5 rounded-xl shadow-xl bg-[#fe6200] text-white transition-all cursor-pointer text-xs sm:text-sm md:text-base hover:shadow-lg hover:scale-105">
          Create a reservation
        </button>
        <button className="px-4 sm:px-5 md:px-6 py-2 md:py-2 cursor-pointer text-xs sm:text-sm md:text-sm text-white hover:text-[#fe6200] transition-colors">
          Order
        </button>
      </div>
    </div>
  );
};

export default Hero;

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import table from "./../assets/table.webp";
import dish1 from "./../assets/dishes/dish1.webp";
import dish2 from "./../assets/dishes/dish2.webp";
import dish3 from "./../assets/dishes/dish3.webp";
import dish4 from "./../assets/dishes/dish3.webp";

// Front = PI/2 (90deg), Left = PI (180deg), Back = -PI/2 (-90deg), Right = 0
const dishes = [
  {
    id: 1,
    src: dish1,
    title: "Herb-Infused Grilled Chicken",
    desc: "Organic pasture-raised chicken marinated in lemon zest and garden rosemary, wood-fired and served with a zesty garlic chimichurri.",
    baseAngle: Math.PI / 2,
  },
  {
    id: 2,
    src: dish2,
    title: "Signature Bone-In Ribeye",
    desc: "Dry-aged for 28 days and seared in cast iron with smoked sea salt, finished with a rich roasted garlic and herb compound butter.",
    baseAngle: Math.PI,
  },
  {
    id: 3,
    src: dish3,
    title: "Pan-Seared Atlantic Salmon",
    desc: "Sustainably sourced salmon with a crisp skin, drizzled with a honey-miso glaze and served over a bed of coconut-infused wild rice.",
    baseAngle: 0,
  },
  {
    id: 4,
    src: dish4,
    title: "Truffle Wild Mushroom Pasta",
    desc: "Hand-folded silk pappardelle tossed in a creamy truffle-infused sauce with sautéed porcini mushrooms and 24-month aged Parmesan.",
    baseAngle: -Math.PI / 2,
  },
];

const Hero: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const proxyRef = useRef({ angle: 0 });
  const targetAngleRef = useRef(0);
  const [activeDish, setActiveDish] = useState(dishes[0]);

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
      const width = 40 + 10 * sin;
      const zIndex = Math.round(20 + 10 * sin); // zIndex between 10 and 30

      // Apply to DOM safely
      gsap.set(`.dish-${dish.id}`, {
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}vh`,
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
          yPercent: -30,
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
        .from(".hero-signature", {
          y: 28,
          autoAlpha: 0,
          duration: 0.55,
        })
        .from(".hero-title-desc", {
          y: 24,
          autoAlpha: 0,
          duration: 0.55,
        })
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

  const handleRotate = contextSafe((direction: "next" | "prev") => {
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
    });
  });

  return (
    <div ref={container} className="h-screen relative overflow-hidden">
      <div className="table-wrapper absolute -top-[37vh] left-1/2 -translate-x-1/2 h-[90vh] w-max">
        <div className="table-intro relative h-full w-full">
          {/* Table - Top View */}
          <img
            src={table}
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
              const width = 40 + 10 * sin;
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
                    width: `${width}vh`,
                    zIndex: zIndex,
                    transform: `translate(-50%, -50%) scale(${scale})`, // -50% both ways to center on the coordinate
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Title & Description */}
      <div className="hero-signature absolute top-[70%] left-20 transform -translate-y-1/2 flex flex-col items-start justify-center text-center">
        <h2 className="text-7xl font-bold text-white mb-2 max-w-125 text-start">
          Our <span className="text-[#fe6200]">Signature</span> Creations
        </h2>

        <div className="flex gap-6 mt-4">
          <button
            onClick={() => handleRotate("prev")}
            className="px-6 py-2 bg-[#fe6200] text-white rounded-full shadow-xl cursor-pointer text-sm"
          >
            Prev Dish
          </button>

          <button
            onClick={() => handleRotate("next")}
            className="px-6 py-2 bg-[#fe6200] text-white rounded-full shadow-xl cursor-pointer text-sm"
          >
            Next Dish
          </button>
        </div>
      </div>

      {/* Dynamic Title & Description */}
      <div className="hero-title-desc absolute top-[70%] right-20 transform -translate-y-1/2 max-w-125 text-end flex flex-col items-end justify-center z-40">
        <h2 className="text-white text-3xl font-bold mb-2">
          {activeDish.title}
        </h2>
        <p className="text-white text-lg">{activeDish.desc}</p>
      </div>

      {/* Bottom menu */}
      <div className="hero-bottom-nav absolute bottom-[7vh] left-1/2 -translate-x-1/2 flex gap-25 z-50">
        <button
          // onClick={() => handleRotate("prev")}
          className="px-6 py-2 cursor-pointer text-sm text-white"
        >
          Menu
        </button>
        <button className="px-10 py-2.5 rounded-xl shadow-xl bg-[#fe6200] text-white transition-colors cursor-pointer">
          Create a reservation
        </button>
        <button
          // onClick={() => handleRotate("next")}
          className="px-6 py-2 cursor-pointer text-sm text-white"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Hero;

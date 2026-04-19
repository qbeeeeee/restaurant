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
  { id: 1, src: dish1, title: "Test 1", desc: "Desc 1", baseAngle: Math.PI / 2 },
  { id: 2, src: dish2, title: "Test 2", desc: "Desc 2", baseAngle: Math.PI },
  { id: 3, src: dish3, title: "Test 3", desc: "Desc 3", baseAngle: 0 },
  { id: 4, src: dish4, title: "Test 4", desc: "Desc 4", baseAngle: -Math.PI / 2 },
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
      const top =  55 + 38 * sin; 

      // Scale and Size shift based on depth (sin)
      const scale = 0.8 + 0.15 * sin; // Scales between 0.6 (back) and 1.0 (front)
      const width = 45 + 10 * sin;
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
    },
    { scope: container },
  );

  const handleRotate = contextSafe((direction: "next" | "prev") => {
    const step = Math.PI / 2; // 90 degrees

    const newTargetAngle = targetAngleRef.current + (direction === "next" ? -step : step);
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
    <div
      ref={container}
      className="h-screen relative bg-gray-200 overflow-hidden"
    >
      <div className="absolute -top-[48vh] left-1/2 -translate-x-1/2 h-screen w-max">
        
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
            const top =  55 + 38 * sin; 
            const scale = 0.8 + 0.2 * sin;
            const width = 45 + 10 * sin; 
            const zIndex = Math.round(20 + 10 * sin);

            return (
              <img
                key={dish.id}
                src={dish.src}
                alt={`Dish ${dish.id}`}
                className={`dish-${dish.id} absolute h-auto will-change-transform origin-center`}
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

      {/* Dynamic Title & Description */}
      <div className="absolute top-1/2 right-20 transform -translate-y-1/2 flex flex-col items-center justify-center text-center z-40 bg-white/50 backdrop-blur-md px-8 py-4 rounded-2xl shadow-sm">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{activeDish.title}</h2>
        <p className="text-lg text-gray-700">{activeDish.desc}</p>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={() => handleRotate("prev")}
        className="px-6 py-2 cursor-pointer text-sm absolute bottom-[20%] left-20 transform -translate-y-1/2"
      >
        ← Prev Dish
      </button>

      <button
        onClick={() => handleRotate("next")}
        className="px-6 py-2 cursor-pointer text-sm absolute bottom-[20%] right-20 transform -translate-y-1/2"
      >
        Next Dish →
      </button>
   

      {/* Bottom menu */}
      <div className="absolute bottom-[7vh] left-1/2 -translate-x-1/2 flex gap-25 z-50">
        <button
          onClick={() => handleRotate("prev")}
          className="px-6 py-2 cursor-pointer text-sm"
        >
          Menu
        </button>
        <button className="px-10 py-2.5 rounded-xl shadow-xl bg-black text-white transition-colors cursor-pointer" >
          Create a reservation
        </button>
        <button
          onClick={() => handleRotate("next")}
          className="px-6 py-2 cursor-pointer text-sm"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default Hero;
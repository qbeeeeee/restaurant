import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Assuming these are strings (URLs) from your build tool
import table from "./../assets/table.webp";
import dish1 from "./../assets/dishes/dish1.webp";
import dish2 from "./../assets/dishes/dish2.webp";
import dish3 from "./../assets/dishes/dish3.webp";
import dish4 from "./../assets/dishes/dish3.webp";

// 1. Define Types
type Position = "left" | "center" | "right" | "top"; // Added top

interface SlotConfig {
  top: string;
  left: string;
  width: string;
  zIndex: number;
  scale: number;
}

interface DishItem {
  id: number;
  src: string;
  pos: Position;
}

// 2. Constants
const SLOTS: Record<Position, SlotConfig> = {
  left: { top: "-10%", left: "25%", width: "360px", zIndex: 10, scale: 0.8 },
  center: { top: "200px", left: "50%", width: "480px", zIndex: 20, scale: 1.0 },
  right: { top: "-10%", left: "75%", width: "360px", zIndex: 10, scale: 0.8 },
  top: { top: "-25%", left: "50%", width: "280px", zIndex: 5, scale: 0.6 }, // Added top slot logic
};

const Hero: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  // 3. State with 4 Dishes
  const [dishes, setDishes] = useState<DishItem[]>([
    { id: 1, src: dish1, pos: "center" },
    { id: 2, src: dish2, pos: "left" },
    { id: 3, src: dish3, pos: "right" },
    { id: 4, src: dish4, pos: "top" }, // Added 4th dish to state
  ]);

  // 4. Rotation Logic
  const handleRotate = (direction: "next" | "prev") => {
    setDishes((prev) =>
      prev.map((dish) => {
        const current = dish.pos;
        let nextPos: Position;

        if (direction === "next") {
          // Clockwise swap
          if (current === "left") nextPos = "center";
          else if (current === "center") nextPos = "right";
          else if (current === "right") nextPos = "top";
          else nextPos = "left";
        } else {
          // Counter-Clockwise swap
          if (current === "right") nextPos = "center";
          else if (current === "center") nextPos = "left";
          else if (current === "left") nextPos = "top";
          else nextPos = "right";
        }

        return { ...dish, pos: nextPos };
      }),
    );
  };

  // 5. GSAP Animation
  useGSAP(
    () => {
      dishes.forEach((dish) => {
        const slot = SLOTS[dish.pos];

        gsap.to(`.dish-${dish.id}`, {
          left: slot.left,
          top: slot.top,
          width: slot.width,
          scale: slot.scale,
          zIndex: slot.zIndex,
          duration: 0.7,
          ease: "back.out(1.2)",
        });
      });
    },
    { dependencies: [dishes], scope: container },
  );

  return (
    <div
      ref={container}
      className="h-screen relative bg-gray-200 overflow-hidden"
    >
      {/* Table - Top View */}
      <img
        src={table}
        alt="Table"
        className="h-230 w-auto absolute -top-100 left-1/2 -translate-x-1/2"
      />

      {/* Dishes Mapping */}
      {dishes.map((dish) => (
        <img
          key={dish.id}
          src={dish.src}
          alt={`Dish ${dish.id}`}
          className={`dish-${dish.id} absolute -translate-x-1/2 h-auto will-change-transform`}
          style={{
            width: SLOTS[dish.pos].width,
            zIndex: SLOTS[dish.pos].zIndex,
          }}
        />
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-8">
        <button
          onClick={() => handleRotate("prev")}
          className="px-6 py-2 bg-white rounded-full shadow-md hover:bg-black hover:text-white transition-colors"
        >
          ← Prev
        </button>
        <button
          onClick={() => handleRotate("next")}
          className="px-6 py-2 bg-white rounded-full shadow-md hover:bg-black hover:text-white transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Hero;

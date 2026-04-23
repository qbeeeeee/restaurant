import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);
import saladImage from "./../assets/menu/salad.webp";
import appetizersImage from "./../assets/menu/appetizers.webp";
import mainCoursesImage from "./../assets/menu/mainCourse.webp";
import dessertsImage from "./../assets/menu/dessert.webp";
import beveragesImage from "./../assets/menu/beverages.webp";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description?: string;
}

interface MenuCategory {
  id: number;
  name: string;
  items: MenuItem[];
  img: string;
}

const menuChoices: MenuCategory[] = [
  {
    id: 1,
    name: "Appetizers",
    items: [
      { id: 101, name: "Bruschetta", price: 8 },
      { id: 102, name: "Stuffed Mushrooms", price: 10 },
      { id: 103, name: "Mozzarella Sticks", price: 7 },
      { id: 104, name: "Garlic Bread", price: 5 },
    ],
    img: appetizersImage,
  },
  {
    id: 2,
    name: "Main Courses",
    items: [
      { id: 201, name: "Grilled Salmon", price: 18 },
      { id: 202, name: "Ribeye Steak", price: 25 },
      { id: 203, name: "Chicken Alfredo", price: 15 },
      { id: 204, name: "Vegetable Stir Fry", price: 12 },
    ],
    img: mainCoursesImage,
  },
  // {
  //   id: 3,
  //   name: "Sides",
  //   items: [
  //     { id: 301, name: "Garlic Mashed Potatoes", price: 5 },
  //     { id: 302, name: "Steamed Asparagus", price: 6 },
  //     { id: 303, name: "Roasted Brussels Sprouts", price: 7 },
  //     { id: 304, name: "Mac and Cheese", price: 8 },
  //     { id: 305, name: "Coleslaw", price: 4 },
  //   ],
  //   img: sidesImage,
  // },
  {
    id: 4,
    name: "Salads",
    items: [
      { id: 401, name: "Caesar Salad", price: 9 },
      { id: 402, name: "Greek Salad", price: 10 },
      { id: 403, name: "Caprese Salad", price: 11 },
      { id: 404, name: "Garden Salad", price: 8 },
    ],
    img: saladImage,
  },
  {
    id: 5,
    name: "Desserts",
    items: [
      { id: 501, name: "Cheesecake", price: 7 },
      { id: 502, name: "Chocolate Lava Cake", price: 8 },
    ],
    img: dessertsImage,
  },
  {
    id: 6,
    name: "Beverages",
    items: [
      { id: 601, name: "Coffee", price: 3 },
      { id: 602, name: "Tea", price: 2 },
      { id: 603, name: "Soda", price: 2 },
      { id: 604, name: "Wine", price: 10 },
      { id: 605, name: "Beer", price: 5 },
      { id: 606, name: "Cocktail", price: 12 },
    ],
    img: beveragesImage,
  },
];

const Menu = () => {
  const [selected, setSelected] = useState<MenuCategory | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const menuChoicesWrapperRef = useRef<HTMLDivElement>(null);

  // idle preloading + decode of all menu images on mount
  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const preloadAndDecode = async () => {
      await Promise.all(
        menuChoices.map((category) => {
          const image = new Image();
          image.src = category.img;
          if (typeof image.decode === "function") {
            return image.decode().catch(() => undefined);
          }
          return Promise.resolve();
        }),
      );
    };

    if (typeof win.requestIdleCallback === "function") {
      const idleId = win.requestIdleCallback(() => {
        void preloadAndDecode();
      });

      return () => {
        if (typeof win.cancelIdleCallback === "function") {
          win.cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = setTimeout(() => {
      void preloadAndDecode();
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const selectItem = (category: MenuCategory | null) => {
    if (category === null) {
      setIsClosing(true);
      setSelected(null);
      setTimeout(() => setIsClosing(false), 800);
    } else {
      setIsClosing(false);
      setSelected(category);
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: menuChoicesWrapperRef.current!, offsetY: 100 },
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div className="py-14 sm:py-20 lg:py-28 bg-black/20 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 text-white">
        Menu
      </h1>

      <p className="text-center text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
        Take a look at our freshly prepared dishes. Everything is made daily
        with quality ingredients to satisfy any craving.
      </p>

      <div
        className="min-h-96 sm:min-h-150 md:h-[calc(100vh-100px)] flex flex-col lg:flex-row 
      w-full lg:w-[80vw] mx-auto gap-4 md:gap-0"
      >
        {/* Left: buttons column — full width by default, half width when selected on desktop */}
        <div
          ref={menuChoicesWrapperRef}
          className={`flex flex-col transition-all duration-500 min-h-50 ${selected ? "delay-300" : "delay-0"} ${
            selected ? "w-full lg:w-1/2" : "w-full"
          }`}
        >
          {menuChoices.map((category) => {
            const isSelected = selected && selected.id === category.id;
            return (
              <button
                type="button"
                key={category.id}
                onClick={() =>
                  selectItem(selected?.id === category.id ? null : category)
                }
                className={`basis-0 rounded-lg md:rounded-xl min-h-0 text-center px-3 sm:px-4 md:px-6 overflow-hidden transition-all duration-300 ${isClosing ? "delay-500" : ""}
              bg-gray-400 border-black hover:bg-black hover:shadow-md group flex justify-center items-center cursor-pointer relative
                ${
                  isSelected
                    ? "grow-2 py-2 sm:py-3 md:py-4 border opacity-100 bg-black" // 1. The Selected Item
                    : selected
                      ? "grow-0 h-0 py-0 border-0 opacity-0 pointer-events-none" // 2. The Unselected Items (Collapsed entirely)
                      : "grow hover:grow-2@ py-2 sm:py-3 md:py-4 border opacity-100 min-h-16 md:min-h-20" // 3. The Default State (Nothing selected yet)
                }`}
              >
                {/* Background image */}
                <img
                  src={category.img}
                  alt={category.name}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                  style={{
                    willChange: "opacity, transform",
                    backfaceVisibility: "hidden",
                  }}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none select-none transform-gpu
                  opacity-30 group-hover:opacity-100 ${isSelected ? "opacity-100" : ""}`}
                />

                {/* Dark gradient overlay for text readability */}
                <div
                  className="absolute top-0 left-0 w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-50"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)",
                  }}
                />

                {/* <span
                  className={`relative z-10 text-lg sm:text-xl md:text-2xl font-bold text-black ${isSelected ? "text-white" : "group-hover:text-white"} transition-colors duration-300`}
                >
                  ({category.items.length})
                </span> */}

                <h2
                  className={`relative z-10 text-lg sm:text-2xl md:text-3xl font-bold tracking-wide
                     text-black ${isSelected ? "text-white" : "group-hover:text-white group-hover:drop-shadow-md"} transition-colors duration-300`}
                >
                  {category.name}
                </h2>

                {/* <ArrowIcon
                  className={`relative z-10 w-auto h-6 sm:h-7 md:h-8 transition-all duration-300 rotate-45 ${isSelected ? "text-white" : "group-hover:rotate-0"} text-black ${isSelected ? "" : "group-hover:text-white group-hover:drop-shadow-md"}`}
                /> */}
              </button>
            );
          })}
        </div>

        {/* Right: items panel — hidden by default, slides in when selected */}
        <div
          className={`relative flex flex-col justify-center gap-4 sm:gap-5 md:gap-6 overflow-y-auto bg-neutral-900 rounded-lg md:rounded-none transition-all duration-500 ${selected ? "delay-300" : "delay-0"} ${
            selected
              ? "w-full lg:w-1/2 opacity-100 px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8"
              : "w-0 lg:w-0 opacity-0 px-0"
          }`}
        >
          <button
            type="button"
            onClick={() => selectItem(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 md:right-8 text-white/50 hover:text-white text-2xl md:text-3xl transition-colors duration-200 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 border-b border-white/20 pb-3 md:pb-4 whitespace-nowrap">
            {selected?.name}
          </h3>

          <ul className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {selected?.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-start md:items-center text-white border-b border-white/10 pb-3 md:pb-4 gap-4"
              >
                <div className="flex-1">
                  <p className="text-base sm:text-lg md:text-xl font-semibold">
                    {item.name}
                  </p>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-white/50 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="text-base sm:text-lg md:text-lg font-bold text-white/80 shrink-0">
                  ${item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;

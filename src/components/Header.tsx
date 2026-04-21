import React, { useRef } from "react";
import restaurantLogo from "./../assets/header/restaurantLogo.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const introTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      introTl.from(headerRef?.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power2.out",
      });
    },
    { scope: headerRef },
  );

  return (
    <div
      ref={headerRef}
      className="fixed h-25 w-full flex items-center justify-between z-100 px-10
      bg-linear-to-r from-[#1b1b1b] to-[#252525] border-b-2 border-white/20 backdrop-blur-md"
    >
      <div className="flex items-center gap-4">
        <img src={restaurantLogo} alt="Restaurant Logo" className="h-10" />

        <h2 className="text-white text-2xl font-bold">Restaurant Logo</h2>
      </div>

      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-10 text-xl text-white">
        <a href="#" className="hover:text-[#fe6200] transition-colors">
          Home
        </a>
        <a href="#" className="hover:text-[#fe6200] transition-colors">
          About
        </a>
        <a href="#" className="hover:text-[#fe6200] transition-colors">
          Menu
        </a>
        <a href="#" className="hover:text-[#fe6200] transition-colors">
          Reviews
        </a>
        <a href="#" className="hover:text-[#fe6200] transition-colors">
          Contact
        </a>
      </nav>

      <button className="px-6 py-3 bg-[#fe6200] text-white rounded-full shadow-xl cursor-pointer text-sm">
        Contact Now
      </button>
    </div>
  );
};

export default Header;

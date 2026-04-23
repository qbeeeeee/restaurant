import { useEffect, useRef, useState } from "react";
import restaurantLogo from "./../assets/header/restaurantLogo.svg";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import CrossSvg from "./../assets/header/cross.svg?react";
import MenuSvg from "./../assets/header/menu.svg?react";

gsap.registerPlugin(ScrollToPlugin);

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const sectionIds = ["#hero", "#about", "#menu", "#reviews", "#contact"];

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const offset = 140;
      const scrollPosition = window.scrollY + offset;

      let currentSection = sectionIds[0];

      for (const sectionId of sectionIds) {
        const section = document.querySelector<HTMLElement>(sectionId);
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = sectionId;
        }
      }

      setActiveSection((prev) =>
        prev === currentSection ? prev : currentSection,
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  useGSAP(
    () => {
      const introTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      introTl.from(headerRef?.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power2.out",
      });
    },
    { scope: headerRef },
  );

  const handleNavClick = (sectionId: string) => {
    const isMobile = window.innerWidth < 640;
    gsap.to(window, {
      scrollTo: { y: sectionId, offsetY: isMobile ? 80 : 100 },
      duration: 0.8,
      ease: "power2.inOut",
    });
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 h-20 sm:h-25 w-full flex items-center justify-between z-100 px-5 sm:px-8 lg:px-10 bg-linear-to-r from-[#1b1b1b] to-[#252525] border-b-2 border-white/20"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={restaurantLogo}
            alt="Restaurant Logo"
            className="h-9 sm:h-10"
          />

          <h2 className="text-white text-lg sm:text-2xl font-bold">
            Restaurant Logo
          </h2>
        </div>

        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-6 xl:gap-10 text-xl text-white">
          <button
            onClick={() => handleNavClick("#hero")}
            className={`bg-none border-none cursor-pointer transition-colors ${
              activeSection === "#hero"
                ? "text-[#fe6200]"
                : "text-white hover:text-[#fe6200]"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("#about")}
            className={`bg-none border-none cursor-pointer transition-colors ${
              activeSection === "#about"
                ? "text-[#fe6200]"
                : "text-white hover:text-[#fe6200]"
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick("#menu")}
            className={`bg-none border-none cursor-pointer transition-colors ${
              activeSection === "#menu"
                ? "text-[#fe6200]"
                : "text-white hover:text-[#fe6200]"
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => handleNavClick("#reviews")}
            className={`bg-none border-none cursor-pointer transition-colors ${
              activeSection === "#reviews"
                ? "text-[#fe6200]"
                : "text-white hover:text-[#fe6200]"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick("#contact")}
            className={`bg-none border-none cursor-pointer transition-colors ${
              activeSection === "#contact"
                ? "text-[#fe6200]"
                : "text-white hover:text-[#fe6200]"
            }`}
          >
            Contact
          </button>
        </nav>

        <button className="hidden lg:block px-6 py-3 bg-[#fe6200] text-white rounded-full shadow-xl cursor-pointer text-sm">
          Contact Now
        </button>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="lg:hidden inline-flex items-center justify-center h-9 sm:h-11 w-9 sm:w-11 rounded-md border border-white/30 text-white hover:border-[#fe6200] hover:text-[#fe6200] transition-colors"
        >
          {isMenuOpen ? (
            <CrossSvg className="h-5 sm:h-6 w-5 sm:w-6 cursor-pointer" />
          ) : (
            <MenuSvg className="h-5 sm:h-6 w-5 sm:w-6 cursor-pointer" />
          )}
        </button>
      </header>

      <div
        className={`lg:hidden fixed inset-0 backdrop-blur-lg z-110 bg-black/65 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`lg:hidden fixed top-0 right-0 h-screen w-[84vw] max-w-sm z-110 border-l border-white/20
           bg-[#1f1f1f]/95 px-6 py-6 shadow-2xl transition-transform duration-300 ease-out
           flex flex-col items-start justify-between ${
             isMenuOpen ? "translate-x-0" : "translate-x-full"
           }`}
      >
        <div className="flex justify-end absolute top-6 right-6">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center justify-center h-9 sm:h-11 w-9 sm:w-11 rounded-md border border-white/30 text-white hover:border-[#fe6200] hover:text-[#fe6200] transition-colors"
          >
            <CrossSvg className="h-5 sm:h-6 w-5 sm:w-6 cursor-pointer" />
          </button>
        </div>

        <nav className="mt-16 flex flex-col gap-5 text-white text-xl w-full pr-6 pl-2">
          <button
            onClick={() => handleNavClick("#hero")}
            className={`text-left cursor-pointer transition-colors pb-2 border-b border-white/20 w-full ${
              activeSection === "#hero"
                ? "text-[#fe6200]"
                : "text-white hover:text-[#fe6200]"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("#about")}
            className={`text-left cursor-pointer transition-colors pb-2 border-b border-white/20 w-full ${
              activeSection === "#about"
                ? "text-[#fe6200]"
                : "text-white hover:text-[#fe6200]"
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick("#menu")}
            className={`text-left cursor-pointer transition-colors pb-2 border-b border-white/20 w-full ${
              activeSection === "#menu"
                ? "text-[#fe6200]"
                : "text-white hover:text-[#fe6200]"
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => handleNavClick("#reviews")}
            className={`text-left cursor-pointer transition-colors pb-2 border-b border-white/20 w-full ${
              activeSection === "#reviews"
                ? "text-[#fe6200]"
                : "text-white hover:text-[#fe6200]"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick("#contact")}
            className={`text-left cursor-pointer transition-colors pb-2 border-b border-white/20 w-full ${
              activeSection === "#contact"
                ? "text-[#fe6200]"
                : "text-white hover:text-[#fe6200]"
            }`}
          >
            Contact
          </button>
        </nav>

        <button className="w-full px-8 py-3 bg-[#fe6200] text-white rounded-full shadow-xl cursor-pointer text-sm">
          Contact Now
        </button>
      </aside>
    </>
  );
};

export default Header;

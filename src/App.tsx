import { useEffect, useState } from "react";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";
import { HERO_IMAGE_SOURCES } from "./constants/heroImages";

const App = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload hero images
    let loadedCount = 0;
    const totalImages = 5; // 4 dishes + 1 table

    const onImageLoad = () => {
      loadedCount += 1;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    const imageSources = HERO_IMAGE_SOURCES;

    imageSources.forEach((src) => {
      const img = new Image();
      img.onload = onImageLoad;
      img.src = src;
    });
  }, []);

  return (
    <div className="bg-fixed bg-linear-to-br from-[#161616] via-[#323232] to-[#0a0a0a]">
      <Header />

      <section id="hero">
        {imagesLoaded ? (
          <Hero />
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-[#fe6200] border-t-transparent rounded-full animate-spin"></div>
              <p className="opacity-75 text-white">loading</p>
            </div>
          </div>
        )}
      </section>

      <section id="about">
        <AboutUs />
      </section>

      <section id="menu">
        <Menu />
      </section>

      <section id="reviews">
        <Reviews />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default App;

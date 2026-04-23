import restaurantLoby from "./../assets/aboutus/restaurantLoby.jpg";

const AboutUs = () => {
  return (
    <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 bg-white/5">
      <div className="w-full lg:w-[80vw] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-stretch">
          <div className="relative rounded-2xl overflow-hidden min-h-80 sm:min-h-95 border border-white/15 bg-neutral-900">
            {/* Replace this image with your final About Us photo */}
            <img
              src={restaurantLoby}
              alt="Restaurant interior"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/35" />
          </div>

          <div className="flex flex-col justify-center text-white">
            <p className="uppercase tracking-[0.2em] text-xs sm:text-sm text-white mb-3">
              About Us
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
              Refined <span className="text-[#fe6200]">Cuisine</span> With
              Genuine <span className="text-[#fe6200]">Hospitality</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed mb-4">
              Our restaurant was built on a simple promise: exceptional dining
              should feel both elevated and welcoming. Every dish is prepared
              with seasonal ingredients, balanced flavors, and careful attention
              to detail.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-7">
              Whether you are joining us for an intimate dinner, a business
              gathering, or a family celebration, our team is committed to
              creating a memorable experience from the first welcome to the last
              course.
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
              <div className="rounded-xl border border-white/15 bg-white/5 px-3 py-4 text-center">
                <p className="text-xl sm:text-2xl font-bold text-[#fe6200]">
                  10+
                </p>
                <p className="text-[11px] sm:text-xs text-white/80 tracking-wide">
                  Years Serving
                </p>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/5 px-3 py-4 text-center">
                <p className="text-xl sm:text-2xl font-bold text-[#fe6200]">
                  50k+
                </p>
                <p className="text-[11px] sm:text-xs text-white/80 tracking-wide">
                  Guests Hosted
                </p>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/5 px-3 py-4 text-center">
                <p className="text-xl sm:text-2xl font-bold text-[#fe6200]">
                  30+
                </p>
                <p className="text-[11px] sm:text-xs text-white/80 tracking-wide">
                  Signature Dishes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

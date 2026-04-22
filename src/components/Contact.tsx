const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen bg-linear-to-b from-[#161616] via-[#323232] to-[#0a0a0a] py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6"
    >
      {/* Section Heading */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <p className="text-[#fe6200] uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
          Get In Touch
        </p>
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-5">
          Contact <span className="text-[#fe6200]">Us</span>
        </h2>
        <p className="text-white/50 mt-3 sm:mt-5 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
          Whether you're planning a romantic dinner, a family gathering, or a
          private event — we're here to make it unforgettable.
        </p>
        <div className="mt-4 sm:mt-6 mx-auto w-12 sm:w-16 h-0.5 bg-[#fe6200] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
        {/* Left — Contact Info */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {/* Google Maps embed */}
          <div className="rounded-lg md:rounded-2xl overflow-hidden border border-white/10 hover:border-[#fe6200]/40 transition-colors duration-300">
            <iframe
              title="Restaurant Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209132438!2d-74.00601568459418!3d40.71277937933087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1656c1a6e5%3A0xe72b27f44acf1a61!2s128%20Golden%20Ave%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1681234567890"
              width="100%"
              height="300"
              className="min-h-64 sm:min-h-72"
              style={{ border: 0, filter: "grayscale(0.3) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info cards */}
          {[
            {
              icon: (
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              ),
              label: "Our Location",
              value: "128 Golden Ave, New York, NY 10001",
            },
            {
              icon: (
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              ),
              label: "Opening Hours",
              value: "Mon – Fri: 12pm – 11pm  ·  Sat – Sun: 11am – 12am",
            },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-3 sm:gap-4 md:gap-5 bg-white/5 border border-white/10 rounded-lg md:rounded-2xl p-4 sm:p-5 md:p-6 backdrop-blur-sm hover:border-[#fe6200]/40 transition-colors duration-300"
            >
              <div className="shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-lg md:rounded-xl bg-[#fe6200]/10 border border-[#fe6200]/30 flex items-center justify-center text-[#fe6200]">
                {icon}
              </div>
              <div className="flex-1">
                <p className="text-[#fe6200] text-xs uppercase tracking-widest font-semibold mb-1">
                  {label}
                </p>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  {value}
                </p>
              </div>
            </div>
          ))}

          {/* Social links */}
          <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
            <p className="text-white/40 text-xs sm:text-sm">Follow us</p>
            <div className="flex-1 h-px bg-white/10" />
            {["Instagram", "Facebook", "TripAdvisor"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-white/50 hover:text-[#fe6200] transition-colors duration-200 tracking-wide"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Reservation CTA */}
        <div className="bg-white/5 border border-white/10 rounded-lg md:rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-sm flex flex-col justify-between gap-6 sm:gap-8 md:gap-10">
          <div>
            <p className="text-[#fe6200] uppercase tracking-[0.3em] text-xs font-semibold mb-3 sm:mb-4">
              Reservations
            </p>
            <h3 className="text-white text-2xl sm:text-3xl font-bold leading-snug mb-4 sm:mb-5">
              Ready to Reserve <br />
              <span className="text-[#fe6200]">Your Table?</span>
            </h3>
            <p className="text-white/50 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm">
              We'd love to host you. Simply reach out via phone or email and our
              team will personally assist you in securing your reservation and
              accommodating any special requests.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <a
              href="tel:+12125550198"
              className="flex items-center gap-3 sm:gap-4 bg-[#fe6200]/10 border border-[#fe6200]/30 rounded-lg md:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 hover:bg-[#fe6200]/20 hover:border-[#fe6200]/60 transition-all duration-300 group"
            >
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg md:rounded-xl bg-[#fe6200]/10 border border-[#fe6200]/30 flex items-center justify-center text-[#fe6200] shrink-0">
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[#fe6200] text-xs uppercase tracking-widest font-semibold mb-0.5">
                  Call Us
                </p>
                <p className="text-white text-xs sm:text-sm font-medium group-hover:text-white transition-colors">
                  +1 (212) 555-0198
                </p>
              </div>
            </a>

            <a
              href="mailto:reservations@restaurant.com"
              className="flex items-center gap-3 sm:gap-4 bg-white/5 border border-white/10 rounded-lg md:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 hover:border-[#fe6200]/40 hover:bg-white/8 transition-all duration-300 group"
            >
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg md:rounded-xl bg-[#fe6200]/10 border border-[#fe6200]/30 flex items-center justify-center text-[#fe6200] shrink-0">
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[#fe6200] text-xs uppercase tracking-widest font-semibold mb-0.5">
                  Email Us
                </p>
                <p className="text-white text-xs sm:text-sm font-medium group-hover:text-white transition-colors">
                  reservations@restaurant.com
                </p>
              </div>
            </a>
          </div>

          <div className="border-t border-white/10 pt-4 sm:pt-6">
            <p className="text-white/30 text-xs leading-relaxed">
              We typically respond within a few hours during business hours. For
              same-day reservations, we recommend calling directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

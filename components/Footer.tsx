import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1C1C1C] text-white rounded-b-3xl">
      {/* Footer Links */}
      <div className="px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div>
            <h3 className="text-[#F5A623] font-bold text-base mb-3">
              About us
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We are the biggest hyperstore in the universe. We got you all
              cover with our exclusive collections and latest drops.
            </p>
          </div>
          <div>
            <h3 className="text-[#F5A623] font-bold text-base mb-3">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                "Runners",
                "Sneakers",
                "Basketball",
                "Outdoor",
                "Golf",
                "Hiking",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#F5A623] font-bold text-base mb-3">Company</h3>
            <ul className="space-y-2">
              {["About", "Contact", "Blogs"].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#F5A623] font-bold text-base mb-3">
              Follow us
            </h3>
            <div className="flex gap-3">
              {[
                { icon: "f", label: "Facebook" },
                { icon: "ig", label: "Instagram" },
                { icon: "tw", label: "Twitter" },
                { icon: "tk", label: "TikTok" },
              ].map((s) => (
                <button
                  key={s.label}
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center text-xs font-bold"
                  title={s.label}
                >
                  {s.label === "Facebook" && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  )}
                  {s.label === "Instagram" && (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-none stroke-white stroke-2"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                  {s.label === "Twitter" && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  )}
                  {s.label === "TikTok" && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32"></div>

      {/* Big KICKS Watermark */}
      <div className="absolute  -bottom-16 text-center ">
        <div
          className="text-center tracking-[0.7em]"
          style={{
            fontSize: "clamp(80px, 20vw, 200px)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 0.85,
            userSelect: "none",
          }}
        >
          KICKS
        </div>
      </div>
    </footer>
  );
}

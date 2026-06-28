'use Client' ;

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1F2A44] mt-10">
      <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#3A4A6A]">
          Built for Codec Assignment &bull; &copy; 2026 Secure Multimedia Codec
          Studio &bull; Built for Media Engineers
        </p>

        <div className="flex items-center gap-2">
          {["Next.js", "FastAPI", "Python"].map((t) => (
            <span
              key={t}
              className="text-xs font-medium text-[#4A5578] px-2.5 py-1 rounded-full border border-[#1F2A44] bg-[#0D1526]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
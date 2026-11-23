"use client";

import { Phone, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function FloatingContact() {
  const scrollToConsult = () => {
    const el = document.getElementById("tu-van");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <aside
      aria-label="Kênh liên hệ nhanh"
      className="fixed right-4 sm:right-6 bottom-6 z-50 flex flex-col gap-3 items-center"
    >
      {/* Consultation button */}
      <button
        onClick={scrollToConsult}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#84150e] text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center justify-center cursor-pointer"
        aria-label="Đăng ký tư vấn"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
        <Send className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          Đăng ký tư vấn
        </span>
      </button>

      {/* Zalo Button */}
      <a
        href={siteConfig.social.zalo || "https://zalo.me"}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center justify-center"
        aria-label="Chat Zalo"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          Chat Zalo
        </span>
      </a>

      {/* Phone Call Hotline */}
      <a
        href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center justify-center"
        aria-label="Gọi hotline"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          Hotline: {siteConfig.phone}
        </span>
      </a>
    </aside>
  );
}

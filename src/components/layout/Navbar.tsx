"use client";

import Image from "next/image";
import Script from "next/script";
import CampusSwitcher from "./CampusSwitcher";
import { CampusConfig } from "@/lib/types";

interface NavbarProps {
  currentCampus: CampusConfig;
}

export default function Navbar({ currentCampus }: NavbarProps) {
  const handleGiveClick = () => {
    const win = window as unknown as Record<string, unknown>;
    if (win.merlin) {
      const merlin = win.merlin as { open?: () => void };
      merlin.open?.();
    } else {
      window.open("https://www.baysideonline.com/give/", "_blank");
    }
  };

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Left: Logo + Campus */}
          <div className="flex items-center gap-5">
            <a href="/" className="flex-shrink-0">
              <Image
                src="/images/bayside-logo.svg"
                alt="Bayside Church"
                width={100}
                height={28}
                priority
                className="brightness-0 invert opacity-80"
              />
            </a>
            <CampusSwitcher currentCampus={currentCampus} />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGiveClick}
              className="rounded-full bg-bs-accent px-5 py-2 text-[13px] font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-bs-accent-hover hover:shadow-[0_4px_20px_rgba(30,58,95,0.4)]"
            >
              Give
            </button>
            <a
              href={currentCampus.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-white/10 px-5 py-2 text-[13px] font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 sm:inline-block"
            >
              Connect
            </a>
            {currentCampus.social.youtube && (
              <a
                href={currentCampus.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:text-white"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </nav>

      <Script
        src="https://merlin.bfrjrj.com/widget.js"
        data-merlin-id="bayside"
        strategy="lazyOnload"
      />
    </>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { campuses } from "@/lib/campuses";
import { CampusConfig } from "@/lib/types";

interface CampusSwitcherProps {
  currentCampus: CampusConfig;
}

export default function CampusSwitcher({ currentCampus }: CampusSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Dropdown */}
      <div className="relative hidden sm:block" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
        >
          {currentCampus.label}
          <svg
            className={`h-3 w-3 text-white/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#151518] p-2 shadow-2xl">
            {campuses.map((campus) => (
              <Link
                key={campus.slug}
                href={`/${campus.slug}`}
                onClick={() => setIsOpen(false)}
                className={`flex w-full items-center rounded-xl px-4 py-2.5 text-left text-[13px] transition-all duration-150 ${
                  campus.slug === currentCampus.slug
                    ? "bg-bs-accent/10 font-semibold text-white"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                }`}
              >
                {campus.label}
                {campus.slug === currentCampus.slug && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-bs-accent" />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/70 sm:hidden"
      >
        {currentCampus.label}
        <svg className="h-3 w-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Mobile Bottom Sheet */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed right-0 bottom-0 left-0 z-[70] rounded-t-3xl bg-[#151518] sm:hidden">
            <div className="flex justify-center pt-3">
              <div className="h-1 w-10 rounded-full bg-white/15" />
            </div>

            <div className="px-6 pt-5 pb-2">
              <h3 className="text-[11px] font-bold tracking-[0.3em] text-white/30 uppercase">
                Select Campus
              </h3>
            </div>

            <div className="no-scrollbar max-h-[55vh] overflow-y-auto px-4 pb-10">
              {campuses.map((campus) => (
                <Link
                  key={campus.slug}
                  href={`/${campus.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex w-full items-center rounded-2xl px-4 py-4 text-left text-[15px] transition-all ${
                    campus.slug === currentCampus.slug
                      ? "bg-bs-accent/10 font-semibold text-white"
                      : "text-white/50"
                  }`}
                >
                  {campus.label}
                  {campus.slug === currentCampus.slug && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-bs-accent" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

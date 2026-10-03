import React from "react";
import { site } from "@/data";

const CLIENTS = site.trust.clients;

export default function TrustRibbon() {
  return (
    <section className="relative w-full border-y border-[var(--border-default)] bg-[var(--bg-primary)] py-5 px-4 lg:px-8 xl:px-12 overflow-hidden flex items-center">
      {/* Styles for Marquee Animation */}
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Marquee Track Container with Fade Edges */}
      <div
        className="flex-1 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)"
        }}
      >
        {/* Marquee Inner Track */}
        <div className="flex w-max animate-marquee items-center">
          {/* First set of logos */}
          <div className="flex items-center">
            {CLIENTS.map((client) => (
              <div
                key={`set1-${client}`}
                className="mx-4 md:mx-6 font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] border border-[var(--border-default)] rounded-sm px-4 py-1.5 hover:text-[var(--text-primary)] hover:border-[var(--border-brand)] transition-colors duration-300 cursor-default whitespace-nowrap"
              >
                {client}
              </div>
            ))}
          </div>
          {/* Second set of logos (duplicated for seamless loop) */}
          <div className="flex items-center">
            {CLIENTS.map((client) => (
              <div
                key={`set2-${client}`}
                className="mx-4 md:mx-6 font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] border border-[var(--border-default)] rounded-sm px-4 py-1.5 hover:text-[var(--text-primary)] hover:border-[var(--border-brand)] transition-colors duration-300 cursor-default whitespace-nowrap"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

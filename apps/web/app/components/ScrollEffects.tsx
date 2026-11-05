"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    // --- Navbar scroll effect ---
    const nav = document.getElementById("main-nav");
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (nav) {
            if (window.scrollY > 10) {
              nav.classList.add("nav-scrolled");
            } else {
              nav.classList.remove("nav-scrolled");
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    // --- Scroll-triggered animations ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}

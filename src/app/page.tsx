"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const photos = [
  { src: "/old.jpg", alt: "Throwback", caption: "Looking back with love" },
  { src: "/family_nature.jpg", alt: "In nature", caption: "Adventures with you" },
  { src: "/holding_cat.jpg", alt: "With our furry friend", caption: "Even the cats love you" },
  { src: "/holding_corgi.jpg", alt: "Corgi cuddles", caption: "Puppy love runs in the family" },
  { src: "/hs_grad.jpg", alt: "High school graduation", caption: "You were there for every milestone" },
  { src: "/IMG_2959.jpg", alt: "Special memory", caption: "A moment I'll never forget" },
  { src: "/mom_and_i.jpg", alt: "Mom and me", caption: "The bond that never breaks" },
  { src: "/family_gf.jpg", alt: "Family time", caption: "Precious moments together" },
  { src: "/posing_in_museum.jpg", alt: "Museum day", caption: "Culture and love" },
  { src: "/sunglasses_solo.jpg", alt: "Cool mom", caption: "The coolest mom ever" },
  { src: "/walking_dogs.jpg", alt: "Dog walking", caption: "Simple joys together" },
  { src: "/walking_dogs_family.jpg", alt: "Family walk", caption: "Walking through life together" },
  { src: "/waterfall_selfie.jpg", alt: "Waterfall adventure", caption: "Chasing waterfalls" },
  { src: "/wm_arrival.jpg", alt: "Arrival day", caption: "New beginnings" },
];

export default function Home() {
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);

  useEffect(() => {
    // Generate floating hearts
    const heartCount = 20;
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      size: 1 + Math.random() * 1.5,
    }));
    setHearts(newHearts);

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            setRevealedSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart-particle absolute"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}rem`,
              animationDelay: `${heart.delay}s`,
              animationDuration: "15s",
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8 animate-float">
            <span className="text-6xl md:text-8xl">💐</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Happy Mother's Day
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            To the most amazing mom in the world
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <span className="text-4xl animate-heart inline-block">❤️</span>
            <span className="text-4xl animate-heart inline-block delay-100">💖</span>
            <span className="text-4xl animate-heart inline-block delay-200">💕</span>
          </div>
          <p className="mt-12 text-gray-500 animate-pulse">Scroll down for a surprise ↓</p>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="relative z-10 py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              Memories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.src}
                id={`photo-${index}`}
                className="scroll-reveal group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="photo-card bg-white">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">{photo.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Letter Section */}
      <section className="relative z-10 py-24 px-4 bg-gradient-to-b from-rose-50 to-pink-100">
        <div className="max-w-3xl mx-auto">
          <div className="scroll-reveal letter-paper rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-5xl">💌</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-pink-800">
              A Letter to You, Mom
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Dear Mom,
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                On this special day, I wanted to create something just for you to express just how much you mean to me.
                Words can't fully capture the depth of my gratitude, but I'll spend my whole life trying.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Thank you for believing in me when I doubted myself. Thank you for your endless sacrifices,
                your unconditional love, and for always being my biggest cheerleader. Most of all, thank you
                for <span className="font-semibold text-pink-600">paying for my college education</span> —
                a gift that has shaped my entire future and opened doors I never thought possible.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your investment in my education wasn't just financial — it was an investment in my dreams,
                my potential, and my future. You never once hesitated. You just said, "Go learn, grow, and
                become who you're meant to be."
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                As you come down to celebrate my graduation with me, I want you to know that this achievement
                is as much yours as it is mine. Every late night studying, every exam passed, every lesson
                learned — it all started with your love and support.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are my role model, my hero, and my best friend. I hope I can be even half the person
                you are.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                I love you more than words can say. Happy Mother's Day!
              </p>
              <p className="text-gray-700 leading-relaxed mt-8">
                With all my love,<br />
                Your Grateful Child
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              <span className="text-2xl animate-bounce">💕</span>
              <span className="text-2xl animate-bounce delay-100">💖</span>
              <span className="text-2xl animate-bounce delay-200">💗</span>
            </div>
          </div>
        </div>
      </section>

      {/* Graduation Celebration Section */}
      <section className="relative z-10 py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="scroll-reveal">
            <div className="text-6xl mb-6 animate-float">🎓</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
              Graduation Day!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Today isn't just about graduation — it's about celebrating YOU, Mom.
            </p>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Every degree, every certificate, every achievement I'll ever earn
              bears your name as much as mine. Thank you for making this day possible.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="text-5xl">🎉</span>
              <span className="text-5xl">🎊</span>
              <span className="text-5xl">🌸</span>
              <span className="text-5xl">🌺</span>
              <span className="text-5xl">🎁</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 bg-gradient-to-r from-pink-100 to-rose-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-4">Made with all my love for the best mom ever</p>
          <div className="flex justify-center gap-2 text-2xl">
            <span className="animate-pulse">❤️</span>
            <span className="animate-pulse delay-100">💕</span>
            <span className="animate-pulse delay-200">💖</span>
            <span className="animate-pulse delay-300">💗</span>
            <span className="animate-pulse delay-400">💓</span>
          </div>
          <p className="text-gray-500 text-sm mt-8">Happy Mother's Day 2026</p>
        </div>
      </footer>
    </div>
  );
}

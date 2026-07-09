"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IMG } from "@/lib/images";

const KEY = "rdv-age-ok";

export function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ok = document.cookie.includes(`${KEY}=1`) || localStorage.getItem(KEY) === "1";
    if (!ok) setShow(true);
  }, []);

  const confirm = () => {
    localStorage.setItem(KEY, "1");
    document.cookie = `${KEY}=1; max-age=${60 * 60 * 24 * 90}; path=/`;
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0">
            <Image src={IMG.heroValley} alt="" fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-oxblood-deep/85" />
          </div>
          <motion.div
            className="relative mx-6 max-w-lg bg-bone px-8 py-12 text-center md:px-14 md:py-16"
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow">Red del Vino · Colchagua Valley</p>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl">Are you of legal drinking age?</h2>
            <p className="mx-auto mt-5 max-w-sm font-sans text-sm leading-relaxed text-charcoal-soft">
              You must be of legal drinking age in your country to enter. Please enjoy our wines responsibly.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button onClick={confirm} className="btn-primary">
                Yes, I am
              </button>
              <a href="https://www.responsibility.org" className="btn-outline">
                No
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

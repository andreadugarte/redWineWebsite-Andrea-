"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/components/i18n/LocaleProvider";

const KEY = "rdv-age-ok";

export function AgeGate() {
  const [show, setShow] = useState(false);
  const tr = useT();

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-title"
        >
          <div className="w-full max-w-md bg-bone px-8 py-10 text-center">
            <Image src="/images/original/Red-del-Vino-logo-2026-transparent.png" alt="Red del Vino" width={64} height={64} className="mx-auto h-16 w-16" />
            <h2 id="age-title" className="mt-5 font-serif text-3xl text-charcoal">{tr("age.title")}</h2>
            <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-charcoal-soft">{tr("age.body")}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button onClick={confirm} className="btn-primary">
                {tr("age.yes")}
              </button>
              <a href="https://www.responsibility.org" className="btn-outline text-charcoal">
                {tr("age.no")}
              </a>
            </div>
            <p className="mt-6 border-t border-charcoal/10 pt-4 font-sans text-[11px] leading-snug text-charcoal/60">{tr("age.warning")}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

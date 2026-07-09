import Link from "next/link";
import Image from "next/image";
import { IMG } from "@/lib/images";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center text-center">
      <Image src={IMG.heroValleyAlt} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-oxblood-deep/80" />
      <div className="relative z-10 text-bone">
        <p className="eyebrow text-gold-pale">Lost in the vines</p>
        <h1 className="mt-4 font-serif text-6xl font-light md:text-8xl">404</h1>
        <p className="mt-4 font-sans text-sm text-bone/70">This page could not be found.</p>
        <Link href="/" className="btn mt-8 bg-bone px-8 py-4 text-charcoal hover:bg-gold hover:text-bone">
          Return Home
        </Link>
      </div>
    </div>
  );
}

"use client";

// Meta Pixel for reddelvino.com (dataset "Red del Vino - Web").
// Mount once in app/layout.tsx (inside <body>), wrapped in <Suspense>.
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "1936279427735608";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstLoad = useRef(true);

  // Track PageView on client-side navigations (the first one is sent by the base code).
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname, searchParams]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

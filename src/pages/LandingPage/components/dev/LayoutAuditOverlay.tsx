import React, { useEffect, useMemo, useState } from "react";
import { Image } from "image-js";

// Minimal overlay to compare a mask image with the current containers sizes.
// Activate by adding ?audit=1 to the URL.
// It overlays the reference mask and prints small deltas for each slot.

type Box = { top: number; bottom: number; left: number; right: number };

const pct = (n: number) => `${Math.round(n * 100)}%`;

function groupSegments(mask: Uint8ClampedArray, w: number, h: number, x0: number, x1: number) {
  const threshold = Math.max(1, Math.floor((x1 - x0 + 1) * 0.4));
  const isBlack = (r: number, g: number, b: number) => r < 40 && g < 40 && b < 40; // dark area => container
  const rowHasBlack: boolean[] = new Array(h).fill(false);

  for (let y = 0; y < h; y++) {
    let count = 0;
    for (let x = x0; x <= x1; x++) {
      const idx = (y * w + x) * 4;
      const r = mask[idx], g = mask[idx + 1], b = mask[idx + 2];
      if (isBlack(r, g, b)) count++;
    }
    rowHasBlack[y] = count >= threshold;
  }

  // group contiguous rows
  const segments: { y0: number; y1: number }[] = [];
  let start = -1;
  for (let y = 0; y < h; y++) {
    if (rowHasBlack[y]) {
      if (start === -1) start = y;
    } else if (start !== -1) {
      segments.push({ y0: start, y1: y - 1 });
      start = -1;
    }
  }
  if (start !== -1) segments.push({ y0: start, y1: h - 1 });

  // sort by height
  segments.sort((a, b) => (b.y1 - b.y0) - (a.y1 - a.y0));
  return segments;
}

function computeBoxesFromMask(img: Image) {
  const { width: w, height: h, data } = img;
  const columns = [0, 1, 2].map((i) => ({
    x0: Math.round((i * w) / 3),
    x1: Math.round(((i + 1) * w) / 3) - 1,
  }));

  const boxes: { [k: string]: Box } = {};

  columns.forEach((col, i) => {
    const segs = groupSegments(data as unknown as Uint8ClampedArray, w, h, col.x0, col.x1);
    if (segs[0]) {
      boxes[`card-${i + 1}`] = { top: segs[0].y0, bottom: segs[0].y1, left: col.x0, right: col.x1 };
    }
    if (i < 2 && segs[1]) {
      boxes[`bar-${i + 1}`] = { top: segs[1].y0, bottom: segs[1].y1, left: col.x0, right: col.x1 };
    }
  });

  return { boxes, w, h };
}

const LayoutAuditOverlay = ({ maskUrl }: { maskUrl: string }) => {
  const show = useMemo(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("audit") === "1", []);
  const [expected, setExpected] = useState<{ boxes: { [k: string]: Box }; w: number; h: number } | null>(null);
  const [actual, setActual] = useState<{ [k: string]: DOMRect } | null>(null);

  useEffect(() => {
    if (!show) return;
    let mounted = true;
    Image.load(maskUrl).then((img) => {
      if (!mounted) return;
      setExpected(computeBoxesFromMask(img));
    });
    return () => {
      mounted = false;
    };
  }, [maskUrl, show]);

  useEffect(() => {
    if (!show) return;
    const ids = ["card-1", "card-2", "card-3", "bar-1", "bar-2"] as const;
    const rects: { [k: string]: DOMRect } = {};
    ids.forEach((id) => {
      const el = document.querySelector(`[data-audit="${id}"]`) as HTMLElement | null;
      if (el) rects[id] = el.getBoundingClientRect();
    });
    setActual(rects);
  }, [show]);

  if (!show) return null;

  const viewW = typeof window !== "undefined" ? window.innerWidth : 0;
  const viewH = typeof window !== "undefined" ? window.innerHeight : 0;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
      {/* Reference mask overlay */}
      <img src={maskUrl} alt="Máscara de referência" className="absolute inset-0 m-auto h-full w-full object-contain opacity-20" />

      {/* Small deltas */}
      {expected && actual && (
        <>
          {Object.entries(actual).map(([key, rect]) => {
            const exp = expected.boxes[key];
            if (!exp) return null;
            const expAR = (exp.right - exp.left) / Math.max(1, (exp.bottom - exp.top));
            const actAR = rect.width / Math.max(1, rect.height);
            const delta = Math.abs(expAR - actAR) / expAR; // relative error
            return (
              <div key={key} style={{ position: "fixed", left: rect.left + 8, top: rect.top + 8 }} className="rounded-md bg-black/60 px-2 py-1 text-[11px] text-white shadow-md">
                {key}: Δ {pct(delta)} (exp {expAR.toFixed(2)} vs {actAR.toFixed(2)})
              </div>
            );
          })}
          <div className="fixed bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-[11px] text-white">viewport {viewW}x{viewH}</div>
        </>
      )}
    </div>
  );
};

export default LayoutAuditOverlay;

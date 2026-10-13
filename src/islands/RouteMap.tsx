/**
 * Route map island. Plots a journey's stops on a plain equirectangular canvas
 * and draws the route between them when the map scrolls into view. No basemap
 * tiles, no political boundaries, a few kilobytes.
 *
 * Also used on destination and home pages in "constellation" mode, where each
 * dot links to a page instead of a day.
 */
import { useEffect, useMemo, useRef, useState } from 'react';

export interface Stop {
  name: string;
  lat: number;
  lng: number;
  nights?: number;
  /** Day number to jump to (journey mode). */
  day?: number;
  /** Link target (constellation mode). */
  href?: string;
}

interface Props {
  stops: Stop[];
  mode?: 'route' | 'constellation';
  title?: string;
  /** Fit to the whole of India instead of the stops' bounding box. */
  fitIndia?: boolean;
}

const INDIA = { minLat: 6.5, maxLat: 36.5, minLng: 67.5, maxLng: 97.5 };

export default function RouteMap({ stops, mode = 'route', title = 'Route', fitIndia = false }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [moving, setMoving] = useState(false);

  const W = 720;
  const PAD = 56;
  // Height follows the route's shape: long north-south routes get a taller map
  // so clustered stops (Kerala on a three-week journey) keep room to breathe.
  const H = useMemo(() => {
    if (fitIndia) return 760;
    const lat = Math.max(...stops.map(s => s.lat)) - Math.min(...stops.map(s => s.lat));
    const lng = Math.max(...stops.map(s => s.lng)) - Math.min(...stops.map(s => s.lng));
    const ratio = Math.max(lat, 0.9) / (Math.max(lng, 0.9) * 0.9);
    return Math.round(Math.min(860, Math.max(440, 520 * ratio)));
  }, [stops, fitIndia]);

  const points = useMemo(() => {
    const b = fitIndia
      ? INDIA
      : {
          minLat: Math.min(...stops.map(s => s.lat)),
          maxLat: Math.max(...stops.map(s => s.lat)),
          minLng: Math.min(...stops.map(s => s.lng)),
          maxLng: Math.max(...stops.map(s => s.lng)),
        };
    // Keep a sensible aspect even when stops line up north-south.
    const latSpan = Math.max(b.maxLat - b.minLat, 0.9);
    const lngSpan = Math.max(b.maxLng - b.minLng, 0.9);
    const latMid = (b.maxLat + b.minLat) / 2;
    const lngMid = (b.maxLng + b.minLng) / 2;
    const cosLat = Math.cos((latMid * Math.PI) / 180);
    const scale = Math.min((W - PAD * 2) / (lngSpan * cosLat), (H - PAD * 2) / latSpan);
    return stops.map(s => ({
      ...s,
      x: W / 2 + (s.lng - lngMid) * cosLat * scale,
      y: H / 2 - (s.lat - latMid) * scale,
    }));
  }, [stops, fitIndia, H]);

  /**
   * Label placement: one label per place (a route that returns to Delhi shows
   * "Delhi" once, with both stays), on whichever side does not collide with a
   * label already placed, nudged vertically as a last resort.
   */
  const labels = useMemo(() => {
    type Box = { x1: number; y1: number; x2: number; y2: number };
    const placed: Box[] = [];
    const seen = new Map<string, number>();
    const hit = (a: Box) => placed.some(b => a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1);
    return points.map((p, i) => {
      const prior = seen.get(p.name);
      if (prior !== undefined) return { show: false, x: 0, y: 0, anchor: 'start' as const, text: '' };
      seen.set(p.name, i);
      const stays = points.filter(q => q.name === p.name).map(q => q.nights).filter(n => n);
      const text = `${p.name}${stays.length ? `, ${stays.map(n => `${n} ${n === 1 ? 'night' : 'nights'}`).join(' and ')}` : ''}`;
      const w = text.length * 7.6 + 6;
      const tries: { anchor: 'start' | 'end'; dx: number; dy: number }[] = [
        { anchor: p.x < W * 0.62 ? 'start' : 'end', dx: p.x < W * 0.62 ? 14 : -14, dy: 4 },
        { anchor: p.x < W * 0.62 ? 'end' : 'start', dx: p.x < W * 0.62 ? -14 : 14, dy: 4 },
        { anchor: 'start', dx: 14, dy: -14 },
        { anchor: 'start', dx: 14, dy: 22 },
        { anchor: 'end', dx: -14, dy: -14 },
        { anchor: 'end', dx: -14, dy: 22 },
      ];
      for (const t of tries) {
        const x1 = t.anchor === 'start' ? p.x + t.dx : p.x + t.dx - w;
        const box = { x1, y1: p.y + t.dy - 13, x2: x1 + w, y2: p.y + t.dy + 4 };
        if (!hit(box)) { placed.push(box); return { show: true, x: p.x + t.dx, y: p.y + t.dy, anchor: t.anchor, text }; }
      }
      const t = tries[0];
      return { show: true, x: p.x + t.dx, y: p.y + t.dy, anchor: t.anchor, text };
    });
  }, [points]);

  const path = useMemo(() => {
    if (mode !== 'route' || points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      // A gentle curve, bowing perpendicular to the segment.
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const k = Math.min(40, len * 0.18);
      const cx = mx - (dy / len) * k;
      const cy = my + (dx / len) * k;
      d += ` Q ${cx} ${cy} ${b.x} ${b.y}`;
    }
    return d;
  }, [points, mode]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setDrawn(true); return; }
    setMoving(true);
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setDrawn(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (p: (typeof points)[number]) => {
    if (mode === 'constellation' && p.href) { window.location.href = p.href; return; }
    if (p.day) {
      const target = document.getElementById(`day-${p.day}`);
      if (target) {
        history.replaceState(null, '', `#day-${p.day}`);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <figure className="route-map rounded-[26px] bg-bg-muted p-3 sm:p-5 md:p-6">
      <figcaption className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 text-[0.85rem] font-semibold text-ink-muted">
        <span className="font-bold text-ink">{title}</span>
        {mode === 'route' && <span>{points.length} stops. Tap a stop to go to that day.</span>}
      </figcaption>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} role="group" aria-label={`${title}: ${points.map(p => p.name).join(', ')}`} className="h-auto w-full">
        <defs>
          <radialGradient id="rm-bg" cx="50%" cy="45%" r="70%">
            <stop offset="0" stopColor="var(--c-bg-muted)" />
            <stop offset="1" stopColor="var(--c-bg-elevated)" />
          </radialGradient>
          <pattern id="rm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--c-line)" />
          </pattern>
        </defs>
        <rect width={W} height={H} rx="18" fill="url(#rm-bg)" />
        <rect width={W} height={H} rx="18" fill="url(#rm-grid)" />

        {path && (
          <path
            d={path}
            fill="none"
            stroke="var(--c-brand)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="2000"
            strokeDashoffset={drawn ? 0 : 2000}
            style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)' }}
          />
        )}

        {path && drawn && moving && (
          <g aria-hidden="true">
            <circle r="9" fill="var(--c-brand)" opacity="0.22">
              <animateMotion dur={`${Math.max(7, points.length * 1.8)}s`} begin="1.9s" repeatCount="indefinite" path={path} />
            </circle>
            <circle r="4.5" fill="var(--c-brand-deep)" stroke="var(--c-bg-elevated)" strokeWidth="2">
              <animateMotion dur={`${Math.max(7, points.length * 1.8)}s`} begin="1.9s" repeatCount="indefinite" path={path} />
            </circle>
          </g>
        )}

        {points.map((p, i) => {
          const isActive = active === i;
          return (
            <g
              key={`${p.name}-${i}`}
              tabIndex={0}
              role="button"
              aria-label={`${p.name}${p.nights ? `, ${p.nights} night${p.nights === 1 ? '' : 's'}` : ''}${p.day ? `, day ${p.day}` : ''}`}
              className="cursor-pointer outline-none"
              onClick={() => go(p)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(p); } }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              style={{ opacity: drawn ? 1 : 0, transition: `opacity .5s ${0.25 + i * 0.12}s` }}
            >
              <circle cx={p.x} cy={p.y} r={isActive ? 16 : 12} fill="var(--c-brand)" opacity="0.18" />
              {/* Visible focus/hover ring, since the group suppresses the browser outline. */}
              {isActive && <circle cx={p.x} cy={p.y} r="11" fill="none" stroke="var(--c-brand-deep)" strokeWidth="2" />}
              <circle cx={p.x} cy={p.y} r="6" fill="var(--c-brand)" stroke="var(--c-bg-elevated)" strokeWidth="2.5" />
              {mode === 'route' && (
                <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontSize="8" fontWeight="700" fill="#1b1d21">{i + 1}</text>
              )}
              {labels[i]?.show && (
                <text
                  x={labels[i].x}
                  y={labels[i].y}
                  textAnchor={labels[i].anchor}
                  fontSize="13"
                  fontFamily="var(--font-sans)"
                  fontWeight={isActive ? 700 : 500}
                  fill="var(--c-ink)"
                  style={{ paintOrder: 'stroke', stroke: 'var(--c-bg-elevated)', strokeWidth: 4, strokeLinejoin: 'round' }}
                >
                  {labels[i].text}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

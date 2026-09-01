import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ------------------------------------------------------------------ */
/*  Chair parts — each is an absolutely-positioned div in a 3D scene.  */
/*  `explode` is the offset from the assembled position at scroll 0.  */
/*  `start`/`end` are the scroll-progress window during which the     */
/*  part travels from exploded → assembled.                           */
/* ------------------------------------------------------------------ */

interface ChairPart {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  z: number; // assembled depth
  explode: { x: number; y: number; z: number };
  start: number;
  end: number;
  tone: 'light' | 'medium' | 'dark';
  shape: 'rect' | 'tapered' | 'slat' | 'seat';
}

const CHAIR_PARTS: ChairPart[] = [
  // Rear stiles (tall verticals forming backrest sides + rear legs)
  { id: 'stile-l', left: 38, top: 28, width: 18, height: 432, z: -28, explode: { x: -55, y: -210, z: -110 }, start: 0.24, end: 0.44, tone: 'dark', shape: 'tapered' },
  { id: 'stile-r', left: 264, top: 28, width: 18, height: 432, z: -28, explode: { x: 55, y: -210, z: -110 }, start: 0.27, end: 0.47, tone: 'dark', shape: 'tapered' },
  // Top rail of backrest
  { id: 'top-rail', left: 38, top: 28, width: 244, height: 24, z: -28, explode: { x: 0, y: -280, z: -100 }, start: 0.54, end: 0.74, tone: 'medium', shape: 'rect' },
  // Backrest slats
  { id: 'slat-1', left: 64, top: 70, width: 192, height: 9, z: -26, explode: { x: 0, y: -210, z: -80 }, start: 0.46, end: 0.66, tone: 'medium', shape: 'slat' },
  { id: 'slat-2', left: 64, top: 102, width: 192, height: 9, z: -26, explode: { x: 0, y: -190, z: -80 }, start: 0.48, end: 0.68, tone: 'medium', shape: 'slat' },
  { id: 'slat-3', left: 64, top: 134, width: 192, height: 9, z: -26, explode: { x: 0, y: -170, z: -80 }, start: 0.50, end: 0.70, tone: 'medium', shape: 'slat' },
  // Seat slab
  { id: 'seat', left: 22, top: 248, width: 276, height: 32, z: 0, explode: { x: 0, y: -50, z: 30 }, start: 0.36, end: 0.56, tone: 'light', shape: 'seat' },
  // Front legs
  { id: 'leg-fl', left: 32, top: 276, width: 22, height: 184, z: 28, explode: { x: -35, y: 190, z: 130 }, start: 0.12, end: 0.32, tone: 'dark', shape: 'tapered' },
  { id: 'leg-fr', left: 266, top: 276, width: 22, height: 184, z: 28, explode: { x: 35, y: 190, z: 130 }, start: 0.15, end: 0.35, tone: 'dark', shape: 'tapered' },
  // Front stretcher (low support between front legs)
  { id: 'stretcher', left: 32, top: 416, width: 256, height: 14, z: 28, explode: { x: 0, y: 240, z: 130 }, start: 0.18, end: 0.38, tone: 'medium', shape: 'rect' },
];

/* ------------------------------------------------------------------ */
/*  Easing & helpers                                                  */
/* ------------------------------------------------------------------ */

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/* ------------------------------------------------------------------ */
/*  Wood texture styles                                               */
/* ------------------------------------------------------------------ */

function woodStyle(tone: ChairPart['tone']): React.CSSProperties {
  const tones: Record<ChairPart['tone'], { grad: string; grain: string; highlight: string; shadow: string }> = {
    light: {
      grad: 'linear-gradient(180deg, #CBB491 0%, #B0936A 45%, #96764E 100%)',
      grain: 'rgba(94,70,40,0.05)',
      highlight: 'rgba(240,232,216,0.45)',
      shadow: 'rgba(94,70,40,0.3)',
    },
    medium: {
      grad: 'linear-gradient(180deg, #B0936A 0%, #96764E 50%, #7A5D3A 100%)',
      grain: 'rgba(67,50,27,0.07)',
      highlight: 'rgba(203,180,145,0.3)',
      shadow: 'rgba(67,50,27,0.4)',
    },
    dark: {
      grad: 'linear-gradient(180deg, #96764E 0%, #7A5D3A 50%, #5E4628 100%)',
      grain: 'rgba(43,31,18,0.09)',
      highlight: 'rgba(176,147,106,0.22)',
      shadow: 'rgba(43,31,18,0.5)',
    },
  };
  const t = tones[tone];
  return {
    backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 2px, ${t.grain} 2px, ${t.grain} 3px, transparent 3px, transparent 7px), ${t.grad}`,
    boxShadow: `inset 0 1px 0 ${t.highlight}, inset 0 -1px 0 ${t.shadow}, inset 1px 0 0 ${t.highlight}, inset -1px 0 0 ${t.shadow}`,
  };
}

function shapeClip(shape: ChairPart['shape']): string {
  switch (shape) {
    case 'tapered':
      return 'polygon(0 0, 100% 0, 86% 100%, 14% 100%)';
    case 'slat':
      return 'polygon(3% 0, 97% 0, 100% 100%, 0 100%)';
    case 'seat':
      return 'polygon(0 8%, 100% 0%, 100% 92%, 0 100%)';
    default:
      return 'none';
  }
}

/* ------------------------------------------------------------------ */
/*  Stage definitions                                                 */
/* ------------------------------------------------------------------ */

interface Stage {
  num: string;
  label: string;
  title: string;
  copy: string;
  range: [number, number];
}

const STAGES: Stage[] = [
  { num: '01', label: 'Material', title: 'Every piece starts with the material.', copy: 'Solid hardwood, chosen grain by grain.', range: [0, 0.24] },
  { num: '02', label: 'Craft', title: 'Each component finds its place.', copy: 'Legs, seat, and frame — joined by hand.', range: [0.24, 0.56] },
  { num: '03', label: 'Form', title: 'Form follows the way it\u2019s made.', copy: 'The structure becomes the design.', range: [0.56, 0.86] },
  { num: '04', label: 'Finish', title: 'One piece. Built to last.', copy: 'A chair that will outlive the room.', range: [0.86, 1.0] },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mount + responsive
  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Scroll progress through the hero section
  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = -rect.top;
      setProgress(total > 0 ? clamp01(scrolled / total) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  // Effective progress (reduced motion → fully assembled)
  const p = reduced ? 1 : progress;
  const explodeScale = isMobile ? 0.5 : 1;
  const chairScale = isMobile ? 0.72 : 1;

  // Camera rotateY shifts subtly across the full scroll
  const cameraY = -10 + p * 14; // -10° → +4°
  const cameraX = 3 - p * 2; // 3° → 1°

  // Ground shadow
  const shadowScale = 1.4 - p * 0.45;
  const shadowOpacity = 0.15 + p * 0.35;

  const partTransforms = useMemo(() => {
    return CHAIR_PARTS.map((part) => {
      const localP = clamp01((p - part.start) / (part.end - part.start));
      const eased = easeInOutCubic(localP);
      const offset = 1 - eased;
      const ex = part.explode.x * explodeScale;
      const ey = part.explode.y * explodeScale;
      const ez = part.explode.z * explodeScale;
      const opacity = reduced ? 1 : 0.35 + eased * 0.65;
      return {
        ...part,
        transform: `translate3d(${ex * offset}px, ${ey * offset}px, ${ez * offset}px)`,
        opacity,
      };
    });
  }, [p, explodeScale, reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink grain-overlay"
      style={{ height: reduced ? 'auto' : '360vh' }}
      aria-label="Hero — furniture assembly"
    >
      <div className={`sticky top-0 overflow-hidden flex flex-col ${reduced ? 'relative h-auto min-h-screen py-24' : 'h-screen'}`}>
        {/* Ambient background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 55% 48%, rgba(94,70,40,0.28) 0%, rgba(26,22,18,0) 70%)',
          }}
        />

        {/* Layout grid */}
        <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center md:items-stretch">
          {/* Left — stage text */}
          <div className="relative w-full md:w-[42%] flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-24 md:pt-0 pb-6 md:pb-0 min-h-[280px] md:min-h-0">
            {STAGES.map((stage) => {
              const [s, e] = stage.range;
              const opacity = smoothstep(s, s + 0.04, p) * (1 - smoothstep(e - 0.04, e, p));
              if (opacity < 0.01 && !reduced) return null;
              return (
                <div
                  key={stage.num}
                  className="absolute md:absolute top-1/2 md:top-1/2 left-6 md:left-12 lg:left-16 right-6 md:right-auto -translate-y-1/2"
                  style={{ opacity: reduced ? (stage.num === '04' ? 1 : 0) : opacity }}
                >
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <span className="label-meta text-wood-300">{stage.num}</span>
                    <span className="h-px w-8 bg-wood-500/40" />
                    <span className="label-meta text-wood-300">{stage.label}</span>
                  </div>
                  <h1 className="heading-editorial text-bone text-[2.25rem] sm:text-5xl lg:text-6xl xl:text-7xl text-balance max-w-[14ch]">
                    {stage.title}
                  </h1>
                  <p className="mt-4 md:mt-6 text-wood-200/70 text-sm md:text-base font-light max-w-[36ch] leading-relaxed">
                    {stage.copy}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right — 3D chair scene */}
          <div className="flex-1 flex items-center justify-center relative">
            <div
              className="relative"
              style={{
                perspective: isMobile ? 700 : 900,
                perspectiveOrigin: '50% 42%',
                transform: `scale(${chairScale})`,
                transformOrigin: 'center center',
                opacity: mounted ? 1 : 0,
                transition: 'opacity 1.2s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              {/* Chair wrapper — camera rotation */}
              <div
                className="preserve-3d relative"
                style={{
                  width: 320,
                  height: 480,
                  transform: `rotateY(${reduced ? 0 : cameraY}deg) rotateX(${reduced ? 0 : cameraX}deg)`,
                  transition: reduced ? 'none' : undefined,
                }}
              >
                {/* Ground shadow */}
                <div
                  className="absolute left-1/2"
                  style={{
                    bottom: 8,
                    width: 260,
                    height: 40,
                    transform: `translateX(-50%) scale(${shadowScale})`,
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)',
                    opacity: shadowOpacity,
                    filter: 'blur(8px)',
                  }}
                />

                {/* Chair parts */}
                {partTransforms.map((part) => (
                  <div
                    key={part.id}
                    className="preserve-3d backface-hidden will-change-transform"
                    style={{
                      position: 'absolute',
                      left: part.left,
                      top: part.top,
                      width: part.width,
                      height: part.height,
                      transform: part.transform,
                      transformOrigin: 'center center',
                      clipPath: shapeClip(part.shape),
                      ...woodStyle(part.tone),
                      opacity: part.opacity,
                      transition: reduced ? 'opacity 0.8s ease' : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        {!reduced && (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-wood-300/60"
            style={{ opacity: Math.max(0, 1 - p * 8) }}
          >
            <span className="label-meta text-[0.625rem]">Scroll to assemble</span>
            <div className="w-px h-8 bg-gradient-to-b from-wood-300/40 to-transparent" />
          </div>
        )}

        {/* Progress rail */}
        <div className="absolute top-0 right-0 h-full w-px bg-wood-700/20 hidden md:block">
          <div
            className="w-full bg-wood-400 origin-top"
            style={{ height: `${p * 100}%` }}
          />
        </div>
      </div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-bone pointer-events-none" />
    </section>
  );
}

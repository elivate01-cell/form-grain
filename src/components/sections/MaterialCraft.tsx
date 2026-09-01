import { SectionHeader } from './FeaturedPieces';
import { useReveal } from '@/hooks/useReveal';

const CRAFT_IMAGES = [
  {
    src: 'https://images.pexels.com/photos/36081877/pexels-photo-36081877.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Detailed view of wooden texture showing natural grain patterns and rich brown hues',
    label: 'Grain',
    caption: 'Selected board by board. We read the grain before we cut.',
  },
  {
    src: 'https://images.pexels.com/photos/37358115/pexels-photo-37358115.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Hands using a hand plane tool in woodworking, creating wood shavings',
    label: 'Joinery',
    caption: 'Mortise and tenon, dovetails, dowels — joints that hold for generations.',
  },
  {
    src: 'https://images.pexels.com/photos/7109995/pexels-photo-7109995.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Close-up of hands using a planer on wood with tools and shavings around',
    label: 'Finish',
    caption: 'Hand-rubbed oils and waxes. The surface should feel like skin, not plastic.',
  },
];

export function MaterialCraft() {
  return (
    <section id="material" className="bg-charcoal grain-overlay py-24 md:py-36">
      <div className="container-editorial">
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-5">
            <span className="label-meta text-wood-300">03</span>
            <span className="h-px w-10 bg-wood-400/40" />
            <span className="label-meta text-wood-300">Material &amp; Craft</span>
          </div>
          <h2 className="heading-editorial text-bone text-4xl sm:text-5xl lg:text-6xl text-balance max-w-[18ch]">
            The hands are the first tool.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CRAFT_IMAGES.map((item, i) => (
            <CraftCard key={item.label} item={item} index={i} />
          ))}
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 border-t border-wood-700/30 pt-12">
          {[
            { k: 'Solid', v: 'Hardwood only' },
            { k: 'Hand-cut', v: 'Every joint' },
            { k: 'Oil & wax', v: 'No varnish' },
            { k: 'Repairable', v: 'Built to outlive' },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-serif text-bone text-xl md:text-2xl">{s.k}</p>
              <p className="text-wood-300/60 text-sm mt-1 font-light">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CraftCard({ item, index }: { item: { src: string; alt: string; label: string; caption: string }; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} group`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-wood-900">
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.4s] ease-craft group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 label-meta text-bone/90">{item.label}</span>
      </div>
      <p className="mt-4 text-wood-200/70 text-sm md:text-[0.95rem] font-light leading-relaxed max-w-[34ch]">
        {item.caption}
      </p>
    </div>
  );
}

import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const SPACES = [
  { name: 'Homes', desc: 'Dining tables, lounge chairs, beds — pieces you live with daily.' },
  { name: 'Restaurants', desc: 'Communal tables, banquettes, and bar tops built for service.' },
  { name: 'Offices', desc: 'Desks, meeting tables, and shelving that hold up to daily use.' },
  { name: 'Hospitality', desc: 'Lobby seating, headboard walls, and casegoods for hotels.' },
];

export function CustomFurniture() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="custom" className="relative bg-ink grain-overlay py-24 md:py-36 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.pexels.com/photos/10316634/pexels-photo-10316634.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Interior of a wood workshop featuring a table saw, lumber stacks, and carpentry tools"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/50" />
      </div>

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} relative z-10 container-editorial`}>
        <div className="flex items-center gap-3 mb-5">
          <span className="label-meta text-wood-300">05</span>
          <span className="h-px w-10 bg-wood-400/40" />
          <span className="label-meta text-wood-300">Custom Furniture</span>
        </div>
        <h2 className="heading-editorial text-bone text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-balance max-w-[16ch]">
          Made for a specific room, a specific life.
        </h2>
        <p className="mt-6 text-wood-200/70 text-base md:text-lg font-light leading-relaxed max-w-[52ch]">
          We design and build furniture for spaces that need something off the shelf
          cannot provide. Every commission starts with a conversation about how you
          live, work, or host.
        </p>

        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-wood-700/30">
          {SPACES.map((space, i) => (
            <div
              key={space.name}
              className="bg-ink p-7 md:p-8 group transition-colors duration-500 hover:bg-charcoal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="label-meta text-wood-400">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="heading-editorial text-bone text-2xl mt-3">{space.name}</h3>
              <p className="mt-2 text-wood-200/50 text-sm font-light leading-relaxed">{space.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-7 py-4 border border-wood-400/40 text-bone font-medium tracking-wide-sm text-sm transition-all duration-500 hover:bg-bone hover:text-ink hover:border-bone"
          >
            Start a Commission
            <ArrowUpRight size={18} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

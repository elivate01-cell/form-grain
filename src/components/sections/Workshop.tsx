import { SectionHeader } from './FeaturedPieces';
import { useReveal } from '@/hooks/useReveal';

const STATS = [
  { value: '14', label: 'Years at the bench' },
  { value: '320+', label: 'Pieces made' },
  { value: '6', label: 'Hands in the shop' },
  { value: '1', label: 'Workshop, Lagos' },
];

export function Workshop() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="workshop" className="bg-bone py-24 md:py-36">
      <div className="container-editorial">
        <SectionHeader num="04" label="The Workshop" title="Yaba, Lagos. Where the wood waits." />

        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch`}>
          {/* Large image */}
          <div className="lg:col-span-7 relative overflow-hidden bg-cream aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
            <img
              src="https://images.pexels.com/photos/7484157/pexels-photo-7484157.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A craftsman focuses on woodworking in a sunlit workshop, surrounded by tools and machinery"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text + stats */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-ink/70 text-base md:text-lg font-light leading-relaxed max-w-[44ch]">
                Our workshop sits on a quiet street in Yaba, Lagos. Six makers work
                with solid hardwood — cutting, shaping, joining, and finishing by hand.
                No production line. No shortcuts. Each piece passes through every pair
                of hands in the shop before it leaves.
              </p>
              <p className="mt-5 text-ink/50 text-sm md:text-[0.95rem] font-light leading-relaxed max-w-[44ch]">
                We source African hardwoods — Iroko, Mahogany, Walnut — from sustainable
                mills and reclaim timber wherever we can.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-wood-300/40 pt-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="heading-editorial text-ink text-4xl md:text-5xl">{s.value}</p>
                  <p className="label-meta mt-2 text-wood-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

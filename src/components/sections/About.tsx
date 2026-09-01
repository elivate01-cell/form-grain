import { SectionHeader } from './FeaturedPieces';
import { useReveal } from '@/hooks/useReveal';

export function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="bg-cream py-24 md:py-36">
      <div className="container-editorial">
        <SectionHeader num="07" label="About" title="We build furniture the slow way." />

        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16`}>
          <div className="lg:col-span-7 lg:col-start-2">
            <div className="space-y-6 text-ink/75 text-lg md:text-xl font-light leading-relaxed max-w-[58ch]">
              <p>
                FORM &amp; GRAIN began in a small workshop in Yaba, Lagos, with a single
                belief: furniture should be made the way it was a hundred years ago —
                with solid wood, honest joints, and hands that know the material.
              </p>
              <p>
                We do not chase trends. We make pieces that settle into a room and
                stay. Every chair, table, and shelf is built to be repaired, not
                replaced — to age gracefully and carry the marks of a life lived
                around it.
              </p>
              <p>
                Our wood comes from African forests and reclaimed buildings. Our
                finishes are oils and waxes you can apply yourself, decades from now.
                Our joints are cut by hand, because that is still the strongest way
                to join two pieces of wood.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              <Principle text="Solid hardwood only" />
              <Principle text="Hand-cut joinery" />
              <Principle text="Repairable by design" />
              <Principle text="Made in Lagos" />
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <div className="relative overflow-hidden bg-sand aspect-[3/4]">
              <img
                src="https://images.pexels.com/photos/5973886/pexels-photo-5973886.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Male artisan with a spokeshave working at a wooden workbench in a professional studio"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 label-meta text-wood-500">In the workshop, Yaba</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Principle({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-1.5 w-1.5 rounded-full bg-wood-500" />
      <span className="text-ink/80 text-sm md:text-base font-medium">{text}</span>
    </div>
  );
}

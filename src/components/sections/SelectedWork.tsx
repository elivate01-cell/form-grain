import { useReveal } from '@/hooks/useReveal';

interface Work {
  src: string;
  alt: string;
  title: string;
  category: string;
  span: string; // tailwind grid span classes
}

const WORKS: Work[] = [
  {
    src: 'https://images.pexels.com/photos/7538106/pexels-photo-7538106.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Warmly lit rustic dining setup with wooden furniture and decorative elements',
    title: 'Heritage Dining Room',
    category: 'Residential',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/14792098/pexels-photo-14792098.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'A vintage leather armchair placed against a plain wall in a minimalist indoor setting',
    title: 'Leather Lounge Chair',
    category: 'Furniture',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/14176327/pexels-photo-14176327.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Stylish wooden shelf displaying decor and book, against white wall',
    title: 'Wall Library System',
    category: 'Residential',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/37737840/pexels-photo-37737840.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Chic restaurant interior featuring vibrant seating and elegant lighting',
    title: 'Restaurant Booths',
    category: 'Hospitality',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/6284234/pexels-photo-6284234.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Glass vase with fresh fruits placed on wooden table in stylish minimalist dining room',
    title: 'Minimalist Dining Set',
    category: 'Residential',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/34365797/pexels-photo-34365797.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Stylish lounge with leather chairs and industrial decor for a chic urban feel',
    title: 'Hotel Lobby Seating',
    category: 'Hospitality',
    span: 'md:col-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/33386955/pexels-photo-33386955.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Wooden shelves with elegant vases and floral display in a cozy room',
    title: 'Display Shelving',
    category: 'Retail',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/2547555/pexels-photo-2547555.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'A stylish home study featuring modern design, acoustic walls, and elegant seating arrangement',
    title: 'Home Office Suite',
    category: 'Residential',
    span: '',
  },
];

export function SelectedWork() {
  return (
    <section id="work" className="bg-bone py-24 md:py-36">
      <div className="container-editorial">
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="label-meta text-wood-500">06</span>
            <span className="h-px w-10 bg-wood-400/50" />
            <span className="label-meta text-wood-500">Selected Work</span>
          </div>
          <h2 className="heading-editorial text-ink text-4xl sm:text-5xl lg:text-6xl text-balance max-w-[18ch]">
            Pieces in the rooms they were made for.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[260px] gap-3 md:gap-4">
          {WORKS.map((work, i) => (
            <GalleryItem key={i} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ work, index }: { work: Work; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} group relative overflow-hidden bg-cream ${work.span}`}
      style={{ transitionDelay: `${(index % 4) * 90}ms` }}
    >
      <img
        src={work.src}
        alt={work.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-[1.4s] ease-craft group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
        <p className="label-meta text-bone/70">{work.category}</p>
        <h3 className="heading-editorial text-bone text-lg md:text-xl mt-1">{work.title}</h3>
      </div>
    </div>
  );
}

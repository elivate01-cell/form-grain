import { useReveal } from '@/hooks/useReveal';

interface Piece {
  num: string;
  name: string;
  material: string;
  description: string;
  price: string;
  image: string;
  alt: string;
}

const PIECES: Piece[] = [
  {
    num: '01',
    name: 'Oak Lounge Chair',
    material: 'Solid European Oak',
    description: 'Steam-bent backrest, hand-rubbed oil finish, mortise-and-tenon joinery.',
    price: 'From ₦285,000',
    image: 'https://images.pexels.com/photos/11474966/pexels-photo-11474966.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Simple wooden chair against a plain white wall in a studio setting',
  },
  {
    num: '02',
    name: 'Walnut Dining Table',
    material: 'African Walnut',
    description: 'Single-slab top with breadboard ends, tapered legs, natural edge retained.',
    price: 'From ₦640,000',
    image: 'https://images.pexels.com/photos/5472818/pexels-photo-5472818.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Long wooden dining table in a light-filled room with wooden beams',
  },
  {
    num: '03',
    name: 'Arc Bench',
    material: 'Iroko & Leather',
    description: 'Curved seat platform, hand-stitched leather strap, dovetailed base.',
    price: 'From ₦390,000',
    image: 'https://images.pexels.com/photos/38922197/pexels-photo-38922197.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Wooden bench in a quiet street setting',
  },
  {
    num: '04',
    name: 'Modular Shelf',
    material: 'Reclaimed Mahogany',
    description: 'Interlocking uprights, no visible hardware, expands in any direction.',
    price: 'From ₦210,000',
    image: 'https://images.pexels.com/photos/34117279/pexels-photo-34117279.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Stylish wooden wall shelf with decor items in a modern living room',
  },
];

export function FeaturedPieces() {
  return (
    <section id="pieces" className="bg-bone py-24 md:py-36">
      <div className="container-editorial">
        <SectionHeader num="02" label="Featured Pieces" title="A small collection, made with intent." />

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {PIECES.map((piece) => (
            <FeaturedCard key={piece.num} piece={piece} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ piece }: { piece: Piece }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} group`}>
      <div className="relative overflow-hidden bg-cream aspect-[4/5]">
        <img
          src={piece.image}
          alt={piece.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-craft group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 label-meta text-bone/80 mix-blend-difference">{piece.num}</span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="heading-editorial text-2xl md:text-[1.75rem] text-ink">{piece.name}</h3>
          <p className="label-meta mt-1.5 text-wood-500">{piece.material}</p>
        </div>
        <span className="text-sm font-medium text-ink/80 whitespace-nowrap pt-1">{piece.price}</span>
      </div>
      <p className="mt-3 text-ink/60 text-sm md:text-[0.95rem] leading-relaxed font-light max-w-[42ch]">
        {piece.description}
      </p>
    </div>
  );
}

export function SectionHeader({ num, label, title }: { num: string; label: string; title: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
      <div className="flex items-center gap-3 mb-5">
        <span className="label-meta text-wood-500">{num}</span>
        <span className="h-px w-10 bg-wood-400/50" />
        <span className="label-meta text-wood-500">{label}</span>
      </div>
      <h2 className="heading-editorial text-ink text-4xl sm:text-5xl lg:text-6xl text-balance max-w-[20ch]">
        {title}
      </h2>
    </div>
  );
}

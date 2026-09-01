import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Pieces', href: '#pieces' },
  { label: 'Material', href: '#material' },
  { label: 'Workshop', href: '#workshop' },
  { label: 'Custom', href: '#custom' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-craft ${
          scrolled ? 'bg-bone/85 backdrop-blur-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <nav className="container-editorial flex items-center justify-between">
          <a href="#top" className="group flex items-center gap-2.5" aria-label="FORM & GRAIN home">
            <span className={`font-serif text-lg sm:text-xl font-medium tracking-tight transition-colors ${scrolled ? 'text-ink' : 'text-bone'}`}>
              FORM <span className="text-wood-500">&amp;</span> GRAIN
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`link-underline text-[0.8125rem] font-medium tracking-wide-sm transition-colors ${
                  scrolled ? 'text-ink/70 hover:text-ink' : 'text-bone/70 hover:text-bone'
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className={`text-[0.8125rem] font-medium tracking-wide-sm px-5 py-2.5 border transition-all duration-500 ${
                scrolled
                  ? 'border-ink/20 text-ink hover:bg-ink hover:text-bone'
                  : 'border-bone/25 text-bone hover:bg-bone hover:text-ink'
              }`}
            >
              Commission
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 -mr-2 transition-colors ${scrolled ? 'text-ink' : 'text-bone'}`}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-ink lg:hidden transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-serif text-lg font-medium text-bone">
            FORM <span className="text-wood-400">&amp;</span> GRAIN
          </span>
          <button onClick={() => setOpen(false)} className="p-2 -mr-2 text-bone" aria-label="Close menu">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex flex-col px-6 pt-8">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-serif text-3xl font-light text-bone/90 border-b border-wood-700/30 py-5 transition-colors hover:text-wood-300"
              style={{
                transitionDelay: open ? `${i * 60}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(12px)',
                transitionProperty: 'opacity, transform, color',
                transitionDuration: '600ms',
              }}
            >
              <span className="label-meta text-wood-500 mr-3 align-middle">{String(i + 1).padStart(2, '0')}</span>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 text-center px-6 py-4 border border-wood-500/40 text-bone font-medium tracking-wide-sm text-sm"
          >
            Commission a Piece
          </a>
        </div>
      </div>
    </>
  );
}

const FOOTER_LINKS = [
  { label: 'Pieces', href: '#pieces' },
  { label: 'Material', href: '#material' },
  { label: 'Workshop', href: '#workshop' },
  { label: 'Custom', href: '#custom' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="font-serif text-2xl md:text-3xl font-medium">
              FORM <span className="text-wood-400">&amp;</span> GRAIN
            </p>
            <p className="mt-4 text-wood-200/50 text-sm font-light leading-relaxed max-w-[36ch]">
              A woodworking studio in Lagos, Nigeria. Handcrafted furniture, built
              piece by piece from solid hardwood.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="label-meta text-wood-400 mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-wood-200/70 text-sm font-light hover:text-bone transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 md:col-start-10">
            <p className="label-meta text-wood-400 mb-4">Studio</p>
            <address className="not-italic space-y-2.5 text-wood-200/70 text-sm font-light leading-relaxed">
              <p>14 Herbert Macaulay Way<br />Yaba, Lagos, Nigeria</p>
              <p>+234 803 412 8890</p>
              <p>studio@formandgrain.ng</p>
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-wood-700/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-wood-300/40 text-xs font-light tracking-wide-sm">
            © {new Date().getFullYear()} FORM &amp; GRAIN STUDIO. ALL RIGHTS RESERVED.
          </p>
          <p className="text-wood-300/40 text-xs font-light tracking-wide-sm">
            MADE BY HAND IN LAGOS
          </p>
        </div>
      </div>
    </footer>
  );
}

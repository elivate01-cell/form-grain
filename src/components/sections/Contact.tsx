import { useState } from 'react';
import { Phone, MessageCircle, Mail, Instagram, Clock, MapPin, ArrowRight } from 'lucide-react';
import { SectionHeader } from './FeaturedPieces';
import { useReveal } from '@/hooks/useReveal';

const CONTACT = [
  { icon: MapPin, label: 'Studio', value: '14 Herbert Macaulay Way\nYaba, Lagos, Nigeria' },
  { icon: Phone, label: 'Phone', value: '+234 803 412 8890' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+234 803 412 8890' },
  { icon: Mail, label: 'Email', value: 'studio@formandgrain.ng' },
  { icon: Instagram, label: 'Instagram', value: '@form.and.grain' },
  { icon: Clock, label: 'Workshop hours', value: 'Mon–Fri  8:00–17:00\nSat  9:00–13:00' },
];

export function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-bone py-24 md:py-36">
      <div className="container-editorial">
        <SectionHeader num="08" label="Contact / Commission" title="Tell us about the piece." />

        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16`}>
          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="border border-wood-300 bg-cream p-10 md:p-14">
                <h3 className="heading-editorial text-ink text-3xl md:text-4xl">Thank you.</h3>
                <p className="mt-4 text-ink/60 text-base font-light leading-relaxed max-w-[44ch]">
                  Your enquiry has been received. A member of the studio will reach
                  out within two working days to talk through your project.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', project: '', message: '' });
                  }}
                  className="mt-8 link-underline text-sm font-medium text-ink tracking-wide-sm"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <Field
                    label="Name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                    type="text"
                  />
                  <Field
                    label="Email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    required
                    type="email"
                  />
                </div>
                <Field
                  label="Project type"
                  value={form.project}
                  onChange={(v) => setForm({ ...form, project: v })}
                  required
                  type="text"
                  placeholder="e.g. Dining table, lounge chair, restaurant fit-out"
                />
                <div>
                  <label className="label-meta block mb-3 text-wood-500" htmlFor="message">
                    Tell us about it
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-wood-300 py-3 text-ink text-base font-light resize-none focus:border-wood-600 focus:outline-none transition-colors"
                    placeholder="Dimensions, wood preference, timeline, anything that helps."
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 px-7 py-4 bg-ink text-bone font-medium tracking-wide-sm text-sm transition-all duration-500 hover:bg-wood-700"
                >
                  Send Enquiry
                  <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
                </button>
                <p className="text-ink/40 text-xs font-light">
                  This form is for demonstration only. No message is sent or stored.
                </p>
              </form>
            )}
          </div>

          {/* Contact details */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-1">
              {CONTACT.map((c) => (
                <div key={c.label}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <c.icon size={15} strokeWidth={1.5} className="text-wood-500" />
                    <span className="label-meta text-wood-500">{c.label}</span>
                  </div>
                  <p className="text-ink/80 text-sm md:text-[0.95rem] font-light leading-relaxed whitespace-pre-line">
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="label-meta block mb-3 text-wood-500">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-wood-300 py-3 text-ink text-base font-light focus:border-wood-600 focus:outline-none transition-colors placeholder:text-ink/30"
      />
    </div>
  );
}

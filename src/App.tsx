import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/hero/Hero';
import { FeaturedPieces } from '@/components/sections/FeaturedPieces';
import { MaterialCraft } from '@/components/sections/MaterialCraft';
import { Workshop } from '@/components/sections/Workshop';
import { CustomFurniture } from '@/components/sections/CustomFurniture';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

function App() {
  return (
    <div id="top" className="min-h-screen bg-bone text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <FeaturedPieces />
        <MaterialCraft />
        <Workshop />
        <CustomFurniture />
        <SelectedWork />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { 
  Coffee, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Calendar, 
  Heart, 
  ArrowUpRight, 
  Send, 
  Wifi, 
  Check, 
  Copy, 
  ExternalLink,
  Flame,
  Droplets,
  Award,
  Sparkles
} from 'lucide-react';

// --- MENU DATA ---
interface MenuItem {
  id: number;
  name: string;
  category: 'Manual Brews & Espresso' | 'Signature Creations' | 'Bakes & Viennoiserie' | 'Artisanal Savouries';
  description: string;
  price: string;
  estate: string;
  notes: string;
  dietary: 'Pure Veg' | 'Vegan' | 'Contains Farm Eggs';
  badge?: string;
}

const MENU_CATEGORIES = [
  'All',
  'Manual Brews & Espresso',
  'Signature Creations',
  'Bakes & Viennoiserie',
  'Artisanal Savouries'
] as const;

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Ratnagiri Estate V60 Pour-Over",
    category: "Manual Brews & Espresso",
    description: "Anaerobic fermented microlot cultivated at 1,450m elevation in Bababudangiri. Silky body with aromatic floral notes of wild honey, purple plum, and raw cacao nibs.",
    price: "₹290",
    estate: "Bababudangiri, Karnataka",
    notes: "Honey · Purple Plum · Cacao",
    dietary: "Vegan",
    badge: "Microlot Lot #14"
  },
  {
    id: 2,
    name: "Cardamom Blossom Cortado",
    category: "Signature Creations",
    description: "Double ristretto poured over steamed organic A2 milk from local dairy cooperatives, delicately scented with freshly ground Idukki green cardamom and orange blossom mist.",
    price: "₹260",
    estate: "Attikan Estate Blend",
    notes: "Cardamom · Sweet Orange · Toffee",
    dietary: "Pure Veg",
    badge: "House Signature"
  },
  {
    id: 3,
    name: "Monsoon Cascara Tonic",
    category: "Signature Creations",
    description: "16-hour steeped sun-dried coffee cherry cascara, blended with artisanal Indian botanical tonic water, fresh bruised rosemary sprig, and dehydrated Coorg sweet lime.",
    price: "₹280",
    estate: "Kerehaklu Estate",
    notes: "Dried Cherry · Rosemary · Citrus",
    dietary: "Vegan",
    badge: "Seasonal Cold Drink"
  },
  {
    id: 4,
    name: "Mysore Pecan & Jaggery Cruffin",
    category: "Bakes & Viennoiserie",
    description: "72-hour cultured French butter lamination with organic Marayoor palm jaggery ganache, dusted with toasted southern Indian pecans and Saigon cinnamon.",
    price: "₹285",
    estate: "Hearth Bakehouse Daily",
    notes: "Palm Jaggery · Pecan · Butter Flake",
    dietary: "Contains Farm Eggs",
    badge: "Baked Fresh at 07:30"
  },
  {
    id: 5,
    name: "Wild Ferment Sourdough Tartine",
    category: "Artisanal Savouries",
    description: "Thick slice of 36-hour fermented country sourdough, whipped goat curd, blistered heirloom cherry tomatoes, roasted pistachio dukkah, and Coorg stingless bee honey.",
    price: "₹370",
    estate: "Artisanal Bakehouse",
    notes: "Whipped Curd · Dukkah · Honey",
    dietary: "Pure Veg",
    badge: "Kitchen Favorite"
  },
  {
    id: 6,
    name: "Classic Flat White (Attikan Washed)",
    category: "Manual Brews & Espresso",
    description: "High-grown washed Arabica from Biligirirangana Hills. Velvety, glossy microfoam balanced with deep roasted hazelnut, rich dark caramel, and lingering chocolate finish.",
    price: "₹240",
    estate: "BR Hills, Karnataka",
    notes: "Roasted Hazelnut · Dark Caramel",
    dietary: "Pure Veg"
  },
  {
    id: 7,
    name: "Toasted Almond Brioche Feuilletée",
    category: "Bakes & Viennoiserie",
    description: "Golden brioche loaf layered with roasted Sicilian almond frangipane cream, sprinkled with toasted almond flakes and dusted with organic raw demerara sugar.",
    price: "₹310",
    estate: "Hearth Bakehouse Daily",
    notes: "Almond Frangipane · Demerara",
    dietary: "Contains Farm Eggs"
  },
  {
    id: 8,
    name: "Truffled Forest Mushroom Melt",
    category: "Artisanal Savouries",
    description: "Pan-roasted Kodaikanal button and oyster mushrooms, smoked scamorza cheese, garlic confit, and garden thyme emulsion on grilled seeded whole-wheat sourdough.",
    price: "₹390",
    estate: "Artisanal Bakehouse",
    notes: "Wild Mushroom · Smoked Scamorza",
    dietary: "Pure Veg",
    badge: "Chef's Cut"
  }
];

// --- GALLERY DATA ---
interface GalleryItem {
  id: number;
  title: string;
  category: string;
  url: string;
  fallbackIcon: 'coffee' | 'bakery' | 'interior' | 'beans';
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Manual Slow Brew Pour-Over Bar",
    category: "Craft",
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
    fallbackIcon: "coffee",
    description: "Baristas weighing single origin coffee to 0.1g accuracy under soft morning illumination."
  },
  {
    id: 2,
    title: "Sunlit Courtyard & Communal Teak Table",
    category: "Atmosphere",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
    fallbackIcon: "interior",
    description: "A peaceful sanctuary of natural light, lush green monstera plants, and quiet reading spaces."
  },
  {
    id: 3,
    title: "Morning Hearth Sourdough & Laminated Viennoiserie",
    category: "Bakehouse",
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    fallbackIcon: "bakery",
    description: "Crusty slow-fermented country sourdough loaves fresh from the stone hearth oven at 07:30 AM."
  },
  {
    id: 4,
    title: "Cortado Poured in Handmade Stoneware",
    category: "Espresso",
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    fallbackIcon: "coffee",
    description: "Equal parts single-origin ristretto and silky steamed milk in custom local ceramic cups."
  },
  {
    id: 5,
    title: "Quiet Afternoon Verandah Nook",
    category: "Atmosphere",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    fallbackIcon: "interior",
    description: "Sheltered garden verandah where guests reflect, write notes, and savor unhurried sips."
  },
  {
    id: 6,
    title: "Green Coffee Evaluation & Drum Roasting",
    category: "Roastery",
    url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80",
    fallbackIcon: "beans",
    description: "Direct-trade parchment Arabicas cupped weekly to dial in ideal extraction curves."
  }
];

// Resilient Image with graceful styled SVG fallback
function ImageWithFallback({ 
  src, 
  alt, 
  className,
  fallbackType = 'coffee' 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  fallbackType?: 'coffee' | 'bakery' | 'interior' | 'beans';
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#EDE4D5] via-[#E4D7C3] to-[#D9C7B0] text-[#4F3F36] overflow-hidden ${className}`}>
        {/* Subtle decorative coffee rings */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-[#D0BFAB]/60 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full border border-[#D0BFAB]/40 pointer-events-none" />
        
        {fallbackType === 'coffee' && <Coffee className="w-12 h-12 text-[#BC5A36] mb-2 opacity-80" />}
        {fallbackType === 'bakery' && <Flame className="w-12 h-12 text-[#BC5A36] mb-2 opacity-80" />}
        {fallbackType === 'interior' && <MapPin className="w-12 h-12 text-[#BC5A36] mb-2 opacity-80" />}
        {fallbackType === 'beans' && <Droplets className="w-12 h-12 text-[#BC5A36] mb-2 opacity-80" />}
        
        <p className="font-serif text-sm font-semibold text-[#231815] text-center">{alt}</p>
        <span className="text-[11px] uppercase tracking-wider text-[#8C776C] mt-1">EMBER Roastery & Hearth</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<typeof MENU_CATEGORIES[number]>('All');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<GalleryItem | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    partySize: '2 Guests',
    interest: 'Table Reservation',
    notes: ''
  });

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard escape handler for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedGalleryImg(null);
        setEnquiryModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredMenuItems = selectedCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("EMBER Café, 482, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038");
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2400);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquirySuccess(false);
      setEnquiryModalOpen(false);
      setFormData({
        name: '',
        contact: '',
        partySize: '2 Guests',
        interest: 'Table Reservation',
        notes: ''
      });
    }, 2400);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 3500);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#231815] font-sans antialiased selection:bg-[#BC5A36]/20 selection:text-[#8B3B1E]">
      
      {/* --- PORTFOLIO DEMO BANNER --- */}
      <aside 
        aria-label="Portfolio notice" 
        className="bg-[#231815] text-[#D8CCC0] text-xs py-2 px-4 text-center border-b border-[#3A2A22] flex items-center justify-center gap-2"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#BC5A36] shrink-0" />
        <span>
          <strong>Portfolio Demo:</strong> EMBER Café is a fictional specialty coffee brand concept created for website design presentation. All details, menu prices, and contacts are simulated.
        </span>
      </aside>

      {/* --- STICKY NAVIGATION (One-row, 3-zone contract) --- */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFC8]' 
          : 'bg-[#FAF7F2] border-b border-[#EFE7D8]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            
            {/* Zone 1: Single text element wordmark */}
            <a 
              href="#top" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BC5A36] rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-[#231815] text-[#FAF7F2] flex items-center justify-center font-serif text-lg font-medium tracking-wider group-hover:scale-105 transition-transform duration-200 shadow-xs">
                E
              </div>
              <div className="whitespace-nowrap shrink-0">
                <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#231815] uppercase block leading-none">
                  EMBER
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C776C] font-medium block mt-1">
                  Specialty Café & Roasters
                </span>
              </div>
            </a>

            {/* Zone 2: 4–5 single-line clean text navigation links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4F3F36]">
              <button 
                onClick={() => scrollToSection('menu')} 
                className="hover:text-[#BC5A36] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('story')} 
                className="hover:text-[#BC5A36] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                Our Story
              </button>
              <button 
                onClick={() => scrollToSection('gallery')} 
                className="hover:text-[#BC5A36] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('hours-location')} 
                className="hover:text-[#BC5A36] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                Hours & Location
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="hover:text-[#BC5A36] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                Contact
              </button>
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <button 
                onClick={() => scrollToSection('hours-location')}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#BC5A36] text-white hover:bg-[#A34B2A] transition-all duration-200 shadow-xs hover:shadow active:scale-95"
              >
                Visit Us
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#231815] hover:bg-[#EFE7D8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BC5A36]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F5EFE6] border-b border-[#E3D7C5] px-6 pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-3 pt-2">
              <button 
                onClick={() => scrollToSection('menu')}
                className="text-left font-serif text-lg text-[#231815] hover:text-[#BC5A36] py-1 border-b border-[#E8DEC9]"
              >
                Explore Menu
              </button>
              <button 
                onClick={() => scrollToSection('story')}
                className="text-left font-serif text-lg text-[#231815] hover:text-[#BC5A36] py-1 border-b border-[#E8DEC9]"
              >
                Our Story & Terroir
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-left font-serif text-lg text-[#231815] hover:text-[#BC5A36] py-1 border-b border-[#E8DEC9]"
              >
                Café Atmosphere
              </button>
              <button 
                onClick={() => scrollToSection('hours-location')}
                className="text-left font-serif text-lg text-[#231815] hover:text-[#BC5A36] py-1 border-b border-[#E8DEC9]"
              >
                Hours & Location
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left font-serif text-lg text-[#231815] hover:text-[#BC5A36] py-1"
              >
                Get in Touch
              </button>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => scrollToSection('hours-location')}
                className="w-full text-center py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#231815] text-[#FAF7F2] hover:bg-[#3D2C24]"
              >
                Visit Us in Indiranagar
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 border-b border-[#EFE7D8]">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EFE4D3]/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-[#E8DCBA]/40 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline and Story */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B3B1E]">
                Western Ghats Shade-Grown Arabicas
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#231815] leading-[1.12] text-balance">
                Slow roasted. <br />
                <span className="italic font-normal text-[#BC5A36]">Mindfully</span> brewed in Bengaluru.
              </h1>

              <p className="text-base sm:text-lg text-[#554238] max-w-xl leading-relaxed">
                Step away from the city's hurry into a serene sanctuary of estate microlots, wild-fermentation sourdough bakes, and unhurried quietude. Roasted twice weekly in small batches.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => scrollToSection('menu')}
                  className="px-8 py-3.5 rounded-full bg-[#231815] text-[#FAF7F2] hover:bg-[#3D2C24] transition-all text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 group shadow-sm active:scale-95"
                >
                  <span>Explore Our Menu</span>
                  <ChevronRight className="w-4 h-4 text-[#BC5A36] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('hours-location')}
                  className="px-7 py-3.5 rounded-full border border-[#D5C7B3] hover:border-[#231815] text-[#231815] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition-colors text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#BC5A36]" />
                  <span>Find Our Roastery</span>
                </button>
              </div>

              {/* Key Quantitative Proof Strip */}
              <div className="pt-8 border-t border-[#E8DEC9] grid grid-cols-3 gap-4">
                <div>
                  <div className="font-serif text-2xl font-semibold text-[#231815] tabular-nums">100%</div>
                  <div className="text-xs text-[#6F5B50] mt-0.5">Indian Direct-Trade Single Estates</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-semibold text-[#231815] tabular-nums">72 Hrs</div>
                  <div className="text-xs text-[#6F5B50] mt-0.5">Slow Ferment Hearth Sourdough</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-semibold text-[#231815] tabular-nums">88.5+</div>
                  <div className="text-xs text-[#6F5B50] mt-0.5">SCA Cupping Score Benchmark</div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Composition with Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Hero Showcase Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E3D6C4] aspect-[4/5] bg-[#EAE0D2]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80" 
                    alt="Artisanal pour over coffee brewing with aromatic steam rising"
                    className="w-full h-full object-cover"
                    fallbackType="coffee"
                  />
                  {/* Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Card Overlay Content */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#E8BFB0]">
                      Current Roast On Tap
                    </p>
                    <p className="font-serif text-xl font-medium">
                      Ratnagiri Estate • Anaerobic Lot #14
                    </p>
                    <p className="text-xs text-[#D8CCC0] leading-snug">
                      Wild honey yeast fermentation · Roasted Wednesday in Indiranagar
                    </p>
                  </div>
                </div>

                {/* Micro Floater Card */}
                <div className="absolute -bottom-6 -left-6 bg-[#FAF7F2] p-4 rounded-xl shadow-lg border border-[#E3D6C4] flex items-center gap-3.5 max-w-xs">
                  <div className="w-10 h-10 rounded-full bg-[#EFE4D3] text-[#BC5A36] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#231815]">Open Every Morning</p>
                    <p className="text-[11px] text-[#6F5B50] tabular-nums">Tue – Sun : 07:30 AM to 09:30 PM</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      <section id="story" className="py-20 md:py-28 bg-[#F4EDE2] border-b border-[#E8DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B3B1E]">
              Craft, Terroir & Patience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#231815] text-balance">
              Honouring the shade-grown forests of Chikmagalur & Coorg.
            </h2>
            <div className="w-16 h-0.5 bg-[#BC5A36] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Visual Duo */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 rounded-xl overflow-hidden shadow-sm bg-[#EAE0D2]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=700&q=80"
                    alt="Freshly extracted espresso cup and roasted coffee beans"
                    className="object-cover h-full w-full"
                    fallbackType="beans"
                  />
                </div>
                <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E2D5C3]">
                  <p className="font-serif text-lg text-[#231815] font-semibold">Small-Batch Roast</p>
                  <p className="text-xs text-[#6F5B50] mt-1 leading-relaxed">
                    Roasted twice weekly on a cast-iron drum roaster to preserve the terroir’s floral sweetness.
                  </p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-[#231815] text-[#FAF7F2] p-5 rounded-xl shadow-xs">
                  <p className="font-serif text-lg font-semibold text-[#FAF7F2]">Direct Farm Relations</p>
                  <p className="text-xs text-[#CFC1B5] mt-1 leading-relaxed">
                    Zero middlemen. Fair farm-gate prices paid directly to 3rd-generation family planters.
                  </p>
                </div>
                <div className="h-64 rounded-xl overflow-hidden shadow-sm bg-[#EAE0D2]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=700&q=80"
                    alt="Baker shaping artisanal sourdough bread"
                    className="object-cover h-full w-full"
                    fallbackType="bakery"
                  />
                </div>
              </div>
            </div>

            {/* Narrative text */}
            <div className="space-y-6 text-[#4F3F36] leading-relaxed">
              <blockquote className="text-lg font-serif italic text-[#231815] border-l-0 pl-0">
                "We founded EMBER in 2022 around a simple conviction: coffee in India should not merely be fuel, but a slow ritual of terroir, craft, and connection."
              </blockquote>
              
              <p className="text-sm sm:text-base">
                Named after the gentle, enduring heat of roasted coffee coals and our brick hearth oven, EMBER celebrates the high-elevation biodiversity of the Western Ghats. In these rainforest estates, Arabica cherries ripen naturally under dense canopies of silver oak, wild fig, and cardamom bushes.
              </p>

              <p className="text-sm sm:text-base">
                Every morning at dawn, our bakehouse fires its stone oven to churn out crusty wild-fermentation sourdough loaves, flaky laminated cruffins, and seasonal fruit tarts. Whether you arrive with a notebook for a silent morning flat white or gather with friends around a shared tasting flight, our space is built for unhurried presence.
              </p>

              {/* Quiet Value Bullet Points (Clean unboxed text, no pills) */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-y-3 gap-x-6 text-xs text-[#231815] font-semibold">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#BC5A36]" />
                  <span>No Artificial Flavors or Syrups</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#BC5A36]" />
                  <span>Organic Desi Cow Milk & Oat Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#BC5A36]" />
                  <span>Compostable Takeaway Packaging</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- FEATURED MENU SECTION --- */}
      <section id="menu" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B3B1E]">
            Handcrafted Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#231815] mt-2 text-balance">
            The EMBER Menu
          </h2>
          <p className="text-sm sm:text-base text-[#6F5B50] mt-3">
            Single origin manual pour-overs, balanced espresso creations, and fresh daily hearth bakes.
          </p>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BC5A36] ${
                selectedCategory === cat
                  ? 'bg-[#231815] text-[#FAF7F2] shadow-sm'
                  : 'bg-[#EFE5D5] text-[#55433A] hover:bg-[#E5D8C4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredMenuItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC9] hover:border-[#BC5A36]/60 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Title & Price Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-semibold text-[#231815] group-hover:text-[#BC5A36] transition-colors">
                      {item.name}
                    </h3>
                    
                    {/* Unboxed Metadata (Zero-Pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-[#8C776C]">
                      <span>{item.estate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-[#5C4A40]">{item.dietary}</span>
                      {item.badge && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#BC5A36] font-semibold">{item.badge}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Price in Tabular Numerals */}
                  <span className="font-serif text-xl font-bold text-[#231815] shrink-0 tabular-nums">
                    {item.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#5C4A40] mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Footer with Flavor Notes */}
              <div className="pt-4 mt-5 border-t border-[#F0E6D8] flex items-center justify-between text-xs text-[#8A7568]">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#4F3F36]">Notes:</span>
                  <span className="text-[#6F5B50] italic">{item.notes}</span>
                </div>
                
                <button
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      interest: `Item Inquiry: ${item.name}`,
                      notes: `I would like to order or enquire about ${item.name} (${item.price}).`
                    }));
                    setEnquiryModalOpen(true);
                  }}
                  className="text-[#BC5A36] hover:underline font-semibold text-xs flex items-center gap-1"
                >
                  <span>Inquire Item</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dietary Legend & Quality Assurance Box */}
        <div className="mt-10 p-5 rounded-xl bg-[#F4EDE2] border border-[#E3D6C4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F5B50]">
          <div className="flex flex-wrap items-center gap-6">
            <span className="font-semibold text-[#231815]">Dietary Notes:</span>
            <span>Pure Veg: 100% Vegetarian</span>
            <span>·</span>
            <span>Vegan: Plant-Based / Oat milk</span>
            <span>·</span>
            <span>Contains Farm Eggs: Pastured farm eggs in baked goods</span>
          </div>
          <div className="italic">
            Please inform our baristas of any nut, gluten, or dairy allergies.
          </div>
        </div>

      </section>

      {/* --- PHOTO GALLERY SECTION --- */}
      <section id="gallery" className="py-20 bg-[#F4EDE2] border-t border-b border-[#E8DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B3B1E]">
                Visual Journal
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#231815] mt-1">
                Life Inside EMBER
              </h2>
            </div>
            <p className="text-sm text-[#6F5B50] max-w-md mt-3 md:mt-0">
              Sunlight through rain trees, the rhythm of espresso tampers, and warm sourdough pulled from the stone hearth.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <button 
                key={item.id}
                onClick={() => setSelectedGalleryImg(item)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-200 cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 text-left border border-[#E0D2BE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BC5A36]"
              >
                <ImageWithFallback
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fallbackType={item.fallbackIcon}
                />
                
                {/* Hover overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8BFB0] mb-1">
                    {item.category}
                  </span>
                  <p className="text-sm font-medium leading-snug">
                    {item.title}
                  </p>
                  <span className="text-xs text-white/80 mt-1 flex items-center gap-1">
                    <span>Click to expand</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* GALLERY LIGHTBOX MODAL */}
      {selectedGalleryImg && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-[#E3D6C4]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="max-h-[70vh] bg-stone-900 flex items-center justify-center">
              <ImageWithFallback
                src={selectedGalleryImg.url}
                alt={selectedGalleryImg.title}
                className="max-h-[70vh] w-auto object-contain"
                fallbackType={selectedGalleryImg.fallbackIcon}
              />
            </div>
            
            <div className="p-6 bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#8B3B1E]">
                  EMBER Journal · {selectedGalleryImg.category}
                </span>
                <p className="text-base font-serif text-[#231815] font-semibold mt-0.5">
                  {selectedGalleryImg.title}
                </p>
                <p className="text-xs text-[#6F5B50] mt-1">
                  {selectedGalleryImg.description}
                </p>
              </div>
              <button 
                onClick={() => setSelectedGalleryImg(null)}
                className="px-4 py-2 rounded-full border border-[#D5C7B3] hover:border-[#231815] text-xs uppercase tracking-wider font-semibold text-[#55433A] hover:text-[#231815] self-start sm:self-auto shrink-0"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- OPENING HOURS & LOCATION SECTION --- */}
      <section id="hours-location" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left: Location & Hours details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B3B1E]">
                Find Your Haven
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#231815] mt-2">
                Hours & Sanctuary Space
              </h2>
              <p className="text-sm sm:text-base text-[#6F5B50] mt-3">
                Located under the shade of 12th Main Indiranagar. Wheelchair accessible, pet friendly on our garden verandah, with quiet corners designed for mindful pauses.
              </p>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-[#F5EFE6] rounded-2xl p-6 border border-[#E3D7C5] space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E0D2BE] text-[#231815] font-serif text-lg font-semibold">
                <Clock className="w-5 h-5 text-[#BC5A36]" />
                <span>Brew Bar & Hearth Timings</span>
              </div>
              
              <div className="flex justify-between items-center text-sm py-2 border-b border-[#ECE2D2]">
                <span className="font-medium text-[#231815]">Tuesday – Friday</span>
                <span className="text-[#554238] tabular-nums font-medium">07:30 AM – 09:30 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2 border-b border-[#ECE2D2]">
                <span className="font-medium text-[#231815]">Saturday & Sunday</span>
                <span className="text-[#554238] tabular-nums font-medium">07:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2 text-[#887469]">
                <span className="font-medium">Monday</span>
                <span className="italic">Closed for Roastery Maintenance</span>
              </div>
              <div className="pt-2 text-[11px] text-[#7A675C]">
                * Hot hearth kitchen closes at 08:45 PM; manual pour-overs and cold bakes served until closing.
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC9] space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EFE4D3] text-[#BC5A36] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-semibold text-[#231815]">
                      Fictional Indiranagar Roastery
                    </h3>
                    <button
                      onClick={handleCopyAddress}
                      className="text-xs text-[#BC5A36] hover:underline flex items-center gap-1 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BC5A36] rounded"
                      aria-live="polite"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAddress ? "Copied to clipboard" : "Copy Address"}</span>
                    </button>
                  </div>
                  <p className="text-sm text-[#5C4A40] mt-1 leading-relaxed">
                    EMBER Café, 482, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038
                  </p>
                  <p className="text-xs text-[#8A7568] mt-2">
                    Landmark: 300m past the 12th Main roundabout, opposite the Gulmohar parkway.
                  </p>
                </div>
              </div>

              {/* Space Amenities */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#F0E6D8] text-xs text-[#6F5B50]">
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-[#BC5A36]" />
                  <span>Fiber Wi-Fi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#BC5A36]" />
                  <span>Pet-Friendly Verandah</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#BC5A36]" />
                  <span>Wheelchair Accessible</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Simulated Map Graphic & Tasting Inquiry Box */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Styled Architectural Map Illustration */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E0D2BE] shadow-xs bg-[#EAE2D5] h-80 flex flex-col items-center justify-center p-6 text-center group">
              {/* Map grid aesthetic SVG pattern */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#231815" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Central Map Pin */}
              <div className="relative z-10 space-y-3 max-w-sm">
                <div className="w-14 h-14 rounded-full bg-[#231815] text-[#FAF7F2] mx-auto flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-[#BC5A36]" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-[#231815]">
                  Indiranagar, Bengaluru
                </h4>
                <p className="text-xs text-[#6F5B50] leading-relaxed">
                  Situated in East Bengaluru's calm café precinct. Shaded verandah seating, bicycle parking stands, and valet service on weekends.
                </p>
                
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Indiranagar+Bengaluru" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7F2] border border-[#D5C7B3] text-xs font-semibold text-[#231815] hover:border-[#231815] transition-colors"
                  >
                    <span>Open Demo Pin on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#BC5A36]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Reservation & Tasting Card */}
            <div className="bg-[#231815] text-[#FAF7F2] p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium">Coffee Tastings & Group Bookings</h3>
                  <p className="text-xs text-[#BFAF9F] mt-0.5">
                    Weekend origin cupping sessions and dedicated work tables for 4+ guests.
                  </p>
                </div>
                <Calendar className="w-6 h-6 text-[#BC5A36] shrink-0" />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, interest: 'Table Reservation' }));
                    setEnquiryModalOpen(true);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#BC5A36] hover:bg-[#A34B2A] text-xs uppercase tracking-wider font-semibold text-white transition-colors text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Book Table / Cupping
                </button>
                <a
                  href="https://wa.me/910000000000?text=Hi%20EMBER%20Café%2C%20I%20would%20like%20to%20enquire%20about%20a%20table%20reservation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#372A22] hover:bg-[#4A392F] text-xs uppercase tracking-wider font-semibold text-[#FAF7F2] transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#BC5A36]" />
                  <span>WhatsApp Barista</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- CONTACT & WHATSAPP CALL-TO-ACTION SECTION --- */}
      <section id="contact" className="py-20 bg-[#F4EDE2] border-t border-[#E8DEC9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#E8DCBA] text-[#231815] mx-auto flex items-center justify-center">
            <Coffee className="w-6 h-6 text-[#BC5A36]" />
          </div>

          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B3B1E] block">
            Direct Connection
          </span>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#231815] max-w-2xl mx-auto text-balance">
            Freshly Roasted Beans Delivered to Your Door.
          </h2>

          <p className="text-sm sm:text-base text-[#6F5B50] max-w-xl mx-auto">
            Need whole-bean roast subscriptions, home brew grind advice for your AeroPress or V60, or want to reserve a fresh sourdough loaf for Sunday morning? We're a message away.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/910000000000?text=Hello%20EMBER%20Café%20Team%2C%20I%20have%20an%20inquiry%20regarding%20specialty%20coffee%20beans%20and%20reservations."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-sm hover:shadow transition-all"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Message on WhatsApp (+91 00000 00000)</span>
            </a>

            <button
              onClick={() => {
                setFormData(prev => ({ ...prev, interest: 'General Message' }));
                setEnquiryModalOpen(true);
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#231815] hover:bg-[#3D2C24] text-[#FAF7F2] font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4 text-[#BC5A36]" />
              <span>Leave a Message</span>
            </button>
          </div>

          <p className="text-xs text-[#8A7568] pt-2">
            * Phone number is for demonstration purposes. Clicking opens a simulated WhatsApp link.
          </p>
        </div>
      </section>

      {/* --- TABLE & TASTING ENQUIRY MODAL --- */}
      {enquiryModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setEnquiryModalOpen(false)}
        >
          <div 
            className="bg-[#FAF7F2] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E3D6C4] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEnquiryModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#EFE5D5] text-[#231815] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BC5A36]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {enquirySuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#231815]">Enquiry Received</h3>
                <p className="text-sm text-[#6F5B50] leading-relaxed">
                  Thank you! In a live production environment, this immediately notifies our barista desk and confirms your reservation via WhatsApp or email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#8B3B1E]">
                    Table & Roastery Inquiries
                  </span>
                  <h3 className="font-serif text-2xl text-[#231815]">Connect with EMBER</h3>
                  <p className="text-xs text-[#6F5B50] mt-1">
                    Fill out this simulated form for cupping workshops, group table reservations, or freshly roasted bean pre-orders.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#231815] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Rao"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CCBA] bg-white text-sm text-[#231815] focus:outline-none focus:ring-2 focus:ring-[#BC5A36]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#231815] mb-1">Contact Email or Phone</label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="ananya@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CCBA] bg-white text-sm text-[#231815] focus:outline-none focus:ring-2 focus:ring-[#BC5A36]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#231815] mb-1">Guests / Size</label>
                      <select 
                        value={formData.partySize}
                        onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CCBA] bg-white text-sm text-[#231815] focus:outline-none focus:ring-2 focus:ring-[#BC5A36]"
                      >
                        <option>1–2 Guests</option>
                        <option>3–4 Guests</option>
                        <option>5–8 Guests (Large Table)</option>
                        <option>Coffee Cupping Workshop (1-2 persons)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#231815] mb-1">Inquiry Topic</label>
                    <input
                      type="text"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CCBA] bg-white text-sm text-[#231815] focus:outline-none focus:ring-2 focus:ring-[#BC5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#231815] mb-1">Dietary Notes or Special Requests</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Quiet work corner, oat milk preferences, or anniversary celebration..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CCBA] bg-white text-sm text-[#231815] focus:outline-none focus:ring-2 focus:ring-[#BC5A36]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#231815] hover:bg-[#3D2C24] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Submit Demo Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-[#1C1410] text-[#EADDCF] pt-16 pb-12 border-t border-[#2F211A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C1F18]">
            
            {/* Col 1 & 2: Brand story */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] text-[#231815] flex items-center justify-center font-serif text-lg font-bold">
                  E
                </div>
                <span className="font-serif text-2xl tracking-[0.2em] uppercase font-medium text-white">
                  EMBER
                </span>
              </div>
              <p className="text-xs text-[#A8988C] leading-relaxed max-w-sm">
                A specialty roastery and hearth bakehouse celebrating Indian terroir. Sourced from Bababudangiri, Biligirirangana Hills, and Coorg. Roasted with reverence in Indiranagar, Bengaluru.
              </p>
              
              {/* Social Channels with accessible demo popups */}
              <div className="flex items-center space-x-3 pt-2">
                <a 
                  href="#instagram" 
                  onClick={(e) => { e.preventDefault(); alert("Fictional demo: Instagram handle is @embercafe.blr (simulated)."); }}
                  className="w-8 h-8 rounded-full bg-[#2C1F18] text-[#D8CCC0] hover:text-white hover:bg-[#BC5A36] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#facebook" 
                  onClick={(e) => { e.preventDefault(); alert("Fictional demo: Facebook page is simulated."); }}
                  className="w-8 h-8 rounded-full bg-[#2C1F18] text-[#D8CCC0] hover:text-white hover:bg-[#BC5A36] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 3: Navigation */}
            <div>
              <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Explore
              </h3>
              <ul className="space-y-2.5 text-xs text-[#A8988C]">
                <li>
                  <button onClick={() => scrollToSection('menu')} className="hover:text-[#E8BFB0] transition-colors">
                    Specialty Coffee Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('story')} className="hover:text-[#E8BFB0] transition-colors">
                    Our Origins & Philosophy
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('gallery')} className="hover:text-[#E8BFB0] transition-colors">
                    Roastery Atmosphere
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('hours-location')} className="hover:text-[#E8BFB0] transition-colors">
                    Operating Hours
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('hours-location')} className="hover:text-[#E8BFB0] transition-colors">
                    Location & Parking
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Roastery Location Details */}
            <div>
              <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Location
              </h3>
              <p className="text-xs text-[#A8988C] leading-relaxed">
                482, 12th Main Road<br />
                HAL 2nd Stage, Indiranagar<br />
                Bengaluru, Karnataka 560038<br />
                India
              </p>
              <div className="pt-3">
                <span className="text-[11px] text-[#BC5A36] font-semibold block">Simulated Barista Desk:</span>
                <span className="text-xs text-[#D8CCC0] tabular-nums">+91 00000 00000</span>
              </div>
            </div>

            {/* Col 5: Coffee Journal Newsletter */}
            <div>
              <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
                The Coffee Gazette
              </h3>
              <p className="text-xs text-[#A8988C] leading-relaxed mb-3">
                Receive cupping notes, origin updates, and notices when new seasonal microlots drop.
              </p>
              
              {newsletterSuccess ? (
                <div className="p-3 rounded-lg bg-[#271C15] border border-[#3D2C22] text-xs text-[#BC5A36]">
                  ✓ Thank you! You are subscribed to our fictional coffee gazette.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input 
                    type="email" 
                    required 
                    placeholder="name@email.com" 
                    className="w-full px-3 py-2 rounded-lg bg-[#271C15] border border-[#3D2C22] text-xs text-white placeholder-[#78665B] focus:outline-none focus:border-[#BC5A36]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#BC5A36] hover:bg-[#A34B2A] text-xs uppercase tracking-wider font-semibold text-white transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Bottom Copyright & Disclosure */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7A6A5F] gap-3">
            <div>
              © {new Date().getFullYear()} EMBER Café & Roasters. Fictional portfolio demonstration designed for specialty coffee establishments.
            </div>
            <div className="flex items-center space-x-6">
              <span>Crafted for Web Portfolio Presentation</span>
              <span>Accessibility Compliant</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Wrench, BookOpen, HelpCircle, ShoppingBag, User, Calendar, Cpu, Disc3, ClipboardList, ChevronDown, Gauge, CircleDot, Cable, Battery, Bike, Shield, Menu, House } from 'lucide-react';
import jbmsLogo from './jbms.png';
import carGif from './car1.gif';
import carTwoGif from './car2.gif';
import gal1 from './gal1.jpg';
import gal2 from './gal2.jpg';
import gal3 from './gal3.jpg';
import gal4 from './gal4.jpg';
import gal5 from './gal5.png';
import gal6 from './gal6.png';
import gal7 from './gal7.png';
import motGif from './mot.gif';
import motTwoGif from './mot2.gif';

/**
 * --- MOTOSHOP AI MECHANIC CONFIGURATION ---
 * The environment provides the API key at runtime.
 */
const apiKey = "";

const SYSTEM_PROMPT = `You are the MOTOSHOP AI Mechanic, a specialist in motorcycles and cars in the Philippines. 
Your tone is helpful, expert, and friendly (using common Pinoy rider terms like "Paps" or "Ride Safe").

Your duties:
1. DIAGNOSE: Ask follow-up questions about sounds, smells, or vibrations to help identify issues.
2. RECOMMEND PARTS: Suggest specific high-quality parts available at MOTOSHOP (e.g., Akrapovic, Brembo, Michelin, specialized oils).
3. SAFETY FIRST: If an issue sounds dangerous (like brake failure), tell them to stop riding immediately.
4. LOCAL CONTEXT: Mention local brands or maintenance tips suitable for Philippine weather (heavy rain, extreme heat).

Keep responses concise and use bullet points for readability.`;

const gradientSurfaceClass = "overflow-hidden border border-white/10 bg-gradient-to-r from-[#ff3636] to-[#f97215] bg-clip-padding";
const gradientTextClass = "bg-gradient-to-r from-[#ff3636] to-[#f97215] bg-clip-text text-transparent";

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showHomeBubble, setShowHomeBubble] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHomeBubble(window.scrollY > 220);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black pb-24 font-sans text-white selection:bg-orange-500">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-orange {
          0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(249, 115, 22, 0); }
          100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
        .animate-pulse-orange {
          animation: pulse-orange 2s infinite;
        }
        .chat-slide-up {
          animation: chatPop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes chatPop {
          from { transform: translateY(50px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 10px; }
      `}} />

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="w-full px-3 pt-6 sm:px-4 lg:px-6 xl:px-8 2xl:px-10">
        {activeTab === 'dashboard' && <PlaceholderView title="Dashboard" icon={<BookOpen size={48} className={`${gradientTextClass} mb-4`} />} />}
        {activeTab === 'landing' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'products' && <ProductsView />}
        {activeTab === 'services' && <ServicesView />}
        {activeTab === 'about' && <PlaceholderView title="About" icon={<BookOpen size={48} className={`${gradientTextClass} mb-4`} />} />}
        {activeTab === 'help' && <GalleryView />}
        {activeTab === 'join' && <JoinView />}
      </main>

      <FloatingHomeButton
        isVisible={showHomeBubble && !isChatOpen}
        onClick={scrollToTop}
      />
      <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  );
}

function Navbar({ activeTab, setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD' },
    { id: 'products', label: 'PRODUCTS' },
    { id: 'services', label: 'SERVICES' },
    { id: 'help', label: 'GALLERY' },
    { id: 'about', label: 'ABOUT' },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl">
      <div className="flex w-full items-center justify-between gap-4 px-3 py-4 sm:px-4 lg:px-6 xl:px-8 2xl:px-10">
        <div className="group flex min-w-0 cursor-pointer items-center gap-3" onClick={() => handleTabChange('landing')}>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange-500/70 bg-[#111111] p-2 shadow-[0_8px_22px_rgba(249,115,22,0.22)] ring-1 ring-white/10 transition-transform group-hover:scale-105">
            <img
              src={jbmsLogo}
              alt="JBMS MOTOSHOP logo"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <span className="truncate text-lg font-black italic tracking-tighter text-white sm:text-2xl">JBMS MOTOSHOP</span>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`group relative overflow-hidden border px-5 py-3 text-[11px] font-black tracking-[0.18em] transition-all duration-300 lg:px-6 ${
                activeTab === item.id
                  ? 'border-red-500/70 bg-[#141414] text-white shadow-[0_0_0_1px_rgba(255,59,59,0.18)]'
                  : 'border-transparent bg-transparent text-white hover:border-white/15 hover:bg-[#121212]'
              }`}
            >
              <span
                className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#ff3b3b] transition-transform duration-300 ${
                  activeTab === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleTabChange('join')}
          className={`${gradientSurfaceClass} hidden rounded-2xl px-5 py-2.5 text-[12px] font-black uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_rgba(249,115,22,0.24)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(249,115,22,0.28)] md:inline-flex lg:px-6`}
        >
          Join Us Now
        </button>

        <div className="relative md:hidden">
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#161616] text-white shadow-[0_14px_28px_rgba(0,0,0,0.35)] transition-all hover:border-orange-400/40 hover:bg-[#1d1d1d]"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {isMobileMenuOpen && (
            <div className="absolute right-0 top-[calc(100%+12px)] w-[220px] overflow-hidden rounded-[24px] border border-white/10 bg-[#111111] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabChange(item.id)}
                    className={`group relative w-full overflow-hidden border px-4 py-3 text-left text-[11px] font-black tracking-[0.18em] transition-all duration-300 ${
                      activeTab === item.id
                        ? 'border-red-500/70 bg-[#141414] text-white shadow-[0_0_0_1px_rgba(255,59,59,0.18)]'
                        : 'border-white/10 bg-[#111111] text-gray-300 hover:border-white/20 hover:bg-[#171717]'
                    }`}
                  >
                    <span
                      className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#ff3b3b] transition-transform duration-300 ${
                        activeTab === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                    {item.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handleTabChange('join')}
                  className={`${gradientSurfaceClass} w-full rounded-2xl px-4 py-3 text-left text-[12px] font-black uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_rgba(249,115,22,0.24)]`}
                >
                  Join Us Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function FloatingHomeButton({ isVisible, onClick }) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-28 z-[9998]">
      <button
        type="button"
        onClick={onClick}
        aria-label="Scroll to top"
        className="group flex h-16 w-16 items-center justify-center rounded-full border border-red-500/45 bg-[#111111]/95 text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-500/70 hover:bg-[#171717]"
      >
        <span className="absolute inset-x-3 bottom-0 h-[2px] origin-center scale-x-0 bg-[#ff3b3b] transition-transform duration-300 group-hover:scale-x-100" />
        <House size={28} className="transition-transform duration-300 group-hover:scale-110" />
      </button>
    </div>
  );
}

function HomeView({ setActiveTab }) {
  return (
    <div className="mt-10 flex flex-col gap-10 animate-in fade-in duration-700 lg:mt-12">
      <section className="grid items-center gap-10 border-y border-white/10 bg-[#101010] px-5 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.45)] lg:grid-cols-[1fr_1.45fr] lg:px-8 xl:px-10 2xl:px-12">
        <div className="text-center lg:text-left">
          <div className="mb-5 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6 lg:justify-start">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-[3px] border-orange-500/80 bg-[#1a1a1a] p-3 shadow-[0_18px_45px_rgba(249,115,22,0.2)] ring-1 ring-white/10 sm:h-32 sm:w-32">
              <img
                src={jbmsLogo}
                alt="JBMS MOTOSHOP logo"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter text-white sm:text-6xl xl:text-7xl">JBMS MOTOSHOP</h1>
          </div>

          <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl xl:text-6xl">Gear Up. Ride Hard.</h2>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.3em] text-gray-400">Premium Parts • Expert Service • PH Choice</p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-gray-300 xl:max-w-2xl">
            Built like a real storefront now: wider, bolder, and easier to scan across the full browser width while keeping the shop branding front and center.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <button
              onClick={() => setActiveTab('join')}
              className={`${gradientSurfaceClass} rounded-full px-10 py-4 text-lg font-black italic tracking-tight text-white shadow-[0_24px_50px_rgba(249,115,22,0.32)] transition-all hover:scale-105 hover:shadow-[0_28px_60px_rgba(249,115,22,0.36)]`}
            >
              GET STARTED
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className="rounded-full border border-white/10 bg-[#1a1a1a] px-10 py-4 text-sm font-black uppercase tracking-[0.18em] text-gray-200 transition-all hover:border-orange-400/40 hover:bg-[#202020]"
            >
              Explore Products
            </button>
          </div>
        </div>

        <div className="w-full rounded-[36px] border border-white/10 bg-[#1a1a1a] p-3 shadow-2xl">
          <div className="relative h-[320px] overflow-hidden rounded-[28px] sm:h-[420px] xl:h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1600"
              alt="Biker"
              className="h-full w-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
              <div>
                <p className={`${gradientTextClass} text-xs font-black uppercase tracking-[0.4em]`}>Website View</p>
                <h3 className="mt-3 text-3xl font-black italic text-white sm:text-4xl">Full-width showroom feel.</h3>
              </div>
              <div className="hidden rounded-[28px] border border-white/10 bg-black/45 px-5 py-4 text-right backdrop-blur-md md:block">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400">Open Daily</p>
                <p className="mt-2 text-lg font-black text-white">Parts. Service. Support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mb-24 overflow-hidden border-y border-white/10 bg-[#141414] px-5 py-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:px-8 xl:px-10 2xl:px-12">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          <div className="relative z-10">
            <h3 className="mb-2 text-5xl font-black italic text-white xl:text-6xl">Service Fast.</h3>
            <p className={`${gradientTextClass} text-lg font-black uppercase tracking-widest xl:text-xl`}>Premium Parts & Maintenance</p>
          </div>
          <div className="relative z-10">
            <h3 className="mb-2 text-5xl font-black italic text-white xl:text-6xl">Powered By Performance</h3>
            <p className={`${gradientTextClass} text-lg font-black uppercase tracking-widest xl:text-xl`}>Top-Tier Engine Components</p>
          </div>
          <div className="relative z-10">
            <h3 className="mb-2 text-5xl font-black italic text-white xl:text-6xl">Built To Last</h3>
            <p className={`${gradientTextClass} text-lg font-black uppercase tracking-widest xl:text-xl`}>Global Quality Brands</p>
          </div>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[20rem] font-black italic text-white opacity-[0.02]">MOTO</div>
      </section>
    </div>
  );
}

function JoinView() {
  const bannerItems = [carGif, motGif, carTwoGif, motTwoGif];
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveBannerIndex((currentIndex) => (currentIndex + 1) % bannerItems.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [bannerItems.length]);

  return (
    <div className="mt-12 mb-24 animate-in fade-in duration-700">
      <section className="w-full border-y border-white/10 bg-[#111111] p-6 shadow-2xl sm:p-10 xl:px-14">
        <div className="mx-auto flex w-full max-w-5xl flex-col rounded-[42px] border border-white/10 bg-[#2a2a2a] px-6 py-10 text-center shadow-[0_20px_45px_rgba(0,0,0,0.28)] sm:px-10 lg:px-14">
          <div>
            <p className={`${gradientTextClass} text-xs font-black uppercase tracking-[0.45em]`}>Join JBMS</p>
            <h2 className="mt-4 text-5xl font-black italic tracking-tight text-white sm:text-6xl">Stay in the loop.</h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm font-bold uppercase tracking-[0.24em] text-gray-400 sm:text-base">
              Leave your email and we can wire up the real submit flow later.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-[620px] rounded-[34px] border border-orange-400/30 bg-[#1a1a1a] p-4 shadow-[0_20px_45px_rgba(249,115,22,0.12)]">
              <div className="overflow-hidden rounded-[26px] border border-white/10">
                <div
                  className="flex h-[220px] transition-transform duration-700 ease-out sm:h-[250px]"
                  style={{ transform: `translateX(-${activeBannerIndex * 100}%)` }}
                >
                  {bannerItems.map((bannerSrc, index) => (
                    <img
                      key={bannerSrc}
                      src={bannerSrc}
                      alt={`JBMS MOTOSHOP banner ${index + 1}`}
                      className="h-[220px] w-full min-w-full object-cover sm:h-[250px]"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {bannerItems.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      index === activeBannerIndex ? 'bg-gradient-to-r from-[#ff3636] to-[#f97215]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <form className="mx-auto mt-12 flex w-full max-w-[760px] flex-col gap-5">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-3xl border border-white/10 bg-[#1a1a1a] px-6 py-5 text-base font-bold text-white outline-none transition-all placeholder:text-gray-500 focus:border-orange-500"
            />
            <button
              type="button"
              className={`${gradientSurfaceClass} w-full rounded-3xl px-6 py-5 text-sm font-black uppercase tracking-[0.3em] text-white shadow-[0_18px_35px_rgba(249,115,22,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(249,115,22,0.34)]`}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function ProductsView() {
  const productSections = [
    {
      id: 'engine-performance',
      number: '01',
      title: 'Basic Engine & Performance Parts',
      description: 'Core performance and engine essentials for smoother starts, better airflow, and stronger running condition.',
      icon: Gauge,
      items: ['Engine', 'Spark plugs', 'Carburetor / fuel injector', 'Air filter', 'Oil filter', 'Exhaust / muffler'],
    },
    {
      id: 'wear-tear',
      number: '02',
      title: 'Wear-and-Tear',
      description: 'Fast-moving replacement parts riders usually need during regular maintenance and everyday use.',
      icon: CircleDot,
      items: ['Tires', 'Inner tubes', 'Brake pads / brake shoes', 'Chain & sprocket set', 'Engine oil / lubricants'],
    },
    {
      id: 'drive-control',
      number: '03',
      title: 'Drive & Control Parts',
      description: 'Controls and drivetrain pieces that keep shifting, throttle response, and braking feel dependable.',
      icon: Cable,
      items: ['Clutch plates / clutch cable', 'Throttle cable', 'Gear shifter components', 'Brake levers & pedals'],
    },
    {
      id: 'electrical-lighting',
      number: '04',
      title: 'Electrical & Lighting',
      description: 'Power, visibility, and ignition components for everyday safety and dependable electrical performance.',
      icon: Battery,
      items: ['Battery', 'Headlight / taillight bulbs', 'Turn signals', 'Wiring / ignition switch'],
    },
    {
      id: 'body-structural',
      number: '05',
      title: 'Body & Structural Parts',
      description: 'Exterior and frame-adjacent pieces that shape comfort, appearance, and rider control.',
      icon: Bike,
      items: ['Side mirrors', 'Seat', 'Fuel tank', 'Fairings / body panels', 'Handlebars'],
    },
    {
      id: 'suspension-braking',
      number: '06',
      title: 'Suspension & Braking System',
      description: 'Stability and stopping hardware made to improve ride confidence, comfort, and braking response.',
      icon: Shield,
      items: ['Shock absorbers', 'Front forks', 'Brake discs / drums', 'Brake fluid'],
    },
  ];

  const [openSection, setOpenSection] = useState(productSections[0].id);

  return (
    <section className="mt-10 mb-24 animate-in fade-in duration-700">
      <div className="mb-8 px-1">
        <p className={`${gradientTextClass} text-xs font-black uppercase tracking-[0.45em]`}>JBMS Products</p>
        <h2 className="mt-4 max-w-6xl text-3xl font-black italic tracking-tight text-white sm:text-4xl lg:text-5xl">Browse parts by category and open a section to see what&apos;s inside.</h2>
        <p className="mt-4 max-w-5xl text-xs font-bold uppercase tracking-[0.14em] text-gray-500 sm:text-sm">
          Clean dropdown sections, quick scanning, and a focused active state.
        </p>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-2">
        {productSections.map((section) => {
          const Icon = section.icon;
          const isOpen = openSection === section.id;

          return (
            <div
              key={section.id}
              className={`group relative self-start overflow-hidden rounded-[32px] border border-white/12 bg-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300 ${
                isOpen ? 'bg-[#181818] ring-1 ring-orange-400/20' : 'hover:border-white/20 hover:bg-[#161616]'
              }`}
            >
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                  isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
                <div className="absolute inset-6 rounded-[28px] bg-gradient-to-br from-[#ff3636]/10 via-[#f97215]/8 to-transparent blur-2xl" />
              </div>

              <button
                type="button"
                onClick={() => setOpenSection(isOpen ? '' : section.id)}
                className="relative z-10 flex w-full items-start gap-4 p-6 text-left transition-all duration-300 ease-out focus:outline-none sm:gap-5 sm:p-8"
              >
                <div className="min-w-[34px] pt-1 text-[11px] font-black tracking-[0.35em] text-sky-200/70">
                  {section.number}
                </div>
                <div className={`min-w-0 flex-1 transition-all duration-300 ${isOpen ? 'scale-[1.01]' : 'group-hover:scale-[1.01]'}`}>
                  <div
                    className={`inline-flex rounded-2xl border p-3 transition-all duration-300 ${
                      isOpen
                        ? 'border-orange-400/50 bg-white/5 shadow-[0_0_30px_rgba(249,115,22,0.18)]'
                        : 'border-white/10 bg-white/[0.02] group-hover:border-orange-400/40 group-hover:shadow-[0_0_28px_rgba(249,115,22,0.14)]'
                    }`}
                  >
                    <Icon size={26} className={isOpen ? 'text-orange-300' : 'text-gray-400 transition-colors duration-300 group-hover:text-orange-300'} />
                  </div>
                  <h3 className="mt-8 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                    {section.title}
                  </h3>
                  <p
                    className="mt-4 overflow-hidden pr-2 text-sm leading-7 text-gray-400 sm:text-base sm:leading-8"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {section.description}
                  </p>
                </div>

                <div
                  className={`mt-1 rounded-full border border-white/10 bg-white/[0.03] p-2 transition-all duration-300 ${
                    isOpen ? 'rotate-180 border-orange-400/40 text-orange-300' : 'text-gray-400 group-hover:text-orange-300'
                  }`}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              <div
                className={`relative z-10 grid transition-all duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-70'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-white/10 px-6 pb-6 pt-5 sm:px-8 sm:pb-8">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {section.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-[#202020] px-4 py-4 text-sm font-bold text-gray-200 shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-orange-400/30 hover:bg-[#262626]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ServicesView() {
  const services = [
    {
      id: 'general-repair',
      number: '01',
      title: 'General Repair',
      description: 'Comprehensive maintenance and repair work for motorcycles, from tune-ups and oil changes to deeper engine fixes.',
      icon: Wrench,
    },
    {
      id: 'parts-accessories',
      number: '02',
      title: 'Parts & Accessories',
      description: 'Wide selection of genuine and performance-focused components sourced for riders who want both reliability and style.',
      icon: ShoppingBag,
    },
    {
      id: 'online-booking',
      number: '03',
      title: 'Online Booking',
      description: 'Reserve your service slot faster and keep scheduling simple when the shop is busy and your ride needs attention.',
      icon: Calendar,
    },
    {
      id: 'ai-diagnostics',
      number: '04',
      title: 'AI Diagnostics',
      description: 'Get quicker issue spotting with a guided check flow that helps narrow down sounds, vibrations, and performance problems.',
      icon: Cpu,
    },
    {
      id: 'tire-wheel',
      number: '05',
      title: 'Tire & Wheel',
      description: 'Tire fitting, balancing, and wheel care built for everyday riders, long-distance trips, and performance-minded setups.',
      icon: Disc3,
    },
    {
      id: 'service-history',
      number: '06',
      title: 'Service History',
      description: 'Keep a clean record of maintenance visits and major repairs so future service decisions stay easier to track.',
      icon: ClipboardList,
    },
  ];

  const [selectedService, setSelectedService] = useState(services[0].id);

  return (
    <section className="mt-10 mb-24 animate-in fade-in duration-700">
      <div className="mb-8 px-1">
        <p className={`${gradientTextClass} text-xs font-black uppercase tracking-[0.45em]`}>JBMS Services</p>
        <h2 className="mt-4 max-w-6xl text-3xl font-black italic tracking-tight text-white sm:text-4xl lg:text-5xl">Built for repair, upkeep, and ride-ready support.</h2>
        <p className="mt-4 max-w-5xl text-xs font-bold uppercase tracking-[0.14em] text-gray-500 sm:text-sm">
          Hover a card for a live highlight, or tap one to keep it selected.
        </p>
      </div>

      <div className="grid overflow-hidden border border-white/10 bg-[#111111] shadow-[0_25px_80px_rgba(0,0,0,0.4)] md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isSelected = selectedService === service.id;
          const borderClass = index === 0
            ? ''
            : index < 3
              ? 'border-t md:border-t-0'
              : 'border-t';

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => setSelectedService(service.id)}
              className={`group relative min-h-[260px] border-white/10 p-6 text-left transition-all duration-300 ease-out focus:outline-none sm:p-8 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-r xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 ${borderClass} ${isSelected ? 'bg-[#181818]' : 'bg-transparent hover:bg-[#151515]'}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 transition-all duration-300 ${
                  isSelected
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
                <div className="absolute inset-6 rounded-[28px] bg-gradient-to-br from-[#ff3636]/10 via-[#f97215]/8 to-transparent blur-2xl" />
              </div>

              <div
                className={`relative z-10 h-full transition-all duration-300 ${
                  isSelected ? 'scale-[1.02]' : 'group-hover:scale-[1.02]'
                }`}
              >
                <p className="text-[11px] font-black tracking-[0.35em] text-sky-200/70">{service.number}</p>
                <div
                  className={`mt-8 inline-flex rounded-2xl border p-3 transition-all duration-300 ${
                    isSelected
                      ? 'border-orange-400/50 bg-white/5 shadow-[0_0_30px_rgba(249,115,22,0.18)]'
                      : 'border-white/10 bg-white/[0.02] group-hover:border-orange-400/40 group-hover:shadow-[0_0_28px_rgba(249,115,22,0.14)]'
                  }`}
                >
                  <Icon
                    size={32}
                    className={isSelected ? 'text-orange-300' : 'text-gray-400 transition-colors duration-300 group-hover:text-orange-300'}
                  />
                </div>
                <h3 className="mt-7 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-[32ch] text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
                  {service.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function PlaceholderView({ title, icon }) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
      {icon}
      <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white">{title}</h2>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.5em] text-gray-500">Section Under Construction</p>
    </div>
  );
}

function GalleryView() {
  const galleryImages = [gal1, gal2, gal3, gal4, gal5, gal6, gal7];
  const loopedGalleryImages = [...galleryImages, galleryImages[0]];
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isSliderTransitionEnabled, setIsSliderTransitionEnabled] = useState(true);
  const activeImageIndex = sliderIndex % galleryImages.length;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSliderIndex((currentIndex) => currentIndex + 1);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isSliderTransitionEnabled) {
      const timeoutId = window.setTimeout(() => {
        setIsSliderTransitionEnabled(true);
      }, 60);

      return () => window.clearTimeout(timeoutId);
    }
  }, [isSliderTransitionEnabled]);

  const handleSliderTransitionEnd = () => {
    if (sliderIndex === galleryImages.length) {
      setIsSliderTransitionEnabled(false);
      setSliderIndex(0);
    }
  };

  return (
    <section className="mt-10 mb-24 animate-in fade-in duration-700">
      <div className="mb-8 px-1 text-center">
        <p className={`${gradientTextClass} text-xs font-black uppercase tracking-[0.45em]`}>JBMS Gallery</p>
        <h2 className="mt-4 text-3xl font-black italic tracking-tight text-white sm:text-4xl lg:text-5xl">
          Highlights from the shop floor, builds, and real service moments.
        </h2>
        <p className="mx-auto mt-4 max-w-4xl text-sm font-bold uppercase tracking-[0.14em] text-gray-500 sm:text-base">
          A rotating showcase of JBMS work, rider visits, and behind-the-scenes snapshots from the garage.
        </p>
      </div>

      <div className="rounded-[38px] border border-white/10 bg-[#111111] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.4)] sm:p-8 lg:p-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[30px] border border-white/40 bg-black">
            <div
              className={`flex ${isSliderTransitionEnabled ? 'transition-transform duration-700 ease-out' : ''}`}
              style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
              onTransitionEnd={handleSliderTransitionEnd}
            >
              {loopedGalleryImages.map((imageSrc, index) => (
                <img
                  key={`${imageSrc}-${index}`}
                  src={imageSrc}
                  alt={`JBMS gallery ${((index % galleryImages.length) || galleryImages.length)}`}
                  className="h-[320px] w-full min-w-full object-cover sm:h-[420px] lg:h-[560px]"
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6 sm:p-8">
              <div>
                <p className={`${gradientTextClass} text-xs font-black uppercase tracking-[0.4em]`}>On Display</p>
                <h3 className="mt-3 text-3xl font-black italic text-white sm:text-4xl">Featured gallery shot.</h3>
              </div>
              <div className="hidden rounded-[24px] border border-white/10 bg-black/45 px-4 py-3 text-right backdrop-blur-md md:block">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400">Auto Scroll</p>
                <p className="mt-2 text-base font-black text-white">{String(activeImageIndex + 1).padStart(2, '0')} / 07</p>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <div className="flex gap-4 pb-2">
              {galleryImages.map((imageSrc, index) => (
                <button
                  key={imageSrc}
                  type="button"
                  onClick={() => {
                    setIsSliderTransitionEnabled(true);
                    setSliderIndex(index);
                  }}
                  className={`min-w-[180px] overflow-hidden rounded-[22px] border transition-all duration-300 sm:min-w-[220px] ${
                    index === activeImageIndex
                      ? 'border-orange-400/70 ring-1 ring-orange-400/20 shadow-[0_0_24px_rgba(249,115,22,0.16)]'
                      : 'border-white/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imageSrc}
                    alt={`JBMS thumbnail ${index + 1}`}
                    className="h-[120px] w-full object-cover sm:h-[140px]"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {galleryImages.map((_, index) => (
              <span
                key={index}
                className={`h-2.5 w-10 rounded-full transition-all ${
                  index === activeImageIndex ? 'bg-gradient-to-r from-[#ff3636] to-[#f97215]' : 'bg-white/15'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chatbot({ isChatOpen, setIsChatOpen }) {
  const [messages, setMessages] = useState([
    { role: 'model', text: "Ride safe, Welcome to JBMS MOTOSHOP. AI Mechanic here to help!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isChatOpen]);

  const fetchWithRetry = async (url, options, retries = 5, backoff = 1000) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retries <= 0) throw error;
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
      history.push({ role: 'user', parts: [{ text: userMsg }] });

      const data = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: history,
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
          })
        }
      );

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I am so sorry but can you clarify your inquiry?";
      setMessages((prev) => [...prev, { role: 'model', text: aiResponse }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'model', text: "I can't connect to the server right now please try again later Thank you." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className={`${gradientSurfaceClass} group flex items-center justify-center rounded-full p-5 text-white shadow-[0_20px_50px_rgba(249,115,22,0.4)] transition-all hover:scale-110 active:scale-95 animate-pulse-orange`}
        >
          <MessageCircle size={36} className="fill-white/10 transition-transform group-hover:rotate-12" />
        </button>
      )}

      {isChatOpen && (
        <div className="chat-slide-up flex h-[520px] max-h-[80vh] w-[336px] max-w-[88vw] flex-col overflow-hidden rounded-[32px] border-2 border-white/10 bg-[#111111] shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#ff3636] to-[#f97215] p-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/20 p-2 backdrop-blur-md ring-1 ring-white/30">
                <Wrench size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase leading-none tracking-tighter text-white italic">AI Mechanic</h3>
                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-orange-100 opacity-80">Online • MOTOSHOP PH</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="rounded-full bg-black/20 p-2 text-white shadow-lg transition-transform hover:rotate-90">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="custom-scrollbar flex-1 space-y-5 overflow-y-auto bg-black p-5">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`rounded-2xl p-2 ${msg.role === 'user' ? 'bg-orange-500/20' : 'bg-white/5'}`}>
                  {msg.role === 'user' ? <User size={16} className="text-orange-400" /> : <Wrench size={16} className="text-gray-400" />}
                </div>
                <div className={`max-w-[78%] rounded-[24px] px-5 py-3.5 text-sm font-bold leading-relaxed shadow-xl ${
                  msg.role === 'user'
                    ? 'rounded-tr-none bg-gradient-to-r from-[#ff3636] to-[#f97215] text-white'
                    : 'rounded-tl-none border border-white/5 bg-[#202020] text-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center justify-start gap-2.5">
                <div className="rounded-2xl bg-white/5 p-2"><Wrench size={16} className="animate-spin text-gray-600" /></div>
                <div className="flex gap-1.5 rounded-[24px] rounded-tl-none bg-[#202020] px-5 py-3.5">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-[#ff3636] to-[#f97215]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-[#ff3636] to-[#f97215] [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-[#ff3636] to-[#f97215] [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="border-t border-white/5 bg-[#111111] p-5">
            <div className="group relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What's your question?"
                className="w-full rounded-full border-2 border-white/5 bg-[#202020] py-4 pl-6 pr-14 text-sm font-bold text-white transition-all placeholder:text-gray-600 focus:border-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                className={`${gradientSurfaceClass} absolute right-2 top-2 rounded-full p-3 text-white shadow-xl transition-all hover:scale-105 hover:shadow-[0_16px_28px_rgba(249,115,22,0.28)] active:scale-95`}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

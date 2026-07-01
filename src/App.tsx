/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  CalendarCheck,
  Award,
  BookOpen,
  Info,
  MapPin,
  Clock,
  Shield,
  Star,
  Sparkles,
  PhoneCall,
  Search,
  Check,
  ChevronDown
} from 'lucide-react';

import { MenuItem, Campaign, AdminSettings, Reservation, SEOMeta } from './types';
import { INITIAL_MENU_ITEMS, INITIAL_SEO_METAS } from './data/initialMenu';
import ProductCard from './components/ProductCard';
import BookingForm from './components/BookingForm';
import WishlistDrawer from './components/WishlistDrawer';
import AdminPortal from './components/AdminPortal';
import ContactPage from './components/ContactPage';
import ReservationPage from './components/ReservationPage';

export default function App() {
  // Load initial persistent states or fallbacks
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('tbb_menu_items');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [wishlist, setWishlist] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('tbb_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('tbb_reservations');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem('tbb_settings');
    return saved ? JSON.parse(saved) : {
      taxRate: 16, // Punjab Dining tax
      basePriceModifier: 1.0,
      whatsAppNumber: '923001234567',
      storeAddress: 'Gulgasht Colony, Multan, Pakistan',
      seoTitle: INITIAL_SEO_METAS.home.seoTitle,
      metaDescription: INITIAL_SEO_METAS.home.metaDescription,
    };
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('tbb_campaigns');
    return saved ? JSON.parse(saved) : [
      {
        id: 'eid-2026',
        name: 'Eid Curation Special',
        description: 'Enjoy pre-allocated premium tables with 15% discount on our entire signature beef steak selection during Eid.',
        discountPercentage: 15,
        isActive: true,
        code: 'EIDBEARS'
      },
      {
        id: 'ind-2026',
        name: 'Azadi Gourmet Feast',
        description: 'Celebrate Independence with complimentary dessert platter on booking tables for party size of 5+ guests.',
        discountPercentage: 10,
        isActive: false,
        code: 'AZADI79'
      }
    ];
  });

  const [categoriesList, setCategoriesList] = useState<string[]>(() => {
    const saved = localStorage.getItem('tbb_categories_list');
    return saved ? JSON.parse(saved) : ['Appetizers', 'Burgers & Sandwiches', 'Wraps', 'Chicken Main Course', 'Beef Steaks', 'Chinese / Rice', 'Pasta & Italian', 'Fish', 'Noodles', 'Salads', 'Soups', 'Beverages'];
  });

  // UI state managers
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'reservation' | 'contact' | 'admin'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [menuSearchTerm, setMenuSearchTerm] = useState('');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [checkoutPayload, setCheckoutPayload] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('tbb_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('tbb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tbb_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('tbb_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('tbb_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('tbb_categories_list', JSON.stringify(categoriesList));
  }, [categoriesList]);

  // Handle direct hash route for secure portal: #admin-secure-portal
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin-secure-portal') {
        setActiveTab('admin');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Update real document SEO tags dynamically based on settings / selections
  useEffect(() => {
    document.title = settings.seoTitle || "The Bar Bears Multan";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', settings.metaDescription || "Premium dining concept in Multan.");
  }, [settings.seoTitle, settings.metaDescription]);

  // Apply price modifier to base prices globally
  const getModifiedPrice = (basePrice: number) => {
    return basePrice * settings.basePriceModifier;
  };

  // Helper arrays
  const categories = ['All', ...categoriesList];
  const signatureDishes = menuItems.filter(item => item.is_signature);

  // Wishlist handler
  const handleToggleWishlist = (item: MenuItem) => {
    const exists = wishlist.some(w => w.id === item.id);
    if (exists) {
      setWishlist(wishlist.filter(w => w.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  const handleClearWishlist = () => {
    setWishlist([]);
  };

  // Immediate single item checkout
  const handleReserveImmediate = (item: MenuItem) => {
    // Apply modifier price to the checkout object
    const modifiedItem = { ...item, price_pkr: getModifiedPrice(item.price_pkr) };
    setCheckoutPayload([{ item: modifiedItem, quantity: 1 }]);
    setActiveTab('reservation');
  };

  // Wishlist multi-item checkout
  const handleReserveWishlist = () => {
    if (wishlist.length === 0) return;
    const payload = wishlist.map(item => ({
      item: { ...item, price_pkr: getModifiedPrice(item.price_pkr) },
      quantity: 1
    }));
    setCheckoutPayload(payload);
    setActiveTab('reservation');
  };

  const handleUpdateQuantity = (itemId: string, qty: number) => {
    setCheckoutPayload(
      checkoutPayload.map(p => (p.item.id === itemId ? { ...p, quantity: qty } : p))
    );
  };

  const handleRemoveCheckoutItem = (itemId: string) => {
    setCheckoutPayload(checkoutPayload.filter(p => p.item.id !== itemId));
  };

  const handleBookingComplete = (newRes: Reservation) => {
    setReservations([newRes, ...reservations]);
    // Clear wishlist if checked out from wishlist
    if (checkoutPayload.length > 1) {
      setWishlist([]);
    }
  };

  const activeCampaign = campaigns.find(c => c.isActive);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-800 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Sticky Top Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md transition-all shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          
          {/* Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 font-sans text-xl font-black text-black shadow-lg shadow-amber-500/15 group-hover:scale-105 transition-transform duration-300">
              🐻
            </div>
            <div>
              <span className="font-sans text-lg font-black tracking-tight text-zinc-900 block leading-none">THE BAR BEARS</span>
              <span className="text-[10px] font-mono tracking-widest text-amber-600 font-bold uppercase">Multan Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-zinc-600">
            <button
              onClick={() => { setActiveTab('home'); setIsCheckoutOpen(false); }}
              className={`hover:text-amber-600 transition ${activeTab === 'home' && !isCheckoutOpen ? 'text-amber-600 font-extrabold' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveTab('menu'); setIsCheckoutOpen(false); }}
              className={`hover:text-amber-600 transition ${activeTab === 'menu' && !isCheckoutOpen ? 'text-amber-600 font-extrabold' : ''}`}
            >
              Bar BEARS Menu
            </button>
            <button
              onClick={() => { setActiveTab('reservation'); setIsCheckoutOpen(false); }}
              className={`hover:text-amber-600 transition ${activeTab === 'reservation' ? 'text-amber-600 font-extrabold' : ''}`}
            >
              Table Reservation
            </button>
            <button
              onClick={() => { setActiveTab('contact'); setIsCheckoutOpen(false); }}
              className={`hover:text-amber-600 transition ${activeTab === 'contact' ? 'text-amber-600 font-extrabold' : ''}`}
            >
              Contact Us
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`hover:text-amber-600 transition ${activeTab === 'admin' ? 'text-amber-600 font-extrabold' : ''}`}
            >
              Admin Desk
            </button>
          </div>

          {/* Right Controls: Wishlist count + Table reservation summary */}
          <div className="flex items-center gap-3">
            {/* Wishlist Button Counter */}
            <motion.button
              id="wishlist-trigger"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWishlistOpen(true)}
              className="relative flex h-10 px-3 items-center gap-2 rounded-xl border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-zinc-900 transition shadow-xs"
              aria-label="View Curation Wishlist"
            >
              <Heart className={`h-4.5 w-4.5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="text-xs font-bold font-mono bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200 text-zinc-700">
                {wishlist.length}
              </span>
            </motion.button>

            {wishlist.length > 0 && (
              <motion.button
                id="main-table-reserve-trigger"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleReserveWishlist}
                className="hidden sm:flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/10"
              >
                <CalendarCheck className="h-4 w-4" />
                Book Table ({wishlist.length})
              </motion.button>
            )}
          </div>

        </div>

        {/* Mobile Navigation Strip */}
        <div className="flex md:hidden border-t border-zinc-100 bg-zinc-50 px-4 py-2 overflow-x-auto gap-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 scrollbar-none">
          <button
            onClick={() => { setActiveTab('home'); setIsCheckoutOpen(false); }}
            className={`whitespace-nowrap ${activeTab === 'home' ? 'text-amber-600 font-extrabold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => { setActiveTab('menu'); setIsCheckoutOpen(false); }}
            className={`whitespace-nowrap ${activeTab === 'menu' ? 'text-amber-600 font-extrabold' : ''}`}
          >
            Bar BEARS Menu
          </button>
          <button
            onClick={() => { setActiveTab('reservation'); setIsCheckoutOpen(false); }}
            className={`whitespace-nowrap ${activeTab === 'reservation' ? 'text-amber-600 font-extrabold' : ''}`}
          >
            Table Reservation
          </button>
          <button
            onClick={() => { setActiveTab('contact'); setIsCheckoutOpen(false); }}
            className={`whitespace-nowrap ${activeTab === 'contact' ? 'text-amber-600 font-extrabold' : ''}`}
          >
            Contact Us
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`whitespace-nowrap ${activeTab === 'admin' ? 'text-amber-600 font-extrabold' : ''}`}
          >
            Admin
          </button>
        </div>
      </nav>

      {/* Main Content Areas */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">

        {/* Dynamic checkout submission form */}
        <AnimatePresence>
          {isCheckoutOpen && (
            <motion.div
              id="checkout-form-anchor"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 overflow-hidden"
            >
              <BookingForm
                selectedItems={checkoutPayload}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveCheckoutItem}
                taxRate={settings.taxRate}
                whatsAppNumber={settings.whatsAppNumber}
                onClose={() => setIsCheckoutOpen(false)}
                onBookingComplete={handleBookingComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          
          {/* TAB: HOME */}
          {activeTab === 'home' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              key="home-view"
              className="space-y-16"
            >
              {/* Premium Hero Section */}
              <section className="relative rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50/60 via-amber-100/10 to-white p-8 md:p-14 text-center overflow-hidden shadow-xs">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating elements */}
                <div className="absolute top-6 left-6 text-amber-200/40 text-5xl select-none">🐻</div>
                <div className="absolute bottom-6 right-6 text-amber-200/40 text-6xl select-none">☕</div>

                <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-200 px-3.5 py-1 text-xs text-amber-800 font-semibold shadow-xs">
                    <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
                    Multan's Premier Food & Cafe Concept
                  </div>

                  <h1 className="font-sans text-4xl md:text-6xl font-black tracking-tight text-zinc-900 leading-tight">
                    Premium Curation, <span className="text-amber-600">Exquisite Dining.</span>
                  </h1>
                  <p className="text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                    Welcome to <strong className="text-zinc-800">The Bar Bears Multan</strong>. Build your customized culinary selection, log your reservation timeslot, and transmit details seamlessly to lock in your table allocation.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => setActiveTab('menu')}
                      className="rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition w-full sm:w-auto shadow-xl shadow-amber-500/15"
                    >
                      Explore Gourmet Catalogue
                    </button>
                    <a
                      href="#about-location"
                      className="rounded-xl border border-zinc-200 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 hover:border-zinc-300 hover:text-zinc-900 transition w-full sm:w-auto shadow-xs"
                    >
                      Location & Hours
                    </a>
                  </div>
                </div>

                {/* Promotional banner triggered by Admin Campaign State */}
                {activeCampaign && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 max-w-xl mx-auto rounded-2xl border border-amber-200 bg-amber-500/10 p-4 flex items-center justify-between text-left gap-4 shadow-xs"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest block">Active Special Deals</span>
                      <h4 className="text-sm font-bold text-zinc-900 mt-1">{activeCampaign.name}</h4>
                      <p className="text-xs text-zinc-600 mt-0.5">{activeCampaign.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-base font-black text-amber-600 block">{activeCampaign.discountPercentage}% OFF</span>
                      <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[8px] font-mono font-bold text-black uppercase">
                        {activeCampaign.code}
                      </span>
                    </div>
                  </motion.div>
                )}
              </section>

              {/* Signature Dishes Grid - Displays only if item.is_signature = true */}
              <section className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                      <Award className="h-6 w-6 text-amber-600" />
                      Signature Dishes
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Expertly crafted, glowing-edged culinary marvels unique to The Bar Bears.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => { setActiveTab('menu'); setSelectedCategory('All'); }}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    View All Menu ({menuItems.length})
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {signatureDishes.slice(0, 4).map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      isWishlisted={wishlist.some(w => w.id === item.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onReserveImmediate={handleReserveImmediate}
                      taxRate={settings.taxRate}
                    />
                  ))}
                </div>
              </section>

              {/* Core Features / Conversion Info */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 space-y-3 shadow-xs">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="font-sans text-sm font-bold text-zinc-800 uppercase tracking-wide">1. Curate Your Feast</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Browse our multi-category menu array. Add burgers, Rib Eye steaks, or Szechwan plates to your personal Curation Wishlist.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 space-y-3 shadow-xs">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="font-sans text-sm font-bold text-zinc-800 uppercase tracking-wide">2. Pick Your Schedule</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Set your dining date, select your desired time-slot (Lunch, Tea, Dinner, Late Night), and choose your total guest size.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 space-y-3 shadow-xs">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="font-sans text-sm font-bold text-zinc-800 uppercase tracking-wide">3. WhatsApp Direct Submit</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Confirm details to auto-compile a perfect reservation string and forward it instantly to our concierge via safe WhatsApp hooks.
                  </p>
                </div>
              </section>

            </motion.div>
          )}

          {/* TAB: GOURMET MENU */}
          {activeTab === 'menu' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              key="menu-view"
              className="space-y-8"
            >
              {/* Category Explorer & Filter Controls */}
              <div className="space-y-4">
                <div>
                  <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-amber-600" />
                    Gourmet Curation Explorer
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Filter by our precise menu taxonomy or enter a key term to search all delicacies.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-xs">
                  {/* Category Pill Sliders */}
                  <div className="flex overflow-x-auto gap-2 max-w-full pb-2 md:pb-0 scrollbar-none">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                          selectedCategory === cat
                            ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/10'
                            : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 border border-zinc-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search input */}
                  <div className="relative w-full md:w-72">
                    <input
                      type="text"
                      placeholder="Search dishes..."
                      value={menuSearchTerm}
                      onChange={(e) => setMenuSearchTerm(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-4 text-xs text-zinc-800 placeholder-zinc-400 focus:border-amber-500 focus:outline-none shadow-xs"
                    />
                    <Search className="absolute top-3 left-3 h-4 w-4 text-zinc-400" />
                  </div>
                </div>
              </div>

              {/* Render items categorized or flat */}
              {categories.filter(cat => cat !== 'All').map((cat) => {
                // If specific category is chosen, only render that one
                if (selectedCategory !== 'All' && selectedCategory !== cat) return null;

                const catItems = menuItems.filter(item => {
                  const matchesCategory = item.category === cat;
                  const matchesSearch = item.name.toLowerCase().includes(menuSearchTerm.toLowerCase()) || item.description.toLowerCase().includes(menuSearchTerm.toLowerCase());
                  return matchesCategory && matchesSearch;
                });

                if (catItems.length === 0) return null;

                return (
                  <div key={cat} className="space-y-4">
                    <h3 className="font-sans text-base font-bold text-amber-600 border-l-2 border-amber-500 pl-3 uppercase tracking-wider font-mono">
                      {cat}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {catItems.map((item) => (
                        <ProductCard
                          key={item.id}
                          item={item}
                          isWishlisted={wishlist.some(w => w.id === item.id)}
                          onToggleWishlist={handleToggleWishlist}
                          onReserveImmediate={handleReserveImmediate}
                          taxRate={settings.taxRate}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* No items matching filters warning */}
              {menuItems.filter(item => {
                const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
                const matchesSearch = item.name.toLowerCase().includes(menuSearchTerm.toLowerCase()) || item.description.toLowerCase().includes(menuSearchTerm.toLowerCase());
                return matchesCategory && matchesSearch;
              }).length === 0 && (
                <div className="text-center py-16 text-zinc-500 text-sm">
                  No culinary curated items matched your search query or filters.
                </div>
              )}

            </motion.div>
          )}

          {/* TAB: TABLE RESERVATION */}
          {activeTab === 'reservation' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              key="reservation-view"
            >
              <ReservationPage
                selectedItems={checkoutPayload}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveCheckoutItem}
                taxRate={settings.taxRate}
                whatsAppNumber={settings.whatsAppNumber}
                onBookingComplete={handleBookingComplete}
                onNavigateToMenu={() => setActiveTab('menu')}
                onClose={() => setActiveTab('home')}
              />
            </motion.div>
          )}

          {/* TAB: CONTACT US */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              key="contact-view"
            >
              <ContactPage
                whatsAppNumber={settings.whatsAppNumber}
                storeAddress={settings.storeAddress}
              />
            </motion.div>
          )}

          {/* TAB: SECURE ADMIN WORKSPACE */}
          {activeTab === 'admin' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              key="admin-view"
            >
              <AdminPortal
                menuItems={menuItems}
                onUpdateMenu={setMenuItems}
                campaigns={campaigns}
                onUpdateCampaigns={setCampaigns}
                settings={settings}
                onUpdateSettings={setSettings}
                reservations={reservations}
                onUpdateReservations={setReservations}
                categoriesList={categoriesList}
                onUpdateCategories={setCategoriesList}
                onClose={() => setActiveTab('home')}
              />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Location Section */}
        <section id="about-location" className="mt-20 border-t border-zinc-200 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-amber-600" />
              Visit The Bar Bears Multan
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              We are situated in Multan's vibrant culinary epicenter. Drop in for exceptional coffee curation, signature smashed burgers, or flame-kissed dry-aged undercut beef steaks.
            </p>

            <div className="space-y-3 text-xs text-zinc-700">
              <div className="flex items-center gap-3">
                <MapPin className="h-4.5 w-4.5 text-amber-600" />
                <span>{settings.storeAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4.5 w-4.5 text-amber-600" />
                <span>Open Daily: 12:00 PM – 2:00 AM (Punjab Curation Hours)</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall className="h-4.5 w-4.5 text-amber-600" />
                <span>WhatsApp Desk Support: +{settings.whatsAppNumber}</span>
              </div>
            </div>
          </div>

          {/* Simulated Premium Map Frame */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 h-64 flex flex-col justify-between overflow-hidden relative group shadow-xs">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100/50" />
            
            {/* Visual Abstract Map Layout Grid */}
            <div className="absolute inset-0 opacity-20 flex flex-wrap gap-2 p-2 pointer-events-none">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="h-8 w-14 border border-zinc-200 rounded" />
              ))}
            </div>

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 text-lg font-bold mb-3 animate-pulse">
                📍
              </div>
              <span className="font-sans text-sm font-bold text-zinc-900 uppercase tracking-wider">Gulgasht Sector Map</span>
              <p className="text-[10px] text-zinc-500 mt-1 max-w-xs">
                The Bar Bears, Main Boulevard Road adjacent to fine dining hubs, Multan.
              </p>
            </div>

            <div className="relative z-10 flex justify-between items-center bg-white/95 backdrop-blur border border-zinc-200 p-3 rounded-xl mt-auto shadow-xs">
              <span className="text-[10px] font-mono text-zinc-500">Multan Coordinates: 30.1575° N, 71.5249° E</span>
              <button
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(settings.storeAddress)}`, '_blank')}
                className="text-[10px] font-bold text-amber-600 uppercase hover:underline"
              >
                Directions ➔
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Aesthetic Footer */}
      <footer className="mt-24 border-t border-zinc-200 bg-white py-12 text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-zinc-700">The Bar Bears Multan</span>
            <span className="text-zinc-300">|</span>
            <span className="text-xs">Premium Food Curation & Table Reservation Platform</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#admin-secure-portal" onClick={() => setActiveTab('admin')} className="hover:text-amber-600 transition font-semibold">
              Admin Workspace Entry
            </a>
            <span className="text-zinc-200">|</span>
            <span className="font-mono text-[10px]">© 2026 The Bar Bears Multan Co. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Wishlist Drawer Overlay Slider */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onClearWishlist={handleClearWishlist}
        onTriggerCheckout={handleReserveWishlist}
      />

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Search,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Settings,
  Grid,
  FileText,
  TrendingUp,
  Percent,
  ToggleLeft,
  CalendarCheck,
  Award,
  Eye,
  AlertTriangle,
  BadgeCheck,
  RefreshCw,
  LogOut,
  FolderOpen,
  Tag
} from 'lucide-react';
import { MenuItem, Campaign, AdminSettings, Reservation, SEOMeta } from '../types';

interface AdminPortalProps {
  menuItems: MenuItem[];
  onUpdateMenu: (updated: MenuItem[]) => void;
  campaigns: Campaign[];
  onUpdateCampaigns: (updated: Campaign[]) => void;
  settings: AdminSettings;
  onUpdateSettings: (updated: AdminSettings) => void;
  reservations: Reservation[];
  onUpdateReservations: (updated: Reservation[]) => void;
  categoriesList: string[];
  onUpdateCategories: (updated: string[]) => void;
  onClose: () => void;
}

export default function AdminPortal({
  menuItems,
  onUpdateMenu,
  campaigns,
  onUpdateCampaigns,
  settings,
  onUpdateSettings,
  reservations,
  onUpdateReservations,
  categoriesList,
  onUpdateCategories,
  onClose,
}: AdminPortalProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab Selection
  const [activeTab, setActiveTab] = useState<'inventory' | 'categories' | 'seo' | 'campaigns' | 'reservations' | 'settings'>('inventory');

  // Category management state
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  // Search/Filters in Inventory
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // CRUD State
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form State for Adding/Editing Item
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Appetizers');
  const [formPrice, setFormPrice] = useState(1000);
  const [formIsSignature, setFormIsSignature] = useState(false);
  const [formDescription, setFormDescription] = useState('');

  // Rank Math SEO Form Block
  const [formSeoTitle, setFormSeoTitle] = useState('');
  const [formSeoDesc, setFormSeoDesc] = useState('');
  const [formSeoFocusKeyword, setFormSeoFocusKeyword] = useState('');
  const [formSeoTags, setFormSeoTags] = useState('');

  // Page level SEO
  const [homeSeo, setHomeSeo] = useState<SEOMeta>({
    seoTitle: "The Bar Bears Multan | Premium Dining & Cafe Concept",
    metaDescription: "Multan's premier dining and food curation destination.",
    focusKeyword: "The Bar Bears Multan",
    keywords: "The Bar Bears, Multan cafe"
  });

  // Unique categories list
  const categories = categoriesList;

  // Try checking existing login from session storage
  useEffect(() => {
    const adminSession = sessionStorage.getItem('tbb_admin_authenticated');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }

    const savedHomeSeo = localStorage.getItem('tbb_home_seo');
    if (savedHomeSeo) {
      setHomeSeo(JSON.parse(savedHomeSeo));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'bears_multan_2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('tbb_admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect username or password. Please try again.');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tbb_admin_authenticated');
  };

  // SEO Rank Math Scorer logic
  const calculateSeoScore = (title: string, desc: string, focusKeyword: string, bodyText: string): number => {
    if (!focusKeyword) return 0;
    let score = 0;
    const kw = focusKeyword.toLowerCase();

    // 1. Focus Keyword in Title
    if (title.toLowerCase().includes(kw)) {
      score += 30;
    }
    // 2. Focus Keyword in Meta Description
    if (desc.toLowerCase().includes(kw)) {
      score += 30;
    }
    // 3. Focus Keyword in Product Description / Body Text
    if (bodyText.toLowerCase().includes(kw)) {
      score += 30;
    }
    // 4. Length scoring
    if (title.length >= 45 && title.length <= 60) {
      score += 5;
    }
    if (desc.length >= 110 && desc.length <= 160) {
      score += 5;
    }
    return score;
  };

  // Open item editor
  const handleStartEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormPrice(item.price_pkr);
    setFormIsSignature(item.is_signature);
    setFormDescription(item.description);

    setFormSeoTitle(item.seo?.seoTitle || `${item.name} | The Bar Bears Multan`);
    setFormSeoDesc(item.seo?.metaDescription || item.description);
    setFormSeoFocusKeyword(item.seo?.focusKeyword || item.name);
    setFormSeoTags(item.seo?.keywords || item.category);
    setIsAddingItem(true);
  };

  const handleStartAdd = () => {
    setEditingItem(null);
    setFormName('');
    setFormCategory(categories[0] || 'Appetizers');
    setFormPrice(1000);
    setFormIsSignature(false);
    setFormDescription('');

    setFormSeoTitle('');
    setFormSeoDesc('');
    setFormSeoFocusKeyword('');
    setFormSeoTags('');
    setIsAddingItem(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();

    const seoBlock: SEOMeta = {
      seoTitle: formSeoTitle || `${formName} | The Bar Bears Multan`,
      metaDescription: formSeoDesc || formDescription,
      focusKeyword: formSeoFocusKeyword || formName,
      keywords: formSeoTags || formCategory,
    };

    if (editingItem) {
      // Edit
      const updatedList = menuItems.map(item => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            name: formName,
            category: formCategory,
            price_pkr: formPrice,
            is_signature: formIsSignature,
            description: formDescription,
            seo: seoBlock
          };
        }
        return item;
      });
      onUpdateMenu(updatedList);
    } else {
      // Add
      const newId = `${formCategory.toLowerCase().substring(0, 3)}-${Date.now().toString().slice(-4)}`;
      const newItem: MenuItem = {
        id: newId,
        name: formName,
        category: formCategory,
        price_pkr: formPrice,
        is_signature: formIsSignature,
        description: formDescription,
        seo: seoBlock,
        isActive: true,
      };
      onUpdateMenu([...menuItems, newItem]);
    }

    setIsAddingItem(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this culinary item?')) {
      const filtered = menuItems.filter(item => item.id !== id);
      onUpdateMenu(filtered);
    }
  };

  // Campaigns Toggles
  const handleToggleCampaign = (id: string) => {
    const updated = campaigns.map(camp => {
      if (camp.id === id) {
        return { ...camp, isActive: !camp.isActive };
      }
      return camp;
    });
    onUpdateCampaigns(updated);
  };

  // Save Settings
  const handleUpdateTaxAndModifier = (updatedSettings: AdminSettings) => {
    onUpdateSettings(updatedSettings);
  };

  const handleSaveHomeSeo = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('tbb_home_seo', JSON.stringify(homeSeo));
    alert('Home SEO Metadata successfully synchronized with index.html tags.');
  };

  // Update Reservation status
  const handleUpdateReservationStatus = (id: string, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    const updated = reservations.map(r => {
      if (r.id === id) {
        return { ...r, status: newStatus };
      }
      return r;
    });
    onUpdateReservations(updated);
  };

  // Category management functions
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newCategoryName.trim();
    if (!name) return;
    if (categoriesList.includes(name)) {
      alert('This category already exists.');
      return;
    }
    onUpdateCategories([...categoriesList, name]);
    setNewCategoryName('');
  };

  const handleRenameCategory = (index: number) => {
    const oldName = categoriesList[index];
    const newName = editingCategoryName.trim();
    if (!newName) return;
    if (categoriesList.includes(newName) && newName !== oldName) {
      alert('A category with this name already exists.');
      return;
    }

    // Update categoriesList state
    const updatedCategories = [...categoriesList];
    updatedCategories[index] = newName;
    onUpdateCategories(updatedCategories);

    // Update category of any matching items in menu items
    const updatedMenuItems = menuItems.map(item => {
      if (item.category === oldName) {
        return { ...item, category: newName };
      }
      return item;
    });
    onUpdateMenu(updatedMenuItems);

    setEditingCategoryIndex(null);
    setEditingCategoryName('');
  };

  const handleDeleteCategory = (catName: string) => {
    const count = menuItems.filter(item => item.category === catName).length;
    if (count > 0) {
      if (!confirm(`Warning: There are ${count} items in the "${catName}" category. If you delete this category, those items will be reassigned to the first available category. Proceed?`)) {
        return;
      }
    } else {
      if (!confirm(`Are you sure you want to delete the category "${catName}"?`)) {
        return;
      }
    }

    // Remove category from list
    const updatedCategories = categoriesList.filter(c => c !== catName);
    onUpdateCategories(updatedCategories);

    // Reassign items to the first available category, or 'General' if list is empty
    const fallbackCat = updatedCategories[0] || 'General';
    if (!updatedCategories.includes('General') && updatedCategories.length === 0) {
      updatedCategories.push('General');
      onUpdateCategories(updatedCategories);
    }

    const updatedMenuItems = menuItems.map(item => {
      if (item.category === catName) {
        return { ...item, category: fallbackCat };
      }
      return item;
    });
    onUpdateMenu(updatedMenuItems);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const activeSeoScore = calculateSeoScore(formSeoTitle, formSeoDesc, formSeoFocusKeyword, formDescription);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 shadow-2xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 border border-amber-200">
          <Lock className="h-6 w-6" />
        </div>
        
        <h2 className="font-sans text-xl font-bold tracking-tight text-zinc-900">
          Admin Secure Portal
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          The Bar Bears Multan – Consolidated Management Engine. Enter credentials to manage inventory and on-page SEO.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600">Username</label>
            <input
              type="text"
              required
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
            />
          </div>

          {authError && (
            <p className="text-xs text-red-500 font-semibold mt-1">
              {authError}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition shadow-md shadow-amber-500/10"
            >
              Sign In to Dashboard
            </button>
          </div>
        </form>

        <div className="mt-6 border-t border-zinc-200 pt-4 text-[10px] text-zinc-400 font-mono">
          DEFAULT DEV PASSWORD: bears_multan_2026
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl relative text-zinc-800">
      
      {/* Header with Exit controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 pb-5 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="font-sans text-xl font-bold tracking-tight text-zinc-900">
              The Bar Bears Concierge Dashboard
            </h2>
          </div>
          <p className="text-xs text-zinc-500">
            Logged in as Chief Curator (Administrator). Manage items, localized Punjab Dining Tax, active campaign sliders, and SEO Meta fields.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-600 hover:text-rose-600 hover:border-rose-200 transition font-medium shadow-xs"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-amber-400 transition shadow-md shadow-amber-500/10"
          >
            Exit Dashboard
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-zinc-200 mb-6 pb-0.5 gap-2 scrollbar-none">
        {[
          { id: 'inventory', label: 'Inventory (Menu SKU)', icon: Grid },
          { id: 'categories', label: 'Product Categories', icon: Tag },
          { id: 'reservations', label: `Table Reservations (${reservations.length})`, icon: CalendarCheck },
          { id: 'seo', label: 'Rank Math On-Page SEO', icon: FileText },
          { id: 'campaigns', label: 'Special Campaigns', icon: Award },
          { id: 'settings', label: 'Global Parameters', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setIsAddingItem(false);
                setEditingItem(null);
              }}
              className={`flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition border-b-2 -mb-0.5 ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-600 bg-amber-500/5'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Workspace Panels */}
      <AnimatePresence mode="wait">
        
        {/* Tab 1: Inventory */}
        {activeTab === 'inventory' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="inventory-panel"
            className="space-y-6"
          >
            {isAddingItem ? (
              // Add / Edit Item Form
              <form onSubmit={handleSaveItem} className="border border-zinc-200 bg-zinc-50/50 rounded-2xl p-5 md:p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-200 pb-4">
                  <h3 className="font-sans text-base font-bold text-zinc-900">
                    {editingItem ? `Edit SKU Details (${editingItem.id})` : 'Catalog New Gourmet Item'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingItem(false);
                      setEditingItem(null);
                    }}
                    className="p-1.5 text-zinc-600 hover:text-zinc-900 rounded bg-zinc-100 border border-zinc-200 text-xs transition"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Item fields */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest border-b border-zinc-200 pb-1">
                      Basic Parameters
                    </h4>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-600">Culinary Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-zinc-600">Category Taxonomy</label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                        >
                          {categoriesList.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-zinc-600">Base Price (PKR)</label>
                        <input
                          type="number"
                          required
                          value={formPrice}
                          onChange={(e) => setFormPrice(Number(e.target.value))}
                          className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none font-mono shadow-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-600 block">Status Badging</label>
                      <label className="inline-flex items-center gap-2 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={formIsSignature}
                          onChange={(e) => setFormIsSignature(e.target.checked)}
                          className="rounded border-zinc-300 bg-white text-amber-500 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                        />
                        <span className="text-xs text-zinc-700 font-medium">Mark as Signature Culinary Special (slider / glowing badges)</span>
                      </label>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-600">Culinary Ingredients / Description</label>
                      <textarea
                        rows={3}
                        required
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                        placeholder="Premium curated beef, sautéed onions..."
                      />
                    </div>
                  </div>

                  {/* Isolated Rank Math SEO Meta Block */}
                  <div className="space-y-4 border-l border-zinc-200 pl-0 md:pl-6">
                    <div className="flex justify-between items-center border-b border-zinc-200 pb-1">
                      <h4 className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
                        Rank Math SEO Block
                      </h4>
                      
                      {/* SEO Score Visual Indicator */}
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        activeSeoScore >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        activeSeoScore >= 50 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        Score: {activeSeoScore}/100
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <label className="text-xs font-semibold text-zinc-600">SEO Meta Title</label>
                        <span className="text-[10px] text-zinc-400 font-mono">{formSeoTitle.length} chars (Target: 50-60)</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Item Name | Gourmet Food Multan"
                        value={formSeoTitle}
                        onChange={(e) => setFormSeoTitle(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                      />
                      <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full transition-all duration-300 ${
                            formSeoTitle.length >= 45 && formSeoTitle.length <= 65 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(100, (formSeoTitle.length / 70) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <label className="text-xs font-semibold text-zinc-600">SEO Meta Description</label>
                        <span className="text-[10px] text-zinc-400 font-mono">{formSeoDesc.length} chars (Target: 120-160)</span>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="A delicious description representing on-page SEO searches..."
                        value={formSeoDesc}
                        onChange={(e) => setFormSeoDesc(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                      />
                      <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full transition-all duration-300 ${
                            formSeoDesc.length >= 110 && formSeoDesc.length <= 165 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(100, (formSeoDesc.length / 180) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-zinc-600">Focus Keyword</label>
                        <input
                          type="text"
                          placeholder="e.g. Smashed Beef"
                          value={formSeoFocusKeyword}
                          onChange={(e) => setFormSeoFocusKeyword(e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-zinc-600">Metadata Keywords/Tags</label>
                        <input
                          type="text"
                          placeholder="beef, burger, multan"
                          value={formSeoTags}
                          onChange={(e) => setFormSeoTags(e.target.value)}
                          className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                        />
                      </div>
                    </div>

                    {/* On-Page Checklist */}
                    <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200 space-y-1 text-[11px] text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        {formSeoTitle.toLowerCase().includes(formSeoFocusKeyword.toLowerCase()) && formSeoFocusKeyword ? (
                          <BadgeCheck className="h-3.5 w-3.5 text-emerald-600 fill-emerald-500/10" />
                        ) : (
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        )}
                        <span>Focus keyword in SEO Title</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {formSeoDesc.toLowerCase().includes(formSeoFocusKeyword.toLowerCase()) && formSeoFocusKeyword ? (
                          <BadgeCheck className="h-3.5 w-3.5 text-emerald-600 fill-emerald-500/10" />
                        ) : (
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        )}
                        <span>Focus keyword in Meta Description</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {formDescription.toLowerCase().includes(formSeoFocusKeyword.toLowerCase()) && formSeoFocusKeyword ? (
                          <BadgeCheck className="h-3.5 w-3.5 text-emerald-600 fill-emerald-500/10" />
                        ) : (
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        )}
                        <span>Focus keyword found in main ingredients</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingItem(false);
                      setEditingItem(null);
                    }}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-500 px-6 py-2 text-xs font-bold text-black hover:bg-amber-400 transition shadow-md shadow-amber-500/10"
                  >
                    Commit SKU to Database
                  </button>
                </div>
              </form>
            ) : (
              // Search Filter & Grid/Table
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex flex-1 gap-2 w-full max-w-lg">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search menu catalogue..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-10 pr-4 text-xs text-zinc-700 placeholder-zinc-400 focus:border-amber-500 focus:outline-none shadow-xs"
                      />
                      <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
                    </div>

                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="rounded-xl border border-zinc-200 bg-white py-2 px-3 text-xs text-zinc-600 focus:border-amber-500 focus:outline-none shadow-xs"
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleStartAdd}
                    className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition w-full md:w-auto justify-center shadow-md shadow-amber-500/10"
                  >
                    <Plus className="h-4 w-4" />
                    Add Culinary SKU
                  </button>
                </div>

                {/* SKU Table View */}
                <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-200 bg-zinc-50 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        <th className="py-3 px-4">SKU ID</th>
                        <th className="py-3 px-4">Dishes Name</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4 font-mono text-right">Base Price</th>
                        <th className="py-3 px-4 text-center">Type</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-xs">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-zinc-50/50 transition group">
                          <td className="py-3.5 px-4 font-mono text-amber-600 font-semibold">{item.id}</td>
                          <td className="py-3.5 px-4">
                            <div>
                              <span className="font-bold text-zinc-900">{item.name}</span>
                              <p className="text-[10px] text-zinc-500 truncate max-w-xs">{item.description}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-zinc-600">{item.category}</td>
                          <td className="py-3.5 px-4 font-mono text-right text-zinc-800 font-bold">
                            PKR {item.price_pkr.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {item.is_signature ? (
                              <span className="rounded-full bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 text-[9px] font-bold">
                                SIGNATURE
                              </span>
                            ) : (
                              <span className="text-zinc-400 text-[10px]">-</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex justify-center items-center gap-1">
                              <button
                                onClick={() => handleStartEdit(item)}
                                className="p-1.5 text-zinc-500 hover:text-amber-600 hover:bg-zinc-100 rounded transition"
                                title="Edit SKU"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="p-1.5 text-zinc-500 hover:text-red-500 hover:bg-zinc-100 rounded transition"
                                title="Delete SKU"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredItems.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-zinc-500">
                            No menu SKU entries found matching filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Tab: Categories */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="categories-panel"
            className="space-y-6"
          >
            <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5 flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="font-sans text-sm font-bold text-zinc-900 mb-1">Product Category Taxonomy</h3>
                <p className="text-xs text-zinc-500">
                  Manage core dining categories. Reorder, add, rename, or delete category sections. Renaming a category automatically re-aligns associated menu items!
                </p>
              </div>
              <div className="text-xs font-mono bg-amber-50 border border-amber-200 text-amber-700 font-bold px-3 py-1.5 rounded-xl">
                Total Sections: {categoriesList.length}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form: Add Category Section */}
              <form onSubmit={handleAddCategory} className="lg:col-span-4 border border-zinc-200 bg-zinc-50/50 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest border-b border-zinc-200 pb-2">
                  Create New Section
                </h4>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-600">Category Name</label>
                  <input
                    type="text"
                    required
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                    placeholder="e.g., Ice Creams"
                  />
                  <p className="text-[10px] text-zinc-400">
                    Use clear, descriptive singular/plural nouns for navigation tags (e.g. "Beverages", "Desserts").
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                >
                  <Plus className="h-4 w-4" />
                  Add Category
                </button>
              </form>

              {/* Grid List of Current Categories */}
              <div className="lg:col-span-8 space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest pb-1 border-b border-zinc-200">
                  Active Product Categories
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categoriesList.map((cat, index) => {
                    const itemCount = menuItems.filter(item => item.category === cat).length;
                    const isEditing = editingCategoryIndex === index;

                    return (
                      <div
                        key={cat + index}
                        className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 flex flex-col justify-between gap-3 hover:border-zinc-300 transition shadow-xs"
                      >
                        <div className="flex justify-between items-start gap-2">
                          {isEditing ? (
                            <div className="flex-1 flex gap-2">
                              <input
                                type="text"
                                required
                                value={editingCategoryName}
                                onChange={(e) => setEditingCategoryName(e.target.value)}
                                className="w-full rounded-lg border border-zinc-200 bg-white py-1 px-2.5 text-xs text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                              />
                              <button
                                type="button"
                                onClick={() => handleRenameCategory(index)}
                                className="p-1 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition"
                                title="Save changes"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingCategoryIndex(null)}
                                className="p-1 rounded bg-zinc-100 text-zinc-500 border border-zinc-200 hover:bg-zinc-200 transition"
                                title="Cancel editing"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex-1">
                              <span className="font-sans font-bold text-sm text-zinc-900 block">{cat}</span>
                              <span className="text-[10px] font-mono text-zinc-400">
                                {itemCount} active product SKU{itemCount !== 1 ? 's' : ''}
                              </span>
                            </div>
                          )}

                          {!isEditing && (
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCategoryIndex(index);
                                  setEditingCategoryName(cat);
                                }}
                                className="p-1 text-zinc-400 hover:text-amber-600 hover:bg-zinc-100 rounded transition"
                                title="Rename Category"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCategory(cat)}
                                className="p-1 text-zinc-400 hover:text-red-500 hover:bg-zinc-100 rounded transition"
                                title="Delete Category"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Reservations history */}
        {activeTab === 'reservations' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="reservations-panel"
            className="space-y-6"
          >
            <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5">
              <h3 className="font-sans text-sm font-bold text-zinc-900 mb-2">Historical Booking Log</h3>
              <p className="text-xs text-zinc-500">
                Track guest lists, date ranges, and meal arrays compiled inside the conversion funnel. Toggle validation gates manually to sync table slots.
              </p>
            </div>

            <div className="space-y-4">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-start shadow-xs"
                >
                  {/* Reservation details */}
                  <div className="md:col-span-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-amber-600 font-bold">{res.id}</span>
                      <select
                        value={res.status}
                        onChange={(e) => handleUpdateReservationStatus(res.id, e.target.value as any)}
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          res.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          res.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        } focus:outline-none`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="text-sm font-bold text-zinc-900">{res.customerName}</div>
                    
                    <div className="space-y-1 text-xs text-zinc-600 font-mono">
                      <p>Phone: {res.phone}</p>
                      <p>Date: {res.date}</p>
                      <p>Slot: {res.timeSlot}</p>
                      <p>Guests: {res.guests} Persons</p>
                    </div>
                  </div>

                  {/* Orders selection */}
                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-zinc-200 pt-4 md:pt-0 md:pl-6 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                      Ordered Dishes
                    </span>
                    <div className="space-y-1 text-xs text-zinc-600">
                      {res.items.map((it, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{it.name} x{it.quantity}</span>
                          <span className="font-mono text-zinc-400 font-medium">PKR {(it.price_pkr * it.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financials & Syncer */}
                  <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-zinc-200 pt-4 md:pt-0 md:pl-6 text-right space-y-4">
                    <div>
                      <span className="text-[10px] text-zinc-400 font-mono block">Grand Payable Total</span>
                      <span className="font-mono text-base font-bold text-zinc-900">
                        PKR {Math.round(res.finalPrice).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono block">Incl. {settings.taxRate}% local tax</span>
                    </div>

                    <button
                      onClick={() => {
                        // Quick confirmation sync message
                        const confirmMsg = `🐻 *The Bar Bears Multan - Table Confirmed* 🐻\n\n` +
                          `Hey *${res.customerName}*,\n` +
                          `Your table reservation *${res.id}* on *${res.date}* (${res.timeSlot}) has been *officially locked and verified*!\n\n` +
                          `We have allocated our premier dining sector for you and your ${res.guests} guests. See you soon!`;
                        window.open(`https://api.whatsapp.com/send?phone=${res.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(confirmMsg)}`, '_blank');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600 hover:bg-zinc-200 hover:text-amber-600 transition shadow-xs"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Sync WhatsApp Confirm
                    </button>
                  </div>
                </div>
              ))}

              {reservations.length === 0 && (
                <div className="py-12 border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50 text-center text-zinc-500 text-xs">
                  No reservations logged in this session yet. Build bookings in client view to test.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Rank Math Page SEO */}
        {activeTab === 'seo' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="seo-panel"
            className="space-y-6"
          >
            <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5">
              <h3 className="font-sans text-sm font-bold text-zinc-900 mb-2">Google Page Search Engine Optimization (Rank Math Analogue)</h3>
              <p className="text-xs text-zinc-500">
                Optimize the global landing configurations. Adjust the page header titles and meta definitions to command Google's Multan Dining index brackets.
              </p>
            </div>

            <form onSubmit={handleSaveHomeSeo} className="border border-zinc-200 rounded-2xl bg-zinc-50/50 p-6 space-y-6 max-w-3xl">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 border-b border-zinc-200 pb-1">
                Main Portal On-Page SEO
              </h4>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold text-zinc-600">Global Website HTML Title</label>
                  <span className="text-[10px] text-zinc-400 font-mono">{homeSeo.seoTitle.length} chars (Target: 50-60)</span>
                </div>
                <input
                  type="text"
                  required
                  value={homeSeo.seoTitle}
                  onChange={(e) => setHomeSeo({ ...homeSeo, seoTitle: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                />
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full transition-all duration-300 ${
                      homeSeo.seoTitle.length >= 45 && homeSeo.seoTitle.length <= 65 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, (homeSeo.seoTitle.length / 70) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold text-zinc-600">Global Meta Description</label>
                  <span className="text-[10px] text-zinc-400 font-mono">{homeSeo.metaDescription.length} chars (Target: 120-160)</span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={homeSeo.metaDescription}
                  onChange={(e) => setHomeSeo({ ...homeSeo, metaDescription: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                />
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full transition-all duration-300 ${
                      homeSeo.metaDescription.length >= 115 && homeSeo.metaDescription.length <= 165 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, (homeSeo.metaDescription.length / 180) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-600">Focus Keyword Focus</label>
                  <input
                    type="text"
                    required
                    value={homeSeo.focusKeyword}
                    onChange={(e) => setHomeSeo({ ...homeSeo, focusKeyword: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-600">Comma-separated Keyword Tags</label>
                  <input
                    type="text"
                    required
                    value={homeSeo.keywords}
                    onChange={(e) => setHomeSeo({ ...homeSeo, keywords: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                  />
                </div>
              </div>

              {/* Instant Search Snippet Preview */}
              <div className="rounded-xl bg-white border border-zinc-200 p-4 space-y-2 shadow-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Google Search Result Snippet</span>
                <span className="text-blue-600 hover:underline cursor-pointer font-sans text-sm font-semibold block truncate">
                  {homeSeo.seoTitle || "The Bar Bears Multan"}
                </span>
                <span className="text-emerald-700 text-xs block truncate font-mono">
                  https://thebarbearsmultan.com/
                </span>
                <p className="text-zinc-600 text-xs line-clamp-2">
                  {homeSeo.metaDescription || "Insert your meta description configuration above."}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-black hover:bg-amber-400 transition shadow-md shadow-amber-500/10"
                >
                  Commit Global SEO Headers
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Tab 4: Special Campaigns */}
        {activeTab === 'campaigns' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="campaigns-panel"
            className="space-y-6"
          >
            <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5">
              <h3 className="font-sans text-sm font-bold text-zinc-900 mb-2">Gourmet Promotional Campaign Sliders</h3>
              <p className="text-xs text-zinc-500">
                Instantly toggle global active states for custom campaigns. Enabling campaigns injects an elegant promotional discount banner directly on the client's home dashboard view.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className={`rounded-2xl border p-5 transition flex flex-col justify-between h-56 ${
                    camp.isActive
                      ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                      : 'border-zinc-200 bg-zinc-50/50 hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="rounded bg-zinc-100 border border-zinc-200 px-2 py-0.5 text-[9px] font-mono text-zinc-600">
                        CAMPAIGN CODE: {camp.code}
                      </span>

                      <button
                        onClick={() => handleToggleCampaign(camp.id)}
                        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                          camp.isActive ? 'bg-amber-500' : 'bg-zinc-200'
                        }`}
                      >
                        <div
                          className={`h-5 w-5 rounded-full bg-white transition-transform ${
                            camp.isActive ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <h4 className="font-sans text-lg font-bold text-zinc-900 mt-4">{camp.name}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{camp.description}</p>
                  </div>

                  <div className="flex justify-between items-baseline border-t border-zinc-200 pt-3 mt-4">
                    <span className="text-[10px] text-zinc-400 font-mono">DISCOUNT INTENSITY</span>
                    <span className="font-mono text-lg font-bold text-amber-600">{camp.discountPercentage}% OFF</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 5: Global Store Parameters */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="settings-panel"
            className="space-y-6"
          >
            <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5">
              <h3 className="font-sans text-sm font-bold text-zinc-900 mb-2">Global Management Parameters</h3>
              <p className="text-xs text-zinc-500">
                Adjust individual numeric tax levels or configure general routing parameters like target reception phones to map customer requests instantly.
              </p>
            </div>

            <div className="border border-zinc-200 rounded-2xl bg-zinc-50/50 p-6 space-y-6 max-w-2xl">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 border-b border-zinc-200 pb-1">
                Core Constants Configuration
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-600"> पंजाब Dining Tax Rate (%)</label>
                  <input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleUpdateTaxAndModifier({ ...settings, taxRate: Number(e.target.value) })}
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none font-mono shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-600">Concierge WhatsApp Number</label>
                  <input
                    type="text"
                    value={settings.whatsAppNumber}
                    onChange={(e) => handleUpdateTaxAndModifier({ ...settings, whatsAppNumber: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none font-mono shadow-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600">Eatery Location Address</label>
                <input
                  type="text"
                  value={settings.storeAddress}
                  onChange={(e) => handleUpdateTaxAndModifier({ ...settings, storeAddress: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none shadow-xs"
                />
              </div>

              {/* Dynamic Price Increase Simulation multiplier */}
              <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-xs font-bold text-zinc-800">Global Base Price Modifier</h5>
                    <p className="text-[10px] text-zinc-500">Scale base menu costs uniformly using a global multiplier slider.</p>
                  </div>
                  <span className="font-mono text-sm font-bold text-amber-600">
                    x{settings.basePriceModifier.toFixed(2)}
                  </span>
                </div>

                <input
                  type="range"
                  min="0.8"
                  max="1.5"
                  step="0.05"
                  value={settings.basePriceModifier}
                  onChange={(e) => handleUpdateTaxAndModifier({ ...settings, basePriceModifier: Number(e.target.value) })}
                  className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>x0.8 (20% Discount)</span>
                  <span>x1.0 (Standard)</span>
                  <span>x1.5 (50% Increase)</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 text-[11px] text-zinc-600 flex items-start gap-2">
                <BadgeCheck className="h-4.5 w-4.5 text-amber-600 flex-shrink-0" />
                <span>
                  Adjusting variables instantly changes product-card totals and calculates पंजाब dining taxation formulas on the reservation payload checkout correctly. No manual refreshes required.
                </span>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

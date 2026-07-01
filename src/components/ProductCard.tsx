/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Calendar, Utensils, Zap } from 'lucide-react';
import { MenuItem } from '../types';

interface ProductCardProps {
  key?: string | number;
  item: MenuItem;
  isWishlisted: boolean;
  onToggleWishlist: (item: MenuItem) => void;
  onReserveImmediate: (item: MenuItem) => void;
  taxRate: number;
}

export default function ProductCard({
  item,
  isWishlisted,
  onToggleWishlist,
  onReserveImmediate,
  taxRate,
}: ProductCardProps) {
  const calculatedTax = (item.price_pkr * taxRate) / 100;
  const totalPriceWithTax = item.price_pkr + calculatedTax;

  // Render a lovely background color theme for categories
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'Appetizers':
        return 'from-amber-50 to-orange-50/30 border-amber-200/60';
      case 'Burgers & Sandwiches':
        return 'from-orange-50 to-amber-50/30 border-orange-200/60';
      case 'Wraps':
        return 'from-yellow-50 to-lime-50/30 border-yellow-200/60';
      case 'Chicken Main Course':
        return 'from-rose-50 to-orange-50/30 border-rose-200/60';
      case 'Beef Steaks':
        return 'from-red-50 to-rose-50/30 border-red-200/60';
      case 'Chinese / Rice':
        return 'from-emerald-50 to-teal-50/30 border-emerald-200/60';
      case 'Pasta & Italian':
        return 'from-sky-50 to-indigo-50/30 border-sky-200/60';
      case 'Fish':
        return 'from-blue-50 to-cyan-50/30 border-blue-200/60';
      case 'Beverages':
        return 'from-purple-50 to-fuchsia-50/30 border-purple-200/60';
      default:
        return 'from-zinc-50 to-zinc-100 border-zinc-200/80';
    }
  };

  const isSignature = item.is_signature;

  return (
    <motion.div
      id={`product-card-${item.id}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br p-5 ${
        isSignature
          ? 'border-amber-400 shadow-[0_4px_20px_rgba(212,175,55,0.12)] ring-1 ring-amber-400/20'
          : 'border-zinc-200/80 shadow-xs'
      } ${getCategoryTheme(item.category)}`}
    >
      {/* Signature & Premium Badge */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {isSignature && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-md shadow-amber-500/20 animate-pulse">
            <Star className="h-3 w-3 fill-black" />
            Signature
          </span>
        )}
        <span className="rounded-full bg-white/90 border border-zinc-200 px-2.5 py-1 text-[10px] font-semibold text-zinc-600 shadow-xs">
          {item.category}
        </span>
      </div>

      {/* Wishlist Button */}
      <div className="absolute top-4 right-4 z-10">
        <motion.button
          id={`wishlist-btn-${item.id}`}
          whileTap={{ scale: 0.8 }}
          onClick={() => onToggleWishlist(item)}
          className={`group flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 backdrop-blur-md ${
            isWishlisted
              ? 'bg-rose-600 border-rose-500 text-white shadow-xs'
              : 'bg-white/90 border-zinc-200 text-zinc-400 hover:text-rose-600 hover:border-rose-200 hover:shadow-xs'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110 ${
              isWishlisted ? 'fill-current' : ''
            }`}
          />
        </motion.button>
      </div>

      {/* Visual Placeholder / Icon */}
      <div className="mt-8 mb-4 flex h-36 w-full items-center justify-center rounded-xl bg-white/60 border border-zinc-200/60 relative overflow-hidden shadow-xs">
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 to-transparent opacity-60 pointer-events-none" />
        
        {/* Dynamic visual representations using styled lucide icons */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-3">
          <motion.div
            animate={isSignature ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className={`rounded-2xl p-4 bg-white border shadow-xs ${
              isSignature ? 'border-amber-300 text-amber-600' : 'border-zinc-200 text-zinc-400'
            }`}
          >
            {item.category.includes('Burgers') ? (
              <span className="text-3xl">🍔</span>
            ) : item.category.includes('Steak') ? (
              <span className="text-3xl">🥩</span>
            ) : item.category.includes('Pasta') ? (
              <span className="text-3xl">🍝</span>
            ) : item.category.includes('Chinese') || item.category.includes('Noodles') ? (
              <span className="text-3xl">🥢</span>
            ) : item.category.includes('Beverage') ? (
              <span className="text-3xl">🥤</span>
            ) : item.category.includes('Soup') ? (
              <span className="text-3xl">🥣</span>
            ) : item.category.includes('Salads') ? (
              <span className="text-3xl">🥗</span>
            ) : item.category.includes('Wraps') ? (
              <span className="text-3xl">🌯</span>
            ) : item.category.includes('Fish') ? (
              <span className="text-3xl">🐟</span>
            ) : (
              <span className="text-3xl">🍗</span>
            )}
          </motion.div>
          
          <span className="mt-3 text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
            {item.id}
          </span>
        </div>
      </div>

      {/* Content Block */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-sans text-lg font-bold tracking-tight text-zinc-900 leading-snug group-hover:text-amber-600 transition-colors">
            {item.name}
          </h3>
          <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 min-h-[2rem]">
            {item.description}
          </p>
        </div>

        {/* Price & localized Punjab Dining Tax details */}
        <div className="mt-4 border-t border-zinc-200/80 pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-zinc-400 font-mono">Base Price</span>
            <span className="font-mono text-sm text-zinc-700 font-semibold">
              PKR {item.price_pkr.toLocaleString()}
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xs text-zinc-400 font-mono">Incl. Tax ({taxRate}%)</span>
            <span className="font-mono text-base font-bold text-amber-600">
              PKR {Math.round(totalPriceWithTax).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="mt-5">
        <motion.button
          id={`reserve-btn-${item.id}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onReserveImmediate(item)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            isSignature
              ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-md shadow-amber-500/10'
              : 'bg-white text-zinc-800 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-350 shadow-xs'
          }`}
        >
          <Calendar className="h-4 w-4" />
          Reserve a Table ➔
        </motion.button>
      </div>
    </motion.div>
  );
}

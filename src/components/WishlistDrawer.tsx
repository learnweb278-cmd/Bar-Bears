/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, CalendarRange, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: MenuItem[];
  onRemoveFromWishlist: (item: MenuItem) => void;
  onClearWishlist: () => void;
  onTriggerCheckout: () => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onClearWishlist,
  onTriggerCheckout,
}: WishlistDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md flex-col bg-white border-l border-zinc-200 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 p-5">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                <h3 className="font-sans text-lg font-bold text-zinc-900">Your Curation Wishlist</h3>
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 font-mono">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500">
                  <div className="rounded-full bg-zinc-50 p-4 border border-zinc-200 mb-3 text-zinc-400">
                    <Heart className="h-10 w-10" />
                  </div>
                  <h4 className="font-bold text-zinc-700">Wishlist is empty</h4>
                  <p className="text-xs mt-1 max-w-xs text-zinc-500">
                    Browse Multan's finest curated menu items and tap the heart icon to start building your customized reservation.
                  </p>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 hover:border-zinc-300 transition"
                  >
                    {/* Item indicator */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border border-zinc-200">
                      {item.is_signature ? (
                        <span className="text-xl">⭐</span>
                      ) : (
                        <span className="text-xl">🍔</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900 truncate">{item.name}</h4>
                      <p className="text-xs text-zinc-500 truncate">{item.category}</p>
                      <span className="font-mono text-xs text-amber-600 font-bold block mt-1">
                        PKR {item.price_pkr.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveFromWishlist(item)}
                      className="p-1 text-zinc-400 hover:text-red-500 rounded transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer containing checkout CTA */}
            {wishlist.length > 0 && (
              <div className="border-t border-zinc-200 bg-zinc-50 p-5 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Total Wishlist Items</span>
                  <span className="font-mono text-zinc-800 font-bold">{wishlist.length}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onClearWishlist}
                    className="rounded-xl border border-zinc-200 py-2.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 hover:bg-white transition"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onTriggerCheckout();
                    }}
                    className="rounded-xl bg-amber-500 py-2.5 text-xs font-bold uppercase text-black hover:bg-amber-400 transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                  >
                    <CalendarRange className="h-4 w-4" />
                    Reserve Table ➔
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

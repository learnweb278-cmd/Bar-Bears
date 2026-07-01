import React from 'react';
import { CalendarCheck, ArrowRight, Sparkles } from 'lucide-react';
import { MenuItem, Reservation } from '../types';
import BookingForm from './BookingForm';

interface ReservationPageProps {
  selectedItems: { item: MenuItem; quantity: number }[];
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  taxRate: number;
  whatsAppNumber: string;
  onBookingComplete: (newRes: Reservation) => void;
  onNavigateToMenu: () => void;
  onClose: () => void;
}

export default function ReservationPage({
  selectedItems,
  onUpdateQuantity,
  onRemoveItem,
  taxRate,
  whatsAppNumber,
  onBookingComplete,
  onNavigateToMenu,
  onClose,
}: ReservationPageProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Visual Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-200 px-3 py-1 text-xs text-amber-800 font-semibold shadow-xs">
          <CalendarCheck className="h-3.5 w-3.5" />
          Direct Concierge Allocation
        </div>
        <h1 className="font-sans text-3xl md:text-5xl font-black tracking-tight text-zinc-900">
          Table <span className="text-amber-600">Reservation Desk</span>
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 max-w-2xl mx-auto">
          Reserve your dining slot at The Bar Bears Multan. Pre-select signature dishes or simply secure your arrival timing below.
        </p>
      </div>

      {selectedItems.length === 0 && (
        <div className="rounded-2xl border border-amber-200/50 bg-amber-50/40 p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest block flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Enhance Your Experience
            </span>
            <h3 className="font-sans text-sm font-bold text-zinc-900">
              Did you know you can pre-add dishes to your booking?
            </h3>
            <p className="text-xs text-zinc-600">
              Browse our Bar BEARS Menu first, add your favorite steaks or drinks to your wishlist, and check out with them to guarantee availability.
            </p>
          </div>
          <button
            onClick={onNavigateToMenu}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition shadow-xs flex-shrink-0"
          >
            Go to Menu
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Embedded Upgraded BookingForm */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden p-1">
        <BookingForm
          selectedItems={selectedItems}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          taxRate={taxRate}
          whatsAppNumber={whatsAppNumber}
          onClose={onClose}
          onBookingComplete={onBookingComplete}
        />
      </div>
    </div>
  );
}

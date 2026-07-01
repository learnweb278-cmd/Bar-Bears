/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Phone, User, Trash2, CheckCircle2, ChevronRight, Share2, ClipboardCheck, Utensils } from 'lucide-react';
import { MenuItem, Reservation } from '../types';

interface BookingFormProps {
  selectedItems: { item: MenuItem; quantity: number }[];
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  taxRate: number;
  whatsAppNumber: string;
  onClose: () => void;
  onBookingComplete: (newReservation: Reservation) => void;
}

export default function BookingForm({
  selectedItems,
  onUpdateQuantity,
  onRemoveItem,
  taxRate,
  whatsAppNumber,
  onClose,
  onBookingComplete,
}: BookingFormProps) {
  // Contact details
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('Dinner (7:00 PM - 10:00 PM)');
  const [guests, setGuests] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReservation, setSuccessReservation] = useState<Reservation | null>(null);

  // Time Slots
  const slots = [
    'Lunch (12:30 PM - 3:30 PM)',
    'High Tea (4:00 PM - 6:30 PM)',
    'Dinner (7:00 PM - 10:00 PM)',
    'Late Night (10:30 PM - 1:30 AM)',
  ];

  // Totals calculations
  const baseTotal = selectedItems.reduce((acc, current) => acc + (current.item.price_pkr * current.quantity), 0);
  const taxAmount = (baseTotal * taxRate) / 100;
  const grandTotal = baseTotal + taxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert("Please fill in your Name and Contact Number.");
      return;
    }

    setIsSubmitting(true);

    const bookingId = `TBB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      id: bookingId,
      customerName,
      phone,
      date,
      timeSlot,
      guests,
      items: selectedItems.map(p => ({
        id: p.item.id,
        name: p.item.name,
        price_pkr: p.item.price_pkr,
        quantity: p.quantity,
      })),
      totalPrice: baseTotal,
      taxAmount: taxAmount,
      finalPrice: grandTotal,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Format WhatsApp message
    let orderDetailsText = '';
    if (selectedItems.length > 0) {
      selectedItems.forEach((p, idx) => {
        orderDetailsText += `${idx + 1}. ${p.item.name} x${p.quantity} - PKR ${(p.item.price_pkr * p.quantity).toLocaleString()}\n`;
      });
    } else {
      orderDetailsText = '_No pre-selected dishes (General Table Booking)_\n';
    }

    const msg = `🐻 *The Bar Bears Multan - Table Reservation* 🐻\n\n` +
      `*Booking ID:* ${bookingId}\n` +
      `*Name:* ${customerName}\n` +
      `*Phone:* ${phone}\n` +
      `*Date:* ${date}\n` +
      `*Time Slot:* ${timeSlot}\n` +
      `*Guests:* ${guests} Persons\n\n` +
      `🍔 *Curated Menu Selection:* \n${orderDetailsText}\n` +
      (selectedItems.length > 0 ? (
      `*Subtotal:* PKR ${baseTotal.toLocaleString()}\n` +
      `*Tax (${taxRate}%):* PKR ${Math.round(taxAmount).toLocaleString()}\n` +
      `*Grand Total:* PKR ${Math.round(grandTotal).toLocaleString()}\n\n`
      ) : '') +
      `_Please confirm my slot. Looking forward to an amazing cafe experience!_`;

    // Try triggering WhatsApp in a safe manner
    const formattedPhone = whatsAppNumber.replace(/[^0-9]/g, '');
    const whatsAppUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessReservation(newReservation);
      onBookingComplete(newReservation);
      // Attempt to open WhatsApp
      window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
    }, 1500);
  };

  if (successReservation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-amber-200 bg-white p-6 md:p-8 text-center max-w-2xl mx-auto shadow-sm"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 border border-amber-200">
          <CheckCircle2 className="h-9 w-9 animate-bounce" />
        </div>

        <h3 className="font-sans text-2xl font-bold tracking-tight text-zinc-900">
          Table Reservation Transmitted!
        </h3>
        <p className="mt-2 text-sm text-zinc-500">
          We have generated your custom booking ticket. A direct WhatsApp payload was compiled and opened in a new tab.
        </p>

        {/* Ticket Box */}
        <div className="mt-6 border border-zinc-200 rounded-2xl bg-zinc-50/50 p-5 text-left font-mono shadow-xs">
          <div className="flex justify-between border-b border-zinc-200 pb-3 text-xs text-zinc-400">
            <span>TICKET ID: {successReservation.id}</span>
            <span>{new Date(successReservation.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="mt-4 space-y-2 text-sm text-zinc-700">
            <p><strong className="text-amber-700">Guest:</strong> {successReservation.customerName}</p>
            <p><strong className="text-amber-700">Contact:</strong> {successReservation.phone}</p>
            <p><strong className="text-amber-700">Schedule:</strong> {successReservation.date} @ {successReservation.timeSlot}</p>
            <p><strong className="text-amber-700">Party Size:</strong> {successReservation.guests} Guests</p>
          </div>

          {/* Dishes */}
          <div className="mt-5 pt-4 border-t border-dashed border-zinc-200">
            <span className="text-xs text-zinc-400 uppercase tracking-widest block mb-2">Curated Dishes</span>
            <div className="space-y-1.5 text-xs">
              {successReservation.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-zinc-600">{it.name} x{it.quantity}</span>
                  <span className="text-zinc-800">PKR {(it.price_pkr * it.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="mt-4 pt-3 border-t border-zinc-200 space-y-1 text-sm">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Subtotal</span>
              <span>PKR {successReservation.totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Tax ({taxRate}%)</span>
              <span>PKR {Math.round(successReservation.taxAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-amber-600 pt-1.5 border-t border-zinc-200">
              <span>Estimated Payable</span>
              <span>PKR {Math.round(successReservation.finalPrice).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              // Re-trigger WhatsApp
              const orderDetailsText = successReservation.items.map((it, idx) => `${idx + 1}. ${it.name} x${it.quantity}`).join('\n');
              const msg = `🐻 *The Bar Bears Multan - Table Reservation* 🐻\n\n` +
                `*Booking ID:* ${successReservation.id}\n` +
                `*Name:* ${successReservation.customerName}\n` +
                `_Opening manually via support trigger._`;
              const formattedPhone = whatsAppNumber.replace(/[^0-9]/g, '');
              window.open(`https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(msg)}`, '_blank');
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition shadow-md shadow-amber-500/10"
          >
            <Share2 className="h-4 w-4" />
            Re-Send WhatsApp
          </button>
          
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-700 hover:bg-zinc-200 border border-zinc-200 transition"
          >
            Back to Curation Hub
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 shadow-xl relative">
      <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-900 mb-1">
        Table Reservation & Order Checkout
      </h2>
      <p className="text-xs text-zinc-500 mb-6">
        No upfront prepayments required. Complete your guest profile to lock in your table allocation and forward your curated menu selection to our concierge.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Guest info and slot choice */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 flex items-center gap-2">
              <User className="h-3.5 w-3.5" />
              1. Guest Profile Information
            </h4>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-600">Full Contact Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Hammad Qureshi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-600">Active Phone / WhatsApp Number</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03001234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-4 pr-10 text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-xs"
                />
                <Phone className="absolute top-3 right-3 h-4 w-4 text-zinc-400" />
              </div>
              <span className="text-[10px] text-zinc-400">
                Ensure this matches your active WhatsApp to facilitate direct table confirmation.
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              2. Appointment & Party Size
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600">Dining Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600">Number of Guests</label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm text-zinc-800 appearance-none focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-xs"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                  <Users className="absolute top-3 right-3 h-4 w-4 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600 block">Preferred Time Slot</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {slots.map((sl) => (
                  <button
                    key={sl}
                    type="button"
                    onClick={() => setTimeSlot(sl)}
                    className={`rounded-xl border py-2.5 px-3 text-xs font-medium text-left transition-all ${
                      timeSlot === sl
                        ? 'bg-amber-500/10 border-amber-500 text-amber-700'
                        : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 shadow-xs'
                    }`}
                  >
                    {sl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order selection summaries */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 flex flex-col justify-between h-full shadow-xs">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 mb-4 flex items-center gap-2">
                <Utensils className="h-3.5 w-3.5" />
                3. Order Curation Overview
              </h4>

              {selectedItems.length === 0 ? (
                <div className="py-10 text-center text-zinc-500 bg-white rounded-xl border border-dashed border-zinc-200 p-4 shadow-2xs">
                  <p className="text-xs font-bold text-zinc-700">General Table Booking</p>
                  <p className="text-[11px] text-zinc-400 mt-1 max-w-xs mx-auto">
                    You haven't selected any dishes from our menu yet. You can complete this general table booking now, or browse the Bar BEARS Menu first to pre-allocate your gourmet dishes!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                  {selectedItems.map(({ item, quantity }) => (
                    <div key={item.id} className="flex items-center justify-between gap-2 text-xs border-b border-zinc-200 pb-3">
                      <div className="flex-1">
                        <span className="font-bold text-zinc-800 block">{item.name}</span>
                        <span className="text-[10px] text-zinc-500">PKR {item.price_pkr.toLocaleString()} per unit</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, quantity - 1))}
                          className="h-6 w-6 rounded bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold hover:bg-zinc-300"
                        >
                          -
                        </button>
                        <span className="font-mono text-zinc-800 w-4 text-center">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                          className="h-6 w-6 rounded bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold hover:bg-zinc-300"
                        >
                          +
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calculations and CTA */}
            <div className="mt-6 border-t border-zinc-200 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Items Subtotal</span>
                <span>PKR {baseTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Punjab Dining Tax ({taxRate}%)</span>
                <span>PKR {Math.round(taxAmount).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-base font-bold text-amber-600 pt-3 border-t border-zinc-200">
                <span>Est. Order Value</span>
                <span>PKR {Math.round(grandTotal).toLocaleString()}</span>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-amber-500/10"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      Allocating Table...
                    </>
                  ) : (
                    <>
                      <ClipboardCheck className="h-4 w-4" />
                      Reserve Table via WhatsApp
                    </>
                  )}
                </motion.button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full text-center text-xs text-zinc-400 hover:text-zinc-600 py-2"
              >
                Cancel and keep curation
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

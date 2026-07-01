import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, HelpCircle } from 'lucide-react';

interface ContactPageProps {
  whatsAppNumber: string;
  storeAddress: string;
}

export default function ContactPage({ whatsAppNumber, storeAddress }: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  const faqs = [
    {
      q: "What are your operating hours?",
      a: "We are open daily from 12:00 PM to 2:00 AM, perfect for both lunch gatherings and late-night cravings."
    },
    {
      q: "Is there pre-booking required for large groups?",
      a: "For parties larger than 10, we highly recommend utilizing our Table Reservation tool to pre-allocate your space and curate your culinary preferences."
    },
    {
      q: "Do you offer private event hosting?",
      a: "Yes, we host corporate events, birthdays, and customized high tea curations. Contact us directly on WhatsApp to coordinate."
    },
    {
      q: "Is the food strictly Halal?",
      a: "Absolutely! All our ingredients, signature cuts of beef, and poultry are sourced from Halal-certified local purveyors."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-200 px-3 py-1 text-xs text-amber-800 font-semibold">
          <MessageSquare className="h-3.5 w-3.5" />
          Get In Touch With The Concierge
        </div>
        <h1 className="font-sans text-3xl md:text-5xl font-black tracking-tight text-zinc-900">
          We'd Love to <span className="text-amber-600">Hear From You</span>
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 max-w-2xl mx-auto">
          Have an inquiry, feedback, or a special group curation request? Drop us a line below or connect via direct telephone channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact info column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-6 shadow-xs">
            <h3 className="font-sans text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-3">
              Concierge Desk
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 border border-amber-200 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono">Location</h4>
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                    {storeAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 border border-amber-200 flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono">WhatsApp Support</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    +{whatsAppNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 border border-amber-200 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono">Email Address</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    concierge@thebarbearsmultan.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 border border-amber-200 flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono">Working Hours</h4>
                  <p className="text-xs text-zinc-600 mt-1">
                    Open Daily: 12:00 PM – 2:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt card */}
          <div className="rounded-2xl border border-amber-100 bg-amber-500/5 p-6 space-y-2">
            <h4 className="text-xs font-bold text-amber-800 uppercase font-mono">Instant Confirmation Needed?</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              If you require instant assistance with dinner bookings or party arrangements, please head directly to our <strong className="text-zinc-800">Table Reservation</strong> page.
            </p>
          </div>
        </div>

        {/* Form column */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 shadow-xs">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-zinc-900">Message Transmitted!</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Thank you for reaching out to The Bar Bears. Our hospitality concierge will review your message and reply via email or WhatsApp shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100 transition"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 text-left"
                >
                  <h3 className="font-sans text-lg font-bold text-zinc-900 mb-2">
                    Transmit an Inquiry
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-600">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Hammad Qureshi"
                        className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-xs text-zinc-800 placeholder-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-600">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. hammad@domain.com"
                        className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-xs text-zinc-800 placeholder-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-600">Inquiry Subject</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Group booking request"
                      className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-xs text-zinc-800 placeholder-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-600">Detail Message</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your notes or special demands here..."
                      className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-xs text-zinc-800 placeholder-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed transition shadow-md shadow-amber-500/10"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Transmit Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="pt-8 border-t border-zinc-200 space-y-6">
        <h3 className="font-sans text-xl font-bold text-zinc-900 text-center flex items-center justify-center gap-2">
          <HelpCircle className="h-5 w-5 text-amber-600" />
          Frequently Asked Questions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
              <h4 className="text-xs font-bold text-zinc-800">{faq.q}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

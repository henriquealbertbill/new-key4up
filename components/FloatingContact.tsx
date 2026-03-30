"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Calendar, X, MessageCircle } from "lucide-react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2"
          >
            <a
              href="mailto:geral@key4up.com"
              className="flex items-center gap-3 bg-white/90 backdrop-blur-md text-gray-900 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg border border-gray-200 hover:bg-white transition-colors"
            >
              <Mail className="w-4 h-4 text-gray-600" />
              Enviar email
            </a>
            <a
              href="#"
              className="flex items-center gap-3 bg-white/90 backdrop-blur-md text-gray-900 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg border border-gray-200 hover:bg-white transition-colors"
            >
              <Calendar className="w-4 h-4 text-gray-600" />
              Agendar uma call
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
        aria-label="Contacto"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

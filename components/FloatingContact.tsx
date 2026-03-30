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
              className="flex items-center gap-3 rounded-full border border-gray-200 bg-white/90 px-4 py-2.5 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-md transition-colors hover:bg-white dark:border-card-border dark:bg-card/90 dark:text-foreground dark:hover:bg-card"
            >
              <Mail className="h-4 w-4 text-gray-600 dark:text-figma-muted" />
              Enviar email
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-full border border-gray-200 bg-white/90 px-4 py-2.5 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-md transition-colors hover:bg-white dark:border-card-border dark:bg-card/90 dark:text-foreground dark:hover:bg-card"
            >
              <Calendar className="h-4 w-4 text-gray-600 dark:text-figma-muted" />
              Agendar uma call
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition-colors hover:bg-gray-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
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

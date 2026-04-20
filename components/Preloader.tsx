'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const isInitialMount = useRef(true);
  const renderKey = useRef(0);

  // Initial page load
  useEffect(() => {
    const MIN_MS = 2200;
    const MAX_MS = 6000;
    let minDone = false;
    let loadDone = false;

    function tryHide() {
      if (minDone && loadDone) setVisible(false);
    }

    const minTimer = setTimeout(() => { minDone = true; tryHide(); }, MIN_MS);

    if (document.readyState === 'complete') {
      loadDone = true;
    } else {
      window.addEventListener('load', () => { loadDone = true; tryHide(); }, { once: true });
    }

    const maxTimer = setTimeout(() => setVisible(false), MAX_MS);
    return () => { clearTimeout(minTimer); clearTimeout(maxTimer); };
  }, []);

  // Route change detection — skip first render
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    renderKey.current += 1;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={renderKey.current}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#0a1628] flex flex-col items-center justify-center gap-10"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <p className="text-4xl font-bold tracking-widest text-white uppercase">
              Perbi<span className="text-[#00ABBE]">Cubs</span>
            </p>
            <p className="text-white/40 text-xs tracking-[0.35em] uppercase mt-2">
              Foundation
            </p>
          </motion.div>

          {/* Animated dots */}
          <div className="flex items-center gap-2.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-2 h-2 rounded-full bg-[#00ABBE]"
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="h-full bg-[#00ABBE] rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";

export default function Signature() {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: -20 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <span className="text-[#A78BFA]/80 font-mono text-sm">✳</span>
      <span className="font-mono text-[#A1A1AA] text-sm hover:text-[#A78BFA] transition-colors">
        rudrx75
      </span>
    </motion.div>
  );
}

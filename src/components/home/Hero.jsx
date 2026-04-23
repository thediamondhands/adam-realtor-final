import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69e9765ab76b60a63d59c206/74af20e8b_generated_3b0055fb.png"
          alt="Luxury modern home exterior at golden hour with clean geometric lines and floor-to-ceiling glass"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-[8vw] pb-[8vh]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs tracking-[0.3em] text-white/60 uppercase mb-4">
            Curator of Living Spaces
          </p>
          <h1 className="font-heading text-white text-5xl md:text-7xl lg:text-[8vw] leading-[0.9] font-light max-w-[80vw]">
            Architecture
            <br />
            <span className="italic font-light">for Living</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex items-center gap-4"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-white/50" />
          </motion.div>
        </motion.div>
      </div>

      {/* Coordinate Typography */}
      <div className="absolute top-8 right-[8vw] z-10">
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 text-right">
          40°44'N 73°59'W
          <br />
          EST. 2024
        </p>
      </div>
    </section>
  );
}
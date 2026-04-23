import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80"
          alt="Coastal Florida farmhouse home with blue sky and lush greenery"
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
          <p className="font-mono text-xs tracking-[0.3em] text-white/70 uppercase mb-4">
            MidWest Florida Realtor® · Manatee · Sarasota · Pinellas · Hillsborough
          </p>
          <h1 className="font-heading text-white text-5xl md:text-7xl lg:text-[7vw] leading-[1.05] font-semibold max-w-[85vw]">
            Find Your
            <br />
            <span className="italic font-normal">Florida Home</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex items-center gap-4"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
            Call (941) 580-1655 for a free home evaluation
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
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 text-right">
          BRADENTON · SARASOTA · TAMPA
          <br />
          FLORIDA'S GULF COAST
        </p>
      </div>
    </section>
  );
}
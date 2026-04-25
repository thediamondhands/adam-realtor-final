import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PropertyGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false); //

  const fallbackImages = [
    "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/1e7caa363_generated_376820cf.png",
    "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/53e2b491e_generated_52d1e894.png",
    "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/69f670621_generated_81ddb9a3.png",
  ];

  const allImages = images.length > 0 ? images : fallbackImages;

  return (
    <>
      <div className="sticky top-0 h-screen flex flex-col">
        {/* Main Image */}
        <div className="flex-1 relative overflow-hidden">
          <motion.img
            key={activeIndex}
            src={allImages[activeIndex]}
            alt={`Property view ${activeIndex + 1}`}
            className="w-full h-full object-cover cursor-zoom-in" // Added cursor hint
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsMaximized(true)} // Triggers focus mode
          />

          {/* Navigation and other indicators stay the same... */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4">
            <p className="font-mono text-[10px] tracking-[0.15em] text-white/60 bg-black/30 px-3 py-1 backdrop-blur-sm">
              {String(activeIndex + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-1 p-2 bg-background">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex-1 h-16 overflow-hidden transition-opacity ${i === activeIndex ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FULL SCREEN FOCUS MODAL */}
      <AnimatePresence>
        {isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out"
            onClick={() => setIsMaximized(false)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={allImages[activeIndex]}
              alt="Property Detail"
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

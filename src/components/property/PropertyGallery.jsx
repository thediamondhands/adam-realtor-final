import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PropertyGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  const fallbackImages = [
    "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/1e7caa363_generated_376820cf.png",
    "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/53e2b491e_generated_52d1e894.png",
    "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/69f670621_generated_81ddb9a3.png",
  ];

  const allImages = images.length > 0 ? images : fallbackImages;

  const nextImage = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isMaximized) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setIsMaximized(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMaximized]);

  return (
    <>
      <div className="sticky top-0 h-screen flex flex-col bg-background">
        {/* Main Image View */}
        <div className="flex-1 relative overflow-hidden group">
          <motion.img
            key={activeIndex}
            src={allImages[activeIndex]}
            alt={`Property view ${activeIndex + 1}`}
            className="w-full h-full object-cover cursor-zoom-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsMaximized(true)}
          />

          {allImages.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/60 backdrop-blur-md hover:bg-background transition-all opacity-0 group-hover:opacity-100 z-10">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/60 backdrop-blur-md hover:bg-background transition-all opacity-0 group-hover:opacity-100 z-10">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 right-6 z-10">
            <p className="font-mono text-[10px] tracking-[0.2em] text-white bg-black/40 px-4 py-2 backdrop-blur-md rounded-full">
              {String(activeIndex + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* IMPROVED THUMBNAILS: Scrollable instead of bunched */}
        {allImages.length > 1 && (
          <div className="flex gap-2 p-4 bg-background overflow-x-auto scrollbar-hide border-t border-border/50">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative flex-shrink-0 w-24 h-16 overflow-hidden transition-all duration-300 ${
                  i === activeIndex 
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background opacity-100 scale-95" 
                    : "opacity-40 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Focus Modal Navigation */}
      <AnimatePresence>
        {isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/98 p-4"
            onClick={() => setIsMaximized(false)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[1001]">
              <X className="w-10 h-10" />
            </button>

            {allImages.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all p-4 z-[1001]">
                  <ChevronLeft className="w-16 h-16" />
                </button>
                <button onClick={nextImage} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all p-4 z-[1001]">
                  <ChevronRight className="w-16 h-16" />
                </button>
              </>
            )}

            <motion.img
              key={`focus-${activeIndex}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={allImages[activeIndex]}
              className="max-w-full max-h-full object-contain pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

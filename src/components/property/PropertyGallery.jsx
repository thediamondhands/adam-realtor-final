import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PropertyGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  const allImages = images && images.length > 0 ? images : [
    "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/1e7caa363_generated_376820cf.png"
  ];

  const nextImage = (e) => { e?.stopPropagation(); setActiveIndex((prev) => (prev + 1) % allImages.length); };
  const prevImage = (e) => { e?.stopPropagation(); setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length); };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isMaximized) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setIsMaximized(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMaximized, allImages.length]);

  return (
    <>
      <div className="sticky top-0 h-screen flex flex-col bg-background">
        <div className="flex-1 relative overflow-hidden group">
          <motion.img
            key={activeIndex}
            src={allImages[activeIndex]}
            className="w-full h-full object-cover cursor-zoom-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsMaximized(true)}
          />

          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 text-white z-10 hover:bg-black/40"><ChevronLeft/></button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 text-white z-10 hover:bg-black/40"><ChevronRight/></button>
        </div>

        <div className="flex gap-2 p-4 bg-background overflow-x-auto border-t no-scrollbar">
          {allImages.map((img, i) => (
            <button key={i} onClick={() => setActiveIndex(i)} className={`flex-shrink-0 w-24 h-16 ${i === activeIndex ? "ring-2 ring-black" : "opacity-40"}`}>
              <img src={img} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
            onClick={() => setIsMaximized(false)}
          >
            <button className="absolute top-10 right-10 text-white z-[10001]"><X className="w-10 h-10" /></button>
            <button onClick={prevImage} className="absolute left-10 top-1/2 text-white z-[10001] p-4"><ChevronLeft className="w-12 h-12" /></button>
            <button onClick={nextImage} className="absolute right-10 top-1/2 text-white z-[10001] p-4"><ChevronRight className="w-12 h-12" /></button>
            
            <motion.img
              key={`modal-${activeIndex}`}
              src={allImages[activeIndex]}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

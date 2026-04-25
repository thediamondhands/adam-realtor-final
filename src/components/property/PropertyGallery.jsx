import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Inside PropertyGallery({ images })
const PROJECT_ID = "lvuqqlvbuspfkakzxrsi";
const BUCKET = "properties";

const allImages = images.length > 0 ? images.flatMap(folderPath => {
  // If it's a Zillow link from your DB, keep it
  if (folderPath.startsWith('http')) return folderPath;

  // Otherwise, treat folderPath as the folder name from your screenshot
  // This generates URLs for image1.jpg through image20.jpg
  return Array.from({ length: 20 }, (_, i) => 
    `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${BUCKET}/${folderPath}/image${i + 1}.jpg`
  );
}) : fallbackImages;

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  // Enable arrow key navigation
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

          {/* Regular View Arrows */}
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm z-10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm z-10">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Thumbnails */}
        <div className="flex gap-2 p-4 bg-background overflow-x-auto border-t">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-24 h-16 overflow-hidden transition-all ${
                i === activeIndex ? "ring-2 ring-black opacity-100" : "opacity-40 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* FULL SCREEN MODAL */}
      <AnimatePresence>
        {isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black z-[9999]" // High Z-Index & Solid Black
            onClick={() => setIsMaximized(false)}
          >
            {/* Close Button */}
            <button className="absolute top-10 right-10 text-white z-[10001]">
              <X className="w-10 h-10" />
            </button>

            {/* Modal Navigation Arrows */}
            <button 
              onClick={prevImage} 
              className="absolute left-10 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform z-[10001] p-4"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-10 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform z-[10001] p-4"
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            <motion.img
              key={`modal-${activeIndex}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={allImages[activeIndex]}
              className="max-w-[90%] max-h-[90%] object-contain"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PropertyGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  const PROJECT_ID = "lvuqqlvbuspfkakzxrsi";
  const BUCKET = "properties";

  // Use useMemo to transform the folder name into 22 image URLs
  const allImages = useMemo(() => {
    const fallbackImages = [
      "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/1e7caa363_generated_376820cf.png",
    ];

    // Determine if 'images' is the folder name string or an array
    const folder = Array.isArray(images) ? images[0] : images;

    if (!folder || typeof folder !== 'string' || folder.startsWith('http')) {
      return Array.isArray(images) && images.length > 0 ? images : fallbackImages;
    }

    // Map the folder name to the 22 .jpg files seen in your Supabase bucket
    return Array.from({ length: 22 }, (_, i) => 
      `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${BUCKET}/${folder}/image${i + 1}.jpg`
    );
  }, [images]);

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
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
  }, [isMaximized, allImages.length]);

  return (
    <>
      <div className="sticky top-0 h-screen flex flex-col bg-background">
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
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm z-10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm z-10">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2 p-4 bg-background overflow-x-auto border-t">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-24 h-16 overflow-hidden transition-all ${
                i === activeIndex ? "ring-2 ring-black opacity-100" : "opacity-40 hover:opacity-100"
              }`}
            >
              <img 
                src={img} 
                className="w-full h-full object-cover" 
                onError={(e) => e.target.parentElement.style.display = 'none'} 
              />
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
            className="fixed inset-0 flex items-center justify-center bg-black z-[9999]"
            onClick={() => setIsMaximized(false)}
          >
            <button className="absolute top-10 right-10 text-white z-[10001]">
              <X className="w-10 h-10" />
            </button>
            <button onClick={prevImage} className="absolute left-10 top-1/2 -translate-y-1/2 text-white p-4 z-[10001]">
              <ChevronLeft className="w-12 h-12" />
            </button>
            <button onClick={nextImage} className="absolute right-10 top-1/2 -translate-y-1/2 text-white p-4 z-[10001]">
              <ChevronRight className="w-12 h-12" />
            </button>
            <motion.img
              key={`modal-${activeIndex}`}
              src={allImages[activeIndex]}
              className="max-w-[90%] max-h-[90%] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

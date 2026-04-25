import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PropertyGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  // --- NEW LOGIC START ---
  const PROJECT_ID = "lvuqqlvbuspfkakzxrsi";
  const BUCKET = "properties";

  // Handle if 'images' is a string from Supabase or an array
  const imageArray = typeof images === 'string' 
    ? (images.startsWith('[') ? JSON.parse(images) : [images]) 
    : images;

  const fallbackImages = [
    "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/1e7caa363_generated_376820cf.png",
  ];

  // Map folder names to actual image paths
  const allImages = imageArray.length > 0 
    ? imageArray.flatMap(folderPath => {
        if (folderPath.startsWith('http')) return folderPath; // Keep external links
        
        // Generate URLs for image1.jpg through image22.jpg based on your bucket
        return Array.from({ length: 22 }, (_, i) => 
          `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${BUCKET}/${folderPath}/image${i + 1}.jpg`
        );
      }) 
    : fallbackImages;
  // --- NEW LOGIC END ---

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
  }, [isMaximized, allImages.length]); // Added allImages.length to dependency array

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
              <img 
                src={img} 
                alt="" 
                className="w-full h-full object-cover" 
                onError={(e) => e.target.parentElement.style.display = 'none'} // Hide broken thumbnails
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

            <button onClick={prevImage} className="absolute left-10 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform z-[10001] p-4">
              <ChevronLeft className="w-12 h-12" />
            </button>
            <button onClick={nextImage} className="absolute right-10 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform z-[10001] p-4">
              <ChevronRight className="w-12 h-12" />
            </button>

            <motion.img
              key={`modal-${activeIndex}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
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

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";

export default function Portfolio() {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { data: properties, error } = useQuery({
    queryKey: ["properties-featured"],
    queryFn: async () => {
      const result = await base44.entities.Property.list("-created_date", 10);
      return result;
    },
    initialData: [],
  });

  // This log will tell us exactly why 'a.map' was failing
  useEffect(() => {
    if (properties) {
      console.log("Portfolio Data check:", properties);
    }
    if (error) {
      console.error("Supabase Fetch Error:", error);
    }
  }, [properties, error]);

  const handleWheel = (e) => {
    if (!scrollRef.current || !isHovered) return;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const atStart = scrollRef.current.scrollLeft === 0 && e.deltaY < 0;
    const atEnd = scrollRef.current.scrollLeft >= maxScroll && e.deltaY > 0;
    if (!atStart && !atEnd) {
      e.preventDefault();
    }
    scrollRef.current.scrollLeft += e.deltaY;
    const progress = scrollRef.current.scrollLeft / maxScroll;
    setScrollProgress(Math.max(0, Math.min(1, progress)));
  };

  // If properties is null or not an array, we treat it as empty to avoid the crash
  const safeProperties = Array.isArray(properties) ? properties : [];

  if (safeProperties.length === 0) return null;

  return (
    <section className="py-16">
      {/* Header */}
      <div className="px-[8vw] pb-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Curated Portfolio
            </p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95]">
              Florida
              <br />
              <span className="italic">Listings</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground text-right">
              {String(Math.round(scrollProgress * (safeProperties.length - 1)) + 1).padStart(2, "0")} / {String(safeProperties.length).padStart(2, "0")}
            </p>
            <div className="w-32 h-px bg-border mt-3 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-px structural-rule border-t mt-8" />
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        style={{ scrollBehavior: "auto" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="horizontal-scroll-section flex gap-6 md:gap-10 px-[8vw] overflow-x-scroll pt-6 pb-10 cursor-grab"
      >
        {/* THE FIX: We use safeProperties here to prevent the .map crash */}
        {safeProperties.map((property, index) => (
          <PropertyCard key={property.id || index} property={property} index={index} />
        ))}
      </div>
      
      {isHovered && (
        <p className="text-center font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-2">
          Scroll to browse
        </p>
      )}
    </section>
  );
}

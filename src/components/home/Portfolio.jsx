import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient"; 
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";

export default function Portfolio() {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { data: properties, error } = useQuery({
    queryKey: ["properties-featured"],
    queryFn: async () => {
      // Direct Supabase fetch
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        // We removed the 'featured' filter for now to ensure data is flowing
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error("Query Function Error:", error);
        throw error;
      }
      return data;
    },
    initialData: [],
  });

  // Verification Logs
  useEffect(() => {
    console.log("Current properties state:", properties);
    if (error) console.error("Portfolio Fetch Error:", error);
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
    setScrollProgress(Math.max(0, Math.min(1, progress || 0)));
  };

  // Safety check to prevent .map crashes
  const safeProperties = Array.isArray(properties) ? properties : [];

  // If this stays empty, the section won't show. 
  // If your console says "Array(0)", it means the table name 'properties' 
  // might have a typo or the table is empty in Supabase.
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

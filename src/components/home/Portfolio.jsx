import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient"; 
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";

export default function Portfolio() {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { data: properties, error, isLoading } = useQuery({
    queryKey: ["properties-home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_date', { ascending: false }); // Added sorting here for you

      if (error) throw error;
      return data;
    }
  });

  // Data Filtering
  const featuredListings = properties?.filter(p => p.status === "available") || [];
  const soldListings = properties?.filter(p => p.status === "sold") || [];
  
  const handleWheel = (e) => {
    if (!scrollRef.current || !isHovered) return;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollLeft += e.deltaY;
    const progress = scrollRef.current.scrollLeft / (maxScroll || 1);
    setScrollProgress(Math.max(0, Math.min(1, progress)));
  };

  if (isLoading) return <div className="py-20 text-center text-muted-foreground animate-pulse">Loading listings...</div>;
  if (!properties || properties.length === 0) return null;

  return (
    <section className="py-16 space-y-24">
      {/* 1. FEATURED LISTINGS */}
      {featuredListings.length > 0 && (
        <div className="px-[8vw]">
          <div className="mb-8">
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              Current<span className="italic">Listings</span>
            </h2>
            <div className="w-full h-px border-t mt-8" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredListings.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* 2. PROOF OF SUCCESS */}
      {soldListings.length > 0 && (
        <div>
          <div className="px-[8vw] mb-8">
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              Recently <span className="italic">Sold</span>
            </h2>
            <div className="w-full h-px border-t mt-8" />
          </div>

          <div
            ref={scrollRef}
            onWheel={handleWheel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="horizontal-scroll-section flex gap-6 md:gap-10 px-[8vw] overflow-x-scroll pt-6 pb-10 cursor-grab"
          >
            {soldListings.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

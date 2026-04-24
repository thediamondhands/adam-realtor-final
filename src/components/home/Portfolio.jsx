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
        .select('*'); 
      
      // If you want to sort, ensure it is exactly 'created_at'
      // .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

// Add this right after the useQuery block
const featuredListings = properties?.filter(p => p.status === "available") || [];
const soldListings = properties?.filter(p => p.status === "sold") || [];
  
  useEffect(() => {
    if (properties) console.log("Homes found in DB:", properties.length);
  }, [properties]);

  const handleWheel = (e) => {
    if (!scrollRef.current || !isHovered) return;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollLeft += e.deltaY;
    const progress = scrollRef.current.scrollLeft / (maxScroll || 1);
    setScrollProgress(Math.max(0, Math.min(1, progress)));
  };

  if (isLoading) return <div className="py-20 text-center text-muted-foreground animate-pulse">Loading listings...</div>;
  
  // If we still get 0, the section stays hidden to keep the site looking clean
  if (!properties || properties.length === 0) return null;

  return (
    <section className="py-16 space-y-24">
      {/* 1. FEATURED LISTINGS: Using a Grid for a "Spotlight" look */}
      {featuredListings.length > 0 && (
        <div className="px-[8vw]">
          <div className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Featured Listings
            </p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95]">
              Florida<br /><span className="italic">Listings</span>
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

      {/* 2. PROOF OF SUCCESS: Using your Horizontal Scroll for Sold homes */}
      {soldListings.length > 0 && (
        <div>
          <div className="px-[8vw] mb-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Proof of Success
            </p>
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

      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="horizontal-scroll-section flex gap-6 md:gap-10 px-[8vw] overflow-x-scroll pt-6 pb-10 cursor-grab"
      >
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>
    </section>
  );
}

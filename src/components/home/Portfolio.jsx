import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient"; 
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";

export default function Portfolio() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Fetch Data
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties-home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // 2. Image URL Helper
  const getImageUrl = (property) => {
    const projectId = "lvuqqlvbuspfkakzxrsi"; 
    const bucketUrl = `https://${projectId}.supabase.co/storage/v1/object/public/properties`;
    
    // If there's no slug, return a placeholder to prevent broken layouts
    if (!property.slug) return "https://via.placeholder.com/600x400?text=No+Image+Available";
    
    return `${bucketUrl}/${property.slug}/image1.jpg`;
  };

  // 3. Horizontal Scroll Logic
  const handleWheel = (e) => {
    if (!scrollRef.current || !isHovered) return;
    // Standardizing scroll speed across browsers
    scrollRef.current.scrollLeft += e.deltaY;
  };

  if (isLoading) return <div className="py-20 text-center text-muted-foreground animate-pulse">Loading listings...</div>;
  if (!properties || properties.length === 0) return null;

  // Filter listings and inject the correct image URL immediately
  const featuredListings = properties
    .filter(p => p.status === "available")
    .map(p => ({ ...p, displayImage: getImageUrl(p) }));

  const soldListings = properties
    .filter(p => p.status === "sold")
    .map(p => ({ ...p, displayImage: getImageUrl(p) }));

  return (
    <section className="py-16 space-y-24">
      {/* 1. FEATURED LISTINGS */}
      {featuredListings.length > 0 && (
        <div className="px-[8vw]">
          <div className="mb-8">
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              Current <span className="italic">Listings</span>
            </h2>
            <div className="w-full h-px border-t mt-8" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredListings.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                imageUrl={property.displayImage} // Pass explicit imageUrl prop
                index={index} 
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. PROOF OF SUCCESS (SOLD) */}
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
            className="flex gap-6 md:gap-10 px-[8vw] overflow-x-auto pt-6 pb-10 cursor-grab no-scrollbar scroll-smooth"
          >
            {soldListings.map((property, index) => (
              <div key={property.id} className="min-w-[300px] md:min-w-[400px]">
                <PropertyCard 
                  property={property} 
                  imageUrl={property.displayImage} // Pass explicit imageUrl prop
                  index={index} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

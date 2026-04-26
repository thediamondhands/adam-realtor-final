import { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; 
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";

export default function Portfolio() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["properties-home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_date', { ascending: false }); 

      if (error) throw error;
      return data;
    }
  });

  const getImageUrl = (property) => {
    const projectId = "lvuqqlvbuspfkakzxrsi"; 
    const bucketUrl = `https://${projectId}.supabase.co/storage/v1/object/public/properties`;
    if (!property.slug) return "https://via.placeholder.com/600x400?text=Missing+Slug";
    return `${bucketUrl}/${property.slug}/image1.jpg`;
  };

  const handleWheel = (e) => {
    if (!scrollRef.current || !isHovered) return;
    scrollRef.current.scrollLeft += e.deltaY;
  };

  if (isLoading) return <div className="py-20 text-center animate-pulse">Loading listings...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Error loading: {error.message}</div>;
  if (!properties || properties.length === 0) return null;

  // Filter and map properties with their calculated image URL
  const featuredListings = properties
    ?.filter(p => p.status?.toLowerCase() === "available" || p.status?.toLowerCase() === "featured")
    .map(p => ({ ...p, image: getImageUrl(p) })) || [];

  const soldListings = properties
    ?.filter(p => p.status?.toLowerCase() === "sold")
    .map(p => ({ ...p, image: getImageUrl(p) })) || [];

  return (
    <section className="py-16 space-y-24 bg-background">
      
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
                imageUrl={property.image}
                index={index} 
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. SOLD LISTINGS (FIXED SIZING) */}
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
            /* items-start prevents the card from stretching vertically */
            className="flex items-start gap-6 md:gap-10 px-[8vw] overflow-x-auto pt-6 pb-20 no-scrollbar scroll-smooth"
          >
            {soldListings.map((property, index) => (
              /* This wrapper div controls the card width in the horizontal scroll */
              <div 
                key={property.id} 
                className="w-[80vw] md:w-[35vw] lg:w-[28vw] flex-shrink-0"
              >
                <PropertyCard 
                  property={property} 
                  imageUrl={property.image}
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

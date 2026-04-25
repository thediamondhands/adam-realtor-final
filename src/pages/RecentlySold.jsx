import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function RecentlySold() {
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["recently-sold"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'sold')
        .order('created_date', { ascending: false });

      if (error) throw error;
      return data;
    },
    initialData: [],
  });

  const formatPrice = (price) => {
    const numPrice = Number(price);
    if (numPrice >= 1000000) return `$${(numPrice / 1000000).toFixed(1)}M`;
    if (numPrice >= 1000) return `$${(numPrice / 1000).toFixed(0)}K`;
    return `$${numPrice}`;
  };

  const getImageUrl = (property) => {
    const projectId = "lvuqqlvbuspfkakzxrsi"; 
    const bucketUrl = `https://${projectId}.supabase.co/storage/v1/object/public/properties`;
  
  // Now it pulls the correct extension for every specific property
    const fileName = property.thumbnail_url || 'image1.jpg'; // fallback just in case
    return `${bucketUrl}/${property.slug}/${fileName}`;
  };

  return (
    <div className="pt-28 pb-24 px-[8vw]">
      <div className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
          Proof of Success
        </p>
        <h1 className="font-heading text-5xl md:text-7xl font-light leading-[0.95]">
          Recently <span className="italic">Sold</span>
        </h1>
      </div>

      <div className="w-full h-px structural-rule border-t mb-12" />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-border border-t-foreground rounded-full animate-spin" />
        </div>
      ) : properties.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">
          No recently sold properties to show yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/property/${property.slug}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-5">
                  <img
                    src={getImageUrl(property)}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase bg-foreground/90 text-background px-3 py-1">
                      Sold
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-heading text-2xl font-light">{property.title}</h3>
                  <span className="font-mono text-xs tracking-wider text-muted-foreground">
                    {formatPrice(property.price)}
                  </span>
                </div>

                <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                  {property.bedrooms && <span>{property.bedrooms} BD</span>}
                  {property.bathrooms && (
                    <>
                      <span className="text-border">|</span>
                      <span>{property.bathrooms} BA</span>
                    </>
                  )}
                  {property.sqft && (
                    <>
                      <span className="text-border">|</span>
                      <span>{Number(property.sqft).toLocaleString()} SF</span>
                    </>
                  )}
                </div>

                <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground mt-1">
                  {property.city}{property.state ? `, ${property.state}` : ""}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

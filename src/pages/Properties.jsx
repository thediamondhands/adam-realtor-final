import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Properties() {
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: () => base44.entities.Property.list("-created_date", 50),
    initialData: [],
  });

  const formatPrice = (price) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price}`;
  };

  return (
    <div className="pt-28 pb-24 px-[8vw]">
      <div className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
          Full Collection
        </p>
        <h1 className="font-heading text-5xl md:text-7xl font-light leading-[0.95]">
          The <span className="italic">Portfolio</span>
        </h1>
      </div>

      <div className="w-full h-px structural-rule border-t mb-12" />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-border border-t-foreground rounded-full animate-spin" />
        </div>
      ) : properties.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">
          No properties available at this time. Check back soon.
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
              <Link to={`/property/${property.id}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-5">
                  <img
                    src={property.images?.[0] || "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/1e7caa363_generated_376820cf.png"}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {property.status === "available" && (
                    <div className="absolute top-3 right-3">
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase bg-primary/90 text-primary-foreground px-3 py-1">
                        For Sale
                      </span>
                    </div>
                  )}
                  {property.status === "pending" && (
                    <div className="absolute top-3 right-3">
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase bg-primary/90 text-primary-foreground px-3 py-1">
                        Under Contract
                      </span>
                    </div>
                  )}
                  {property.status === "sold" && (
                    <div className="absolute top-3 right-3">
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase bg-foreground/90 text-background px-3 py-1">
                        Sold
                      </span>
                    </div>
                  )}
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
                      <span>{property.sqft.toLocaleString()} SF</span>
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
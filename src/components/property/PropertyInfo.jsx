import { motion } from "framer-motion";
import { MapPin, Maximize, BedDouble, Bath, Calendar } from "lucide-react";

export default function PropertyInfo({ property }) {
  if (!property) return <div className="p-10 text-center">Loading Property Details...</div>;

  const formatPrice = (price) => {
    const numPrice = Number(price || property.price || property.listing_price || 0);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  // Try every possible key to find the address
  const displayAddress = property.location || property.address || property.title || property.formatted_address || "Address Available Upon Request";
  const displayTitle = property.title || property.address || "Beautiful Residence";
  
  // Fixed URL syntax
  const encodedAddress = encodeURIComponent(displayAddress);
  const simpleEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full px-6 py-8 space-y-10"
    >
      {/* Header - FORCE SHOWING TITLE AND ADDRESS */}
      <div className="space-y-4">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          {property.property_type?.replace('_', ' ') || "Featured Listing"}
        </p>
        
        <h1 className="font-heading text-4xl md:text-6xl font-light leading-tight text-black">
          {displayTitle}
        </h1>

        <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-md border border-slate-100">
          <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="text-base font-medium text-slate-700">
            {displayAddress}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-b border-slate-200 py-6">
        <p className="font-heading text-3xl md:text-4xl font-light text-black">
          {formatPrice(property.price)}
        </p>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
          { icon: Bath, label: "Bathrooms", value: property.bathrooms },
          { icon: Maximize, label: "Sq. Ft.", value: property.sq_ft || property.sqft },
          { icon: Calendar, label: "Year Built", value: property.year_built },
        ].map(({ icon: Icon, label, value }) => (
          value ? (
            <div key={label}>
              <Icon className="w-6 h-6 text-primary mb-2" />
              <p className="font-heading text-2xl font-light">{value}</p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                {label}
              </p>
            </div>
          ) : null
        ))}
      </div>

      {/* Story */}
      {property.description && (
        <div className="pt-4">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4 border-b pb-2">Description</h3>
          <p className="text-slate-800 leading-relaxed font-light text-lg">
            {property.description}
          </p>
        </div>
      )}

      {/* Map */}
      <div className="space-y-4 pt-6">
        <div className="w-full h-[300px] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            src={simpleEmbedUrl} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
}

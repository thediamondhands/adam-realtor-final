import { motion } from "framer-motion";
import { MapPin, Maximize, BedDouble, Bath, Calendar } from "lucide-react";

export default function PropertyInfo({ property }) {
  if (!property) return null;

  const formatPrice = (price) => {
    const numPrice = Number(price || property.price || property.listing_price || 0);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const displayAddress = property.location || property.address || property.title || "";
  const encodedAddress = encodeURIComponent(displayAddress);
  const simpleEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      /* CRITICAL FIXES:
         1. Added 'relative z-20' so it sits on top of the gallery.
         2. Increased 'pt-48' to push it way down on mobile.
         3. Added 'bg-[#fdfbf7]' (or your page color) to mask overlapping images.
      */
      className="relative z-20 space-y-10 px-6 pb-20 pt-48 md:pt-0 bg-[#fdfbf7]"
    >
      {/* Header */}
      <div className="space-y-3">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          {property.property_type?.replace('_', ' ') || "Residence"}
        </p>
        
        <h1 className="font-heading text-4xl md:text-6xl font-light leading-tight text-black">
          {property.title}
        </h1>

        <div className="flex items-start gap-2 text-muted-foreground pt-1">
          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
          <span className="text-base font-medium">
            {displayAddress}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-b border-black/10 py-8">
        <p className="font-heading text-3xl md:text-5xl font-light text-black">
          {formatPrice(property.price)}
        </p>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
        {[
          { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
          { icon: Bath, label: "Bathrooms", value: property.bathrooms },
          { icon: Maximize, label: "Sq. Ft.", value: property.sq_ft || property.sqft },
          { icon: Calendar, label: "Year Built", value: property.year_built },
        ].map(({ icon: Icon, label, value }) => (
          value && (
            <div key={label} className="flex flex-col">
              <Icon className="w-6 h-6 text-primary mb-3" />
              <p className="font-heading text-2xl font-light leading-none mb-2">{value}</p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                {label}
              </p>
            </div>
          )
        ))}
      </div>

      {/* Description */}
      {property.description && (
        <div className="pt-4 border-t border-black/5">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6">Description</h3>
          <p className="text-black/80 leading-relaxed text-lg font-light">
            {property.description}
          </p>
        </div>
      )}

      {/* Map */}
      <div className="space-y-4 pt-4 border-t border-black/5">
        <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Location</h3>
        <div className="w-full h-[350px] rounded-lg overflow-hidden border border-black/10 grayscale hover:grayscale-0 transition-all">
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
}

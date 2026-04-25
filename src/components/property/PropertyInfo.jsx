import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Maximize, BedDouble, Bath, Calendar, ExternalLink, X } from "lucide-react";

export default function PropertyInfo({ property, activeImage }) {
  // This state will track if the user has clicked the image to focus it
  const [isMaximized, setIsMaximized] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price || property.price || 0);
  };

  const encodedAddress = encodeURIComponent(property.title || "");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  
  // FIX: This specific URL format works for iframes without an API key
  const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        {/* Header */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
            {property.property_type?.replace('_', ' ') || "Residence"}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-[0.95] mb-4">
            {property.title}
          </h1>
          
          <a 
            href={mapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group w-fit"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm underline underline-offset-4">View on Google Maps</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Price Section */}
        <div className="border-t border-b structural-rule py-6">
          <p className="font-heading text-3xl md:text-4xl font-light">
            {formatPrice(property.listing_price)}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
            { icon: Bath, label: "Bathrooms", value: property.bathrooms },
            { icon: Maximize, label: "Sq. Ft.", value: (property.sq_ft || property.sqft)?.toLocaleString() },
            { icon: Calendar, label: "Year Built", value: property.year_built },
          ].map(({ icon: Icon, label, value }) => (
            value && (
              <div key={label}>
                <Icon className="w-5 h-5 text-primary mb-2" />
                <p className="font-heading text-2xl font-light">{value}</p>
                <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                  {label}
                </p>
              </div>
            )
          ))}
        </div>

        {/* Story Section */}
        {property.description && (
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
              Description
            </h3>
            <p className="text-foreground leading-relaxed mb-8">{property.description}</p>
          </div>
        )}

        {/* Map Section - FIXED URL */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Location
          </h3>
          <div className="w-full h-[350px] rounded-lg overflow-hidden border border-border shadow-sm">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={embedUrl}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </motion.div>

      {/* FULL SCREEN FOCUS MODAL (Add onClick={() => setIsMaximized(true)} to your main image slider) */}
      <AnimatePresence>
        {isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out"
            onClick={() => setIsMaximized(false)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white">
              <X className="w-8 h-8" />
            </button>
            <img
              src={activeImage}
              alt="Property Detail"
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

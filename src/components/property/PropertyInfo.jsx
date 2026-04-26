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

  // Fixed interpolation syntax
  const addressString = property.location || property.address || property.title || "";
  const encodedAddress = encodeURIComponent(addressString);
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;
  const simpleEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      /* mt-20 or mt-32 on mobile provides the "clearance" needed to get below the images */
      className="mt-20 md:mt-0 space-y-10 px-4 md:px-0"
    >
      {/* Header */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
          {property.property_type?.replace('_', ' ') || "Residence"}
        </p>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4">
          {property.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {property.location || property.address || "Location not specified"}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-b border-border py-6">
        <p className="font-heading text-3xl md:text-4xl font-light">
          {formatPrice(property.price)}
        </p>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
          { icon: Bath, label: "Bathrooms", value: property.bathrooms },
          { icon: Maximize, label: "Sq. Ft.", value: property.sq_ft || property.sqft },
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

      {/* Description */}
      {property.description && (
        <div className="pt-4">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">Description</h3>
          <p className="text-foreground leading-relaxed font-light whitespace-pre-wrap">
            {property.description}
          </p>
        </div>
      )}

      {/* Map */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Location</h3>
        <div className="w-full h-[350px] rounded-lg overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-500">
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

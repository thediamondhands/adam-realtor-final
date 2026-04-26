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

  // Fixed the syntax here: added $ and used a standard Google Maps embed format
  const addressString = property.location || property.address || property.title || "";
  const encodedAddress = encodeURIComponent(addressString);
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}`;
  
  // Alternative if you don't have an API key (standard iframe embed):
  const simpleEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 md:space-y-10 px-4 md:px-0"
    >
      {/* Header */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-2">
          {property.property_type?.replace('_', ' ') || "Residence"}
        </p>
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-3">
          {property.title}
        </h1>
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm md:text-base">
            {property.location || property.address || "Address not available"}
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

      {/* Story */}
      {property.description && (
        <div className="pt-4">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">Description</h3>
          <p className="text-foreground leading-relaxed text-sm md:text-base">
            {property.description}
          </p>
        </div>
      )}

      {/* Map */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Location</h3>
        <div className="w-full h-[300px] md:h-[450px] rounded-lg overflow-hidden border border-border shadow-sm">
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

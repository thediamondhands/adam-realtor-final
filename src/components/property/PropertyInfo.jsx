import { motion } from "framer-motion";
import { MapPin, Maximize, BedDouble, Bath, Calendar, ExternalLink } from "lucide-react";

export default function PropertyInfo({ property }) {
  const formatPrice = (price) => {
    const numPrice = Number(price || property.price || property.listing_price || 0);
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const encodedAddress = encodeURIComponent(property.title || "");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
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
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {property.location || property.address || "Location not specified"}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-b structural-rule py-6">
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
        ].map(({ icon: Icon, label, value }) =>
          value ? (
            <div key={label}>
              <Icon className="w-5 h-5 text-primary mb-2" />
              <p className="font-heading text-2xl font-light">{value}</p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                {label}
              </p>
            </div>
          ) : null
        )}
      </div>

      {/* Description */}
      {property.description && (
        <div className="pt-4">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Description
          </h3>
          <p className="text-foreground leading-relaxed">{property.description}</p>
        </div>
      )}

      {/* Map */}
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
  );
}

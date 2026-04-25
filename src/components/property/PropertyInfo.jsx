import { motion } from "framer-motion";
import { MapPin, Maximize, BedDouble, Bath, Calendar } from "lucide-react";

export default function PropertyInfo({ property }) {
  // Formatter for the price column
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

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
          <span className="text-sm">{property.title || "Location not specified"}</span>
        </div>
      </div>

      {/* Price Section - Updated to use 'price' from Supabase */}
      <div className="border-t border-b structural-rule py-6">
        <p className="font-heading text-3xl md:text-4xl font-light">
          {formatPrice(property.price)}
        </p>
      </div>

      {/* Specs Grid - Updated keys to match your table exactly */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
          { icon: Bath, label: "Bathrooms", value: property.bathrooms },
          { icon: Maximize, label: "Sq. Ft.", value: property.sqft?.toLocaleString() },
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

      {/* Story/Description */}
      {property.description && (
        <div>
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
            The Story
          </h3>
          <p className="text-foreground leading-relaxed">{property.description}</p>
        </div>
      )}
    </motion.div>
  );
}

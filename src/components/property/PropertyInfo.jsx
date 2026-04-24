import { motion } from "framer-motion";
import { MapPin, Maximize, BedDouble, Bath, Calendar } from "lucide-react";

export default function PropertyInfo({ property }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      {/* Header - Updated for property.location */}
<div>
  <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
    {property.property_type?.replace(/_/g, " ") || "Residence"}
  </p>
  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-[0.95] mb-4">
    {property.title}
  </h1>
  <div className="flex items-center gap-2 text-muted-foreground">
    <MapPin className="w-4 h-4" />
    {/* Uses property.location from your DB instead of city/state */}
    <span className="text-sm">{property.address || property.location || "Florida"}</span>
  </div>
</div>

{/* Price - Updated for property.listing_price */}
<div className="border-t border-b structural-rule py-6">
  <p className="font-heading text-3xl md:text-4xl font-light">
    {/* formatPrice now receives listing_price */}
    {formatPrice(property.listing_price || 0)}
  </p>
</div>

      {/* Specs */}
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

      {/* Description */}
      {property.description && (
        <div>
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
            The Story
          </h3>
          <p className="text-foreground leading-relaxed">{property.description}</p>
        </div>
      )}

      {/* Materiality */}
      {property.materiality && (
        <div className="border-t structural-rule pt-8">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Materiality
          </h3>
          <p className="text-foreground leading-relaxed">{property.materiality}</p>
        </div>
      )}

      {/* Amenities */}
      {property.amenities?.length > 0 && (
        <div className="border-t structural-rule pt-8">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Amenities
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {property.amenities.map((amenity, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1 h-1 bg-primary rounded-full" />
                <span className="text-sm text-foreground">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coordinates */}
      {property.coordinates && (
        <div className="border-t structural-rule pt-6">
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
            COORDINATES: {property.coordinates}
          </p>
          {property.lot_size && (
            <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground mt-1">
              LOT: {property.lot_size}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}

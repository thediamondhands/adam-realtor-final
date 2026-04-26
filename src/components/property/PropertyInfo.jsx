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
  const simpleEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 bg-[#fdfbf7] mt-0 md:-mt-1 pb-20 px-4 sm:px-6 md:px-8 pt-6 md:pt-12"
    >
      {/* Header */}
      <div className="space-y-4 mb-8 md:mb-10">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          {property.property_type?.replace("_", " ") || "Residence"}
        </p>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
          {property.title}
        </h1>

        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
          <span className="text-sm md:text-base leading-relaxed">
            {displayAddress}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-b structural-rule py-8 md:py-10 mb-8 md:mb-12">
        <p className="font-heading text-4xl md:text-5xl font-light tracking-tight">
          {formatPrice(property.price)}
        </p>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-12 md:mb-16">
        {[
          { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
          { icon: Bath, label: "Bathrooms", value: property.bathrooms },
          { icon: Maximize, label: "Sq. Ft.", value: property.sq_ft || property.sqft },
          { icon: Calendar, label: "Year Built", value: property.year_built },
        ].map(({ icon: Icon, label, value }) =>
          value ? (
            <div key={label} className="flex flex-col">
              <Icon className="w-5 h-5 text-muted-foreground mb-4" />
              <p className="font-heading text-3xl md:text-4xl font-light leading-none mb-2">
                {value}
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                {label}
              </p>
            </div>
          ) : null
        )}
      </div>

      {/* Description */}
      {property.description && (
        <div className="mb-12 md:mb-16">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6">
            Description
          </h3>
          <p className="text-foreground text-[15px] md:text-base leading-relaxed max-w-3xl">
            {property.description}
          </p>
        </div>
      )}

      {/* Map */}
      <div className="border-t structural-rule pt-8">
        <div className="w-full h-[320px] md:h-[420px] rounded-xl overflow-hidden border structural-rule grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={simpleEmbedUrl}
            allowFullScreen
            loading="lazy"
            title="Property Location"
          />
        </div>
      </div>
    </motion.div>
  );
}

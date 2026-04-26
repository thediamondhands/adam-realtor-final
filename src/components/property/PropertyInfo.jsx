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

  // Fixed syntax with ${}
  const addressString = property.location || property.address || property.title || "";
  const encodedAddress = encodeURIComponent(addressString);
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;
  const simpleEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    /* Added relative z-10 and pt-12 to force it out from behind overlapping elements */
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 space-y-8 px-6 pb-20 pt-12 bg-white md:bg-transparent md:pt-0"
    >
      {/* Header - Address & Title */}
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          {property.property_type?.replace('_', ' ') || "Residence"}
        </p>
        <h1 className="font-heading text-4xl md:text-6xl font-light leading-tight text-black">
          {property.title}
        </h1>
        <div className="flex items-start gap-2 text-muted-foreground mt-2">
          <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
          <span className="text-base font-medium">
            {property.location || property.address || "Address not available"}
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="border-t border-b border-gray-200 py-8">
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
              <p className="font-heading text-3xl font-light leading-none mb-1">{value}</p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                {label}
              </p>
            </div>
          )
        ))}
      </div>

      {/* Story */}
      {property.description && (
        <div className="pt-6 border-t border-gray-100">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6">The Story</h3>
          <p className="text-gray-800 leading-relaxed text-lg font-light">
            {property.description}
          </p>
        </div>
      )}

      {/* Map Section */}
      <div className="space-y-4 pt-10 border-t border-gray-100">
        <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Location</h3>
        <div className="w-full h-[350px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
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

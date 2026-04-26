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
      /* Using your site's background color and consistent mobile padding */
      className="relative z-10 space-y-12 px-8 pb-20 pt-48 md:pt-10 bg-[#fdfbf7] font-sans"
    >
      {/* Header - Matches the Footer Heading Style */}
      <div className="space-y-4">
        <p className="font-sans text-[10px] tracking-[0.3em] text-gray-500 uppercase">
          {property.property_type?.replace('_', ' ') || "Residence"}
        </p>
        
        <h1 className="font-serif text-4xl md:text-6xl font-light leading-tight text-[#2c2c2c]">
          {property.title}
        </h1>

        <div className="flex items-start gap-2 text-gray-600 pt-1">
          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
          <span className="text-sm md:text-base tracking-wide uppercase font-light">
            {displayAddress}
          </span>
        </div>
      </div>

      {/* Price - Serif style to match your branding */}
      <div className="border-t border-b border-black/10 py-10">
        <p className="font-serif text-4xl md:text-5xl font-light text-[#2c2c2c]">
          {formatPrice(property.price)}
        </p>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
        {[
          { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
          { icon: Bath, label: "Bathrooms", value: property.bathrooms },
          { icon: Maximize, label: "Sq. Ft.", value: property.sq_ft || property.sqft },
          { icon: Calendar, label: "Year Built", value: property.year_built },
        ].map(({ icon: Icon, label, value }) => (
          value && (
            <div key={label} className="flex flex-col border-l border-black/10 pl-4">
              <Icon className="w-5 h-5 text-gray-400 mb-4" />
              <p className="font-serif text-3xl font-light leading-none mb-2 text-[#2c2c2c]">{value}</p>
              <p className="font-sans text-[9px] tracking-[0.2em] text-gray-500 uppercase">
                {label}
              </p>
            </div>
          )
        ))}
      </div>

      {/* Description - Sans style to match "Full-time Realtor..." text */}
      {property.description && (
        <div className="pt-6">
          <h3 className="font-sans text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-6">The Story</h3>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg font-light max-w-3xl">
            {property.description}
          </p>
        </div>
      )}

      {/* Map */}
      <div className="pt-6 border-t border-black/5">
        <div className="w-full h-[350px] rounded-sm overflow-hidden border border-black/5 grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
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

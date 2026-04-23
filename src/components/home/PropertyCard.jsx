import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PropertyCard({ property, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price}`;
  };

  return (
    <Link to={`/property/${property.id}`}>
      <motion.div
        className="flex-shrink-0 w-[75vw] md:w-[35vw] lg:w-[28vw] cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.15 }}
      >
        {/* Image Container - 4:5 aspect ratio */}
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <motion.img
            src={property.images?.[0] || "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/1e7caa363_generated_376820cf.png"}
            alt={property.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Coordinate overlay */}
          <div className="absolute bottom-3 left-3">
            <p className="font-mono text-[9px] tracking-[0.15em] text-white/50">
              {property.coordinates || "40°44'N 73°59'W"}
            </p>
          </div>

          {/* Status badge */}
          {property.status === "pending" && (
            <div className="absolute top-3 right-3">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase bg-primary/90 text-primary-foreground px-3 py-1">
                Under Contract
              </span>
            </div>
          )}

          {/* Hover overlay with atmosphere */}
          <motion.div
            className="absolute inset-0 bg-black/40 flex items-end p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-heading text-white/90 text-lg italic leading-relaxed">
              {property.atmosphere || "Where light meets living"}
            </p>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-5 space-y-2">
          <div className="flex items-baseline justify-between">
            <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground">
              {property.title}
            </h3>
            <span className="font-mono text-xs tracking-wider text-muted-foreground">
              {formatPrice(property.price)}
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
            <span>{property.bedrooms} BD</span>
            <span className="text-border">|</span>
            <span>{property.bathrooms} BA</span>
            <span className="text-border">|</span>
            <span>{property.sqft?.toLocaleString()} SF</span>
          </div>

          <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
            {property.city}, {property.state}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
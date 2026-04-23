import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";

export default function Portfolio() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data: properties = [] } = useQuery({
    queryKey: ["properties-featured"],
    queryFn: () => base44.entities.Property.list("-created_date", 10),
    initialData: [],
  });

  useEffect(() => {
    const container = containerRef.current;
    const scrollEl = scrollRef.current;
    if (!container || !scrollEl) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (rect.height)));
        setScrollProgress(progress);

        const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
        scrollEl.scrollLeft = progress * maxScroll;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [properties]);

  if (properties.length === 0) return null;

  return (
    <section ref={containerRef} className="relative" style={{ height: `${Math.max(200, properties.length * 25)}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="px-[8vw] pt-16 pb-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
                Curated Portfolio
              </p>
              <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95]">
                Florida
                <br />
                <span className="italic">Listings</span>
              </h2>
            </div>
            <div className="hidden md:block">
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground text-right">
                {String(Math.ceil(scrollProgress * properties.length) || 1).padStart(2, "0")} // {String(properties.length).padStart(2, "0")}
              </p>
              {/* Progress bar */}
              <div className="w-32 h-px bg-border mt-3 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-primary"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Structural rule */}
          <div className="w-full h-px structural-rule border-t mt-8" />
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="horizontal-scroll-section flex gap-6 md:gap-10 px-[8vw] overflow-x-hidden pt-6 pb-20"
        >
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";

const SPACE_TYPES = ["Residence", "Penthouse", "Estate", "Modern Villa", "Townhouse"];
const LOCATIONS = ["Manhattan", "Brooklyn", "Hamptons", "Miami", "Los Angeles", "San Francisco"];
const PRICE_RANGES = ["Under $500K", "$500K – $1M", "$1M – $3M", "$3M – $5M", "$5M – $10M", "$10M+"];

const priceMap = {
  "Under $500K": "under_500k",
  "$500K – $1M": "500k_1m",
  "$1M – $3M": "1m_3m",
  "$3M – $5M": "3m_5m",
  "$5M – $10M": "5m_10m",
  "$10M+": "10m_plus",
};

const typeMap = {
  "Residence": "residence",
  "Penthouse": "penthouse",
  "Estate": "estate",
  "Modern Villa": "modern_villa",
  "Townhouse": "townhouse",
};

function CycleSelector({ options, selected, onSelect, label }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-b-2 border-primary/40 hover:border-primary transition-colors px-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
      >
        {selected || label}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 top-full left-0 mt-2 bg-card border border-border shadow-xl min-w-[200px]"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => { onSelect(option); setIsOpen(false); }}
                className="block w-full text-left px-4 py-3 font-heading text-lg hover:bg-secondary transition-colors focus:outline-none focus:bg-secondary"
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function DiscoveryQuestionnaire() {
  const [spaceType, setSpaceType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.error("Please provide your name and email.");
      return;
    }
    setIsSubmitting(true);
    await base44.entities.Inquiry.create({
      name,
      email,
      space_type: typeMap[spaceType] || "residence",
      location: location || "Not specified",
      price_range: priceMap[priceRange] || "1m_3m",
      type: "general",
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Your inquiry has been received. We'll be in touch soon.");
  };

  if (isSubmitted) {
    return (
      <section className="py-24 md:py-32 px-[8vw] border-t structural-rule">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-4">Thank you.</h2>
          <p className="text-muted-foreground text-lg">
            We'll begin curating your experience shortly.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-[8vw] border-t structural-rule">
      <div className="max-w-4xl">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-8">
          Discovery
        </p>

        {/* The Statement */}
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-[1.3] text-foreground mb-12">
          I am looking for a{" "}
          <CycleSelector
            options={SPACE_TYPES}
            selected={spaceType}
            onSelect={setSpaceType}
            label="Space Type"
          />{" "}
          in{" "}
          <CycleSelector
            options={LOCATIONS}
            selected={location}
            onSelect={setLocation}
            label="Location"
          />{" "}
          for{" "}
          <CycleSelector
            options={PRICE_RANGES}
            selected={priceRange}
            onSelect={setPriceRange}
            label="Price Range"
          />
          .
        </h2>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mb-8">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-border h-12 font-body text-base focus:ring-primary"
          />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-border h-12 font-body text-base focus:ring-primary"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 font-mono text-xs tracking-[0.2em] uppercase"
        >
          {isSubmitting ? "Sending..." : "Begin Discovery"}
          {!isSubmitting && <ArrowRight className="w-4 h-4 ml-3" />}
        </Button>
      </div>
    </section>
  );
}
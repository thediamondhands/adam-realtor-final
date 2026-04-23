import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Zillow Reviewer",
    location: "Bradenton, FL",
    text: "I recently had the pleasure of working with Adam Lester to sell my home in Bradenton, FL, and I cannot recommend him highly enough. Adam was the epitome of professionalism — knowledgeable, responsive, and truly dedicated to getting the best outcome for his clients.",
    stars: 5,
    source: "Zillow",
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-[8vw]">
      <div className="w-full h-px structural-rule border-t mb-16" />

      <div className="mb-12">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
          Client Reviews
        </p>
        <h2 className="font-heading text-4xl md:text-6xl font-light leading-[0.95]">
          What Clients
          <br />
          <span className="italic">Are Saying</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="border border-border p-8"
          >
            <Stars count={t.stars} />
            <p className="text-foreground leading-relaxed mb-8 font-body">
              "{t.text}"
            </p>
            <div className="border-t structural-rule pt-4">
              <p className="font-heading text-lg font-light">{t.name}</p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">
                {t.location} · {t.source}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://www.google.com/search?q=Adam+Lester+Realtor+Florida+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase hover:text-foreground transition-colors"
        >
          View all reviews on Google →
        </a>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";

export default function Advisory() {
  return (
    <section className="py-24 md:py-32 px-[8vw]">
      <div className="w-full h-px structural-rule border-t mb-16" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Left - Image */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src="https://media.base44.com/images/public/69e9765ab76b60a63d59c206/74c54e1b8_generated_dd65a5e3.png"
              alt="Elegant modern office with natural light and marble surfaces"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <p className="font-mono text-[9px] tracking-[0.15em] text-white/50">
                THE ADVISORY
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6">
            The Approach
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-[0.95] mb-8">
            Not a salesperson.
            <br />
            <span className="italic">A consultant.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mb-6">
            Every property tells a story of craftsmanship, light, and intention.
            My role is to understand the life you're designing and match it with
            architecture that elevates your daily experience.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-lg mb-8">
            With over a decade of navigating luxury real estate markets, I bring
            a curatorial eye and an advisor's discretion to every engagement.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t structural-rule">
            <div>
              <p className="font-heading text-3xl md:text-4xl font-light text-foreground">150+</p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">
                Properties Placed
              </p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-light text-foreground">$2B+</p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">
                Transaction Volume
              </p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-light text-foreground">12</p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">
                Years of Practice
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="pt-28 pb-24 px-[8vw]">
      {/* Header */}
      <div className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
          About
        </p>
        <h1 className="font-heading text-5xl md:text-7xl font-light leading-[0.95]">
          Adam <span className="italic">Lester</span>
        </h1>
      </div>

      <div className="w-full h-px structural-rule border-t mb-16" />

      {/* Intro section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-[3/4] overflow-hidden max-w-xs mx-auto lg:max-w-none">
            <img
              src="https://media.base44.com/images/public/69e9765ab76b60a63d59c206/c8438e106_adamlester.png"
              alt="Adam Lester, Realtor"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6">
            Realtor®  ·  MidWest Florida
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-[0.95] mb-8">
            A full-service approach,
            <br />
            <span className="italic">without the shortcuts.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mb-6">
            I am a full-time Realtor® serving Manatee, Sarasota, Pinellas, and Hillsborough County. My practice is primarily focused on listings, but I take on a limited number of qualified buyers so every client receives my complete attention.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-lg">
            Real estate is a relationship business. My goal is to make the process feel considered and transparent — from the first conversation to the closing table — so the outcome reflects the care that went into it.
          </p>
        </motion.div>
      </div>

      {/* Philosophy / principles */}
      <div className="w-full h-px structural-rule border-t mb-16" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
            Philosophy
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light leading-[1.05]">
            How I <span className="italic">work.</span>
          </h2>
        </motion.div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "Availability",
              body: "Seven days a week, 365 days a year. Your questions do not wait until Monday.",
            },
            {
              title: "Discretion",
              body: "Quiet, careful representation. Sensitive transactions are handled with the privacy they deserve.",
            },
            {
              title: "Local Expertise",
              body: "A focused footprint across the Gulf Coast markets I know best, rather than a territory stretched too thin.",
            },
            {
              title: "Results",
              body: "Clear strategy, considered pricing, and a marketing standard built around how a home is actually perceived.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-t structural-rule pt-6"
            >
              <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-3">
                0{i + 1}
              </p>
              <h3 className="font-heading text-2xl font-light mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coverage */}
      <div className="w-full h-px structural-rule border-t mb-16" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
            Coverage
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light leading-[1.05]">
            Where I <span className="italic">serve.</span>
          </h2>
        </motion.div>

        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Manatee", "Sarasota", "Pinellas", "Hillsborough"].map((county) => (
            <div
              key={county}
              className="border-t structural-rule pt-6"
            >
              <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-2">
                County
              </p>
              <p className="font-heading text-xl font-light">{county}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="w-full h-px structural-rule border-t mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        <div className="lg:col-span-6">
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
            Get in touch
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light leading-[1] mb-6">
            Ready when <span className="italic">you are.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
            Whether you are preparing to list or just beginning to explore the market, I am happy to have the conversation.
          </p>
          <Link
            to="/inquiry"
            className="inline-block font-mono text-[11px] tracking-[0.25em] uppercase border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
          >
            Begin an inquiry →
          </Link>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-1 gap-3 lg:pt-8 lg:border-t structural-rule">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Phone</span>
            <a
              href="tel:9415801655"
              className="font-heading text-xl font-light text-foreground hover:text-primary transition-colors"
            >
              (941) 580-1655
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Email</span>
            <a
              href="mailto:Contact.AdamLester@gmail.com"
              className="font-heading text-lg font-light text-foreground hover:text-primary transition-colors break-all"
            >
              Contact.AdamLester@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Instagram</span>
            <a
              href="https://www.instagram.com/FL_Realtor_Adam"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xl font-light text-foreground hover:text-primary transition-colors"
            >
              @FL_Realtor_Adam
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

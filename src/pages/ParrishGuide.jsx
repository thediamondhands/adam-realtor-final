import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";

const PAGE_TITLE = "Adam Lester | Expert Real Estate Agent in Parrish, FL";
const PAGE_DESCRIPTION =
  "Looking for a home in Parrish? Realtor Adam Lester specializes in Parrish, FL new construction and luxury resales. Explore North River Ranch, Silverleaf, and Twin Rivers. Call (941) 580-1655.";
const CANONICAL_URL = "https://adamlesterrealtor.com/parrish-fl-real-estate-guide";
const HERO_IMAGE =
  "https://media.base44.com/images/public/69e9765ab76b60a63d59c206/2276e8f7c_generated_image.png";

const NEIGHBORHOODS = [
  {
    name: "North River Ranch",
    tagline: "Active Lifestyle & New Construction",
    body: "Master-planned living with miles of trails, resort-style amenities, and a deep roster of new-build options from the area's leading builders. Ideal for buyers seeking modern floor plans without sacrificing community.",
  },
  {
    name: "Silverleaf",
    tagline: "Family-Centric Amenities",
    body: "A gated community designed around family life — clubhouse, fitness center, resort pool, dog park, and a calendar of resident events. Single-family homes from established builders on well-considered streetscapes.",
  },
  {
    name: "Twin Rivers",
    tagline: "Private Estate-Style Living",
    body: "Generous half-acre to multi-acre homesites along the Manatee River with private boat ramps, equestrian trails, and a quiet, low-density feel. The right fit for buyers prioritizing space, privacy, and natural surroundings.",
  },
  {
    name: "Harrison Ranch",
    tagline: "Trails & Community Focus",
    body: "Established neighborhood with mature landscaping, a heated junior-Olympic pool, fitness center, and a dedicated activity director. Five miles of nature trails connect the community to its surrounding preserves.",
  },
];

export default function ParrishGuide() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const setMeta = (selector, attr, value, createTag) => {
      let el = document.head.querySelector(selector);
      const created = !el;
      if (!el && createTag) {
        el = createTag();
        document.head.appendChild(el);
      }
      const previous = el ? el.getAttribute(attr) : null;
      if (el) el.setAttribute(attr, value);
      return { el, previous, created };
    };

    const description = setMeta(
      'meta[name="description"]',
      "content",
      PAGE_DESCRIPTION,
      () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        return m;
      }
    );

    const ogTitle = setMeta(
      'meta[property="og:title"]',
      "content",
      PAGE_TITLE,
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:title");
        return m;
      }
    );

    const ogDescription = setMeta(
      'meta[property="og:description"]',
      "content",
      PAGE_DESCRIPTION,
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        return m;
      }
    );

    const ogUrl = setMeta(
      'meta[property="og:url"]',
      "content",
      CANONICAL_URL,
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:url");
        return m;
      }
    );

    const canonical = setMeta(
      'link[rel="canonical"]',
      "href",
      CANONICAL_URL,
      () => {
        const l = document.createElement("link");
        l.setAttribute("rel", "canonical");
        return l;
      }
    );

    return () => {
      document.title = previousTitle;
      const restore = (entry) => {
        if (!entry.el) return;
        if (entry.created) {
          entry.el.remove();
        } else if (entry.previous !== null) {
          const attr = entry.el.hasAttribute("content") ? "content" : "href";
          entry.el.setAttribute(attr, entry.previous);
        }
      };
      restore(description);
      restore(ogTitle);
      restore(ogDescription);
      restore(ogUrl);
      restore(canonical);
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[70vh] md:h-[85vh] lg:h-screen">
          <div className="absolute inset-0">
            <img
              src={HERO_IMAGE}
              alt="Parrish, Florida — luxury home exterior at dusk"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-[8vw] pb-12 md:pb-[10vh]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-xs tracking-[0.3em] text-white/70 uppercase mb-4">
                Parrish · Manatee County · Florida
              </p>
              <h1 className="font-heading text-white text-4xl sm:text-5xl md:text-6xl lg:text-[6.5vw] leading-[0.95] font-light max-w-5xl">
                Discover Parrish:
                <br />
                <span className="italic font-light">
                  Florida's Fastest-Growing Community
                </span>
              </h1>
              <p className="mt-8 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
                Expert Guidance in Manatee County Real Estate — from new
                construction in North River Ranch to private estate homes along
                the Manatee River.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  to="/inquiry"
                  className="inline-flex items-center gap-3 bg-white text-black font-mono text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-white/90 transition-colors"
                >
                  Get Your Free Parrish Home Valuation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:9415801655"
                  className="font-heading text-white text-xl font-light hover:opacity-70 transition-opacity"
                >
                  (941) 580-1655
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12 flex items-center gap-4"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase">
                Explore the guide
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ArrowDown className="w-4 h-4 text-white/50" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-[8vw] pt-24 md:pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
              The Parrish Market
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light leading-[1.05]">
              A community on the <span className="italic">rise.</span>
            </h2>
          </motion.div>

          <motion.div
            className="lg:col-span-7 lg:col-start-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              Parrish has quickly become one of the most sought-after places to
              live in Manatee County — a balance of new construction, luxury
              resales, and a small-town pace within reach of Sarasota, St.
              Petersburg, and Tampa. Whether you are relocating, upsizing, or
              investing, the right neighborhood depends on lifestyle as much as
              square footage.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              As a full-time Realtor® based here, I help buyers compare
              communities, negotiate new-build incentives, and identify resale
              opportunities before they become widely known. Every conversation
              starts with what you need — not what is convenient to sell.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="px-[8vw] py-20 md:py-24">
        <div className="w-full h-px structural-rule border-t mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Featured Neighborhoods
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light leading-[0.95]">
              Where to <span className="italic">live.</span>
            </h2>
          </motion.div>

          <motion.div
            className="lg:col-span-6 lg:col-start-7 flex items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Four communities that define the breadth of the Parrish market —
              from amenity-rich master plans to private acreage along the river.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {NEIGHBORHOODS.map((n, i) => (
            <motion.article
              key={n.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-t structural-rule pt-8"
            >
              <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-3">
                0{i + 1} · {n.tagline}
              </p>
              <h3 className="font-heading text-3xl md:text-4xl font-light mb-4">
                {n.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {n.body}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-[8vw] py-24 md:py-32">
        <div className="w-full h-px structural-rule border-t mb-16" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Free Home Valuation
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-[1] mb-8">
              Know what your <span className="italic">Parrish home</span> is
              worth.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg mb-10">
              A complimentary, no-obligation valuation built on current Parrish
              comparables, neighborhood demand, and the specifics of your home —
              not a generic algorithm.
            </p>
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-3 bg-foreground text-background font-mono text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:opacity-90 transition-opacity"
            >
              Get Your Free Parrish Home Valuation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 grid grid-cols-1 gap-3 lg:pt-8 lg:border-t structural-rule">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Phone
              </span>
              <a
                href="tel:9415801655"
                className="font-heading text-xl font-light text-foreground hover:text-primary transition-colors"
              >
                (941) 580-1655
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Email
              </span>
              <a
                href="mailto:Contact.AdamLester@gmail.com"
                className="font-heading text-base font-light text-foreground hover:text-primary transition-colors break-all"
              >
                Contact.AdamLester@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Office
              </span>
              <span className="font-heading text-base font-light text-foreground">
                10905 Erie Rd, Parrish, FL 34219
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Service Areas footer link back to homepage */}
      <section className="px-[8vw] pb-16">
        <div className="w-full h-px structural-rule border-t mb-8" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Service Areas
          </p>
          <Link
            to="/"
            className="font-mono text-[11px] tracking-[0.25em] uppercase border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
          >
            ← All Service Areas & Home
          </Link>
        </div>
      </section>
    </div>
  );
}

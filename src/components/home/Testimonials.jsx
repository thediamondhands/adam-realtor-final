import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Krissy Von Braunsberg",
    text: "Adam is great to work with! His communication is excellent and he was always quick to respond. He is very knowledgeable and made the entire process smooth from start to finish.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Orlando Oliva",
    text: "I recently had the pleasure of working with Adam Lester, to sell my home in Bradenton, FL, and I cannot recommend him highly enough. Adam was the epitome of professionalism — knowledgeable, responsive, and truly dedicated to getting the best outcome for his clients.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Oscar Martinez",
    text: "Adam was great to work with. He consistently went above and beyond to help us. He was knowledgeable, responsive, and made everything feel easy. We highly recommend him if you're looking to buy or sell a home!",
    stars: 5,
    source: "Google",
  },
  {
    name: "Andrew Garcia-Garrison",
    text: "Adam was great to work with! He assisted with getting a loan to closing when he wasn't even the agent tied to the transaction — recommend 10/10!",
    stars: 5,
    source: "Google",
  },
  {
    name: "Sandra Frankel",
    text: "I met Adam at an open house in my neighborhood. I was struggling to find buyers. Adam took charge, set up open houses and got my home sold. He was professional, communicative, and truly went above and beyond.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Carrie Schauer",
    text: "Adam was the first professional realtor I've ever seen go out of his way to make sure the house was perfect before listing. His dedication and attention to detail set him apart from the rest.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Abigail Lester",
    text: "Adam is brilliant! His professionalism, market knowledge, and attention to detail are exceptional. Highly recommend Adam for anyone looking to buy or sell!",
    stars: 5,
    source: "Google",
  },
  {
    name: "Dawn Daly",
    text: "Adam was a pleasure in which to do business. My brothers and I do not live in Florida where we were selling the property, and Adam handled everything seamlessly on our behalf. Could not have asked for a better experience.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Levi Courtney",
    text: "Adam is very diligent and responsive. If the lender needed something today he would make it happen.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Paul Albert",
    text: "Young guy but amazing... the help I got from him was unprecedented. I could not have asked for a better agent. He went far and beyond. Thanks again Adam.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Charles Hutsell",
    text: "5-star experience working with Adam. Professional, knowledgeable, and a true pleasure to work with from start to finish.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Chris Grassmeyer",
    text: "Adam was a pleasure to work with. He was always quick to get back with us with answers to our questions. He was very knowledgeable about the market and made the whole process easy.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Home Pro Solutions LLC",
    text: "Adam is the guy you want in your corner. His strong work ethics not only ensures a tight bond with local tradesman, but guarantees his clients the best possible outcome on every transaction.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Michael Druss",
    text: "Adam is driven, intelligent, hardworking, loyal and honest. He has a propensity to be fully dedicated to his client. His commitment to excellence is unmatched.",
    stars: 5,
    source: "Google",
  },
  {
    name: "Lauren Owen",
    text: "Adam is such a nice guy and went above and beyond to get us our dream home. It was a stressful process but he was there every step of the way. We really appreciate all his hard work.",
    stars: 5,
    source: "Google",
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
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="border border-border p-8"
          >
            <Stars count={t.stars} />
            <p className="text-foreground leading-relaxed mb-8 font-body">
              "{t.text}"
            </p>
            <div className="border-t structural-rule pt-4">
              <p className="font-heading text-lg font-light">{t.name}</p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">
                {t.source}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://www.google.com/search?q=Adam+Lester+Realtor+Dalton+Wade+Florida"
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
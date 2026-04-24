import { useEffect, useRef } from "react";
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

function ReviewCard({ t }) {
  return (
    <div className="flex-shrink-0 w-80 border border-border p-7 bg-background">
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-foreground leading-relaxed mb-6 font-body text-sm line-clamp-5">
        "{t.text}"
      </p>
      <div className="border-t structural-rule pt-4">
        <p className="font-heading text-base font-light">{t.name}</p>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">
          {t.source}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position -= speed;
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(position) >= halfWidth) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-24 md:py-32">
      <div className="px-[8vw]">
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
      </div>

      {/* Infinite scroll track */}
      <div className="overflow-hidden w-full">
        <div ref={trackRef} className="flex gap-6 w-max">
          {doubled.map((t, i) => (
            <ReviewCard key={i} t={t} />
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <a
          href="https://www.google.com/search?sca_esv=678aa669decbf740&hl=en-US&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOanEKzpkv7B0dhyzIP46tQLrz7P4DiOdLLYML9TMyKtCJ-iKUoz-NH3jwTWEqzEeV-84_k309IaBWmmJDAy3lgQqxTlnSKfdDpvjuVWSTWo_TuejuA%3D%3D&q=Adam+Lester,+Realtor+Reviews&sa=X&ved=2ahUKEwje5qW714aUAxUw2ckDHUNYOQkQ0bkNegQIIhAH&biw=1920&bih=945&dpr=1"
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

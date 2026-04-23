import DiscoveryQuestionnaire from "../components/home/DiscoveryQuestionnaire";

export default function Inquiry() {
  return (
    <div className="pt-28 pb-24 px-[8vw]">
      <div className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
          Get in Touch
        </p>
        <h1 className="font-heading text-5xl md:text-7xl font-light leading-[0.95]">
          Start an <span className="italic">Inquiry</span>
        </h1>
      </div>
      <div className="w-full h-px structural-rule border-t mb-16" />
      <DiscoveryQuestionnaire />
    </div>
  );
}
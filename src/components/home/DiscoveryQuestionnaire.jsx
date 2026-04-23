import { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function DiscoveryQuestionnaire() {
  const [form, setForm] = useState({ needs: "", name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      toast.error("Please provide your name and phone number.");
      return;
    }
    setIsSubmitting(true);
    await base44.entities.Inquiry.create({
      name: form.name,
      phone: form.phone,
      message: form.needs,
      type: "general",
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="discovery" className="py-24 md:py-32 px-[8vw] border-t structural-rule">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg mx-auto"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-4">Thank you!</h2>
          <p className="text-muted-foreground text-lg">
            Adam will personally reach out to you shortly.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="discovery" className="py-24 md:py-32 px-[8vw] border-t structural-rule">
      <div className="max-w-2xl">
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6">
          Free Consultation
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-light mb-4">
          Let's Talk Real Estate
        </h2>
        <p className="text-muted-foreground mb-10 max-w-lg">
          Interested in a free consultation, your home's value, MLS buyer home search, or recommended lending partners? Fill out this quick form and Adam will personally reach out.
        </p>
        <p className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground mb-10">
          No ads, no spam, just friendly real estate advice.
        </p>

        <div className="flex flex-col gap-5">
          <div>
            <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 block">
              Tell Adam about your real estate needs *
            </label>
            <Textarea
              placeholder="Describe your property, location, what kind of help or information you are looking for..."
              value={form.needs}
              onChange={(e) => setForm({ ...form, needs: e.target.value })}
              className="bg-transparent border-border font-body text-base resize-none h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 block">
                Name *
              </label>
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-transparent border-border h-12 font-body text-base"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 block">
                Phone Number *
              </label>
              <Input
                placeholder="Your phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-transparent border-border h-12 font-body text-base"
              />
            </div>
          </div>

          <div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 font-mono text-xs tracking-[0.2em] uppercase"
            >
              {isSubmitting ? "Sending..." : "Submit"}
              {!isSubmitting && <ArrowRight className="w-4 h-4 ml-3" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
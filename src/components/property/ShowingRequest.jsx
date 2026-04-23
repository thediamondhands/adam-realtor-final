import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export default function ShowingRequest({ property, isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please provide your name, email, and phone number.");
      return;
    }
    setIsSubmitting(true);
    await base44.entities.Inquiry.create({
      ...formData,
      property_id: property.id,
      type: "showing_request",
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Showing request submitted.");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center px-[8vw]"
        >
          <button
            onClick={() => { onClose(); setIsSubmitted(false); }}
            className="absolute top-6 right-[8vw] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-60 transition-opacity"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-light mb-4">Request Received.</h2>
              <p className="text-muted-foreground">We'll arrange your private showing shortly.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-lg"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
                Private Showing
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-light mb-2">
                {property.title}
              </h2>
              <p className="text-muted-foreground mb-10">
                {property.city}, {property.state}
              </p>

              <div className="space-y-4">
                <Input
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-transparent h-12"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent h-12"
                />
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-transparent h-12"
                />
                <Textarea
                  placeholder="Preferred date/time or any notes"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent min-h-[100px]"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-mono text-xs tracking-[0.2em] uppercase"
                >
                  {isSubmitting ? "Submitting..." : "Request Showing"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-3" />}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
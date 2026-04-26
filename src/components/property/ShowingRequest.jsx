import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export default function ShowingRequest({ property, isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({ name: false, phone: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    // Reset errors
    setErrors({ name: false, phone: false });

    // Validate
    if (!formData.name || !formData.phone) {
      setErrors({
        name: !formData.name,
        phone: !formData.phone
      });
      toast.error("Please provide your name and phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            message: formData.message,
            property_id: property.id,
            type: "showing_request",
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error) {
      console.error("Supabase Error:", error.message);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", message: "" });
      setErrors({ name: false, phone: false });
    }, 300);
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
            onClick={handleClose}
            className="absolute top-6 right-[8vw] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-60 transition-opacity"
          >
            <X className="w-6 h-6" />
          </button>

          {isSubmitted ? (
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
                Adam will personally reach out to you shortly to arrange your private showing.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="w-full max-w-lg"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
                Private Showing / Request More Information
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-light mb-2">{property.title}</h2>
              <p className="text-muted-foreground mb-10">{property.location}</p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-2 block ${errors.name ? "text-red-500" : "text-muted-foreground"}`}>
                      Name *
                    </label>
                    <Input
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (e.target.value) setErrors(prev => ({ ...prev, name: false }));
                      }}
                      className={`bg-transparent h-12 font-body text-base transition-colors ${
                        errors.name ? "border-red-500 focus-visible:ring-red-500" : "border-border"
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-2 block ${errors.phone ? "text-red-500" : "text-muted-foreground"}`}>
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (e.target.value) setErrors(prev => ({ ...prev, phone: false }));
                      }}
                      className={`bg-transparent h-12 font-body text-base transition-colors ${
                        errors.phone ? "border-red-500 focus-visible:ring-red-500" : "border-border"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 block">
                    Preferred date/time or notes
                  </label>
                  <Textarea
                    placeholder="Tell Adam when you'd like to visit or ask a question about this property..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-transparent border-border font-body text-base resize-none min-h-[120px]"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-mono text-xs tracking-[0.2em] uppercase"
                >
                  {isSubmitting ? "Sending..." : "Request Showing"}
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

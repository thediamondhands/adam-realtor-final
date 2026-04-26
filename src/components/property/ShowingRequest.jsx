import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient"; // Updated to use your Supabase client
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export default function ShowingRequest({ property, isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({}); // Track validation errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.message.trim()) newErrors.message = "Notes are required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill out the required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert into your Supabase 'inquiries' table
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
      toast.success("Showing request submitted.");
    } catch (error) {
      console.error("Supabase Error:", error.message);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center px-[8vw]"
        >
          <button
            onClick={() => { onClose(); setIsSubmitted(false); setErrors({}); }}
            className="absolute top-6 right-[8vw] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-60 transition-opacity"
          >
            <X className="w-6 h-6" />
          </button>

          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-light mb-4">Request Received.</h2>
              <p className="text-muted-foreground">We'll arrange your private showing shortly.</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
                Private Showing / Request More Information
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-light mb-2">{property.title}</h2>
              <p className="text-muted-foreground mb-10">{property.location}</p>

              <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-1">
                  <Input
                    placeholder="Full name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`bg-transparent h-12 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 uppercase tracking-wider">{errors.name}</p>}
                </div>

                {/* Phone Field */}
                <div className="space-y-1">
                  <Input
                    type="tel"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`bg-transparent h-12 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 uppercase tracking-wider">{errors.phone}</p>}
                </div>

                {/* Notes Field */}
                <div className="space-y-1">
                  <Textarea
                    placeholder="Preferred date/time or any notes *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`bg-transparent min-h-[100px] ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 uppercase tracking-wider">{errors.message}</p>}
                </div>

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

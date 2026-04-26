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
  const [errors, setErrors] = useState({});
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

    console.log("🔍 Submitting with property:", property?.title);

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            message: formData.message,
            // Removed property_id since the column doesn't exist
            type: "showing_request",
            // Optional: Add property title to message so you know which property it was for
            message: `${formData.message}\n\nProperty: ${property?.title || 'Unknown'}`,
          }
        ])
        .select();

      if (error) {
        console.error("❌ Supabase Error:", error);
        toast.error(`Error: ${error.message}`);
        throw error;
      }

      console.log("✅ Success:", data);
      setIsSubmitted(true);
      toast.success("Showing request submitted!");
    } catch (error) {
      console.error("❌ Full error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrors({});
    setFormData({ name: "", phone: "", message: "" });
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
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="absolute top-6 right-[8vw] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-60 transition-opacity"
          >
            <X className="w-6 h-6" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg text-center"
          >
            {isSubmitted ? (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 mx-auto">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-light mb-4">Thank you!</h2>
                <p className="text-muted-foreground text-lg">
                  Adam will personally reach out to you shortly.
                </p>
              </>
            ) : (
              <>
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
                  PRIVATE SHOWING / REQUEST MORE INFORMATION
                </p>
                <h2 className="font-heading text-4xl md:text-5xl font-light mb-2">
                  {property.title}
                </h2>
                <p className="text-muted-foreground mb-10">{property.location}</p>

                <div className="space-y-6">
                  <div className="space-y-1">
                    <Input
                      placeholder="Full name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`bg-transparent h-12 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 uppercase tracking-wider">{errors.name}</p>}
                  </div>

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
                    {isSubmitting ? "Submitting..." : "REQUEST SHOWING"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-3" />}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyGallery from "../components/property/PropertyGallery";
import PropertyInfo from "../components/property/PropertyInfo";
import ShowingRequest from "../components/property/ShowingRequest";

export default function PropertyDetail() {
  const [showingOpen, setShowingOpen] = useState(false);

  // Get the slug from the URL path
  const pathParts = window.location.pathname.split("/");
  const slug = pathParts[pathParts.length - 1];

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', slug) // Use the slug column here
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
  // ... rest of the file

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 px-[8vw]">
        <h1 className="font-heading text-4xl font-light">Property not found</h1>
        <Link to="/listings">
          <Button variant="outline" className="font-mono text-xs tracking-[0.2em] uppercase">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Listings
          </Button>
        </Link>
      </div>
    );
  }

  const backTo = property.status === "sold" ? "/sold" : "/listings";
  const backLabel = property.status === "sold" ? "Back to Sold" : "Back to Listings";

  return (
    <div className="pt-20">
      {/* Back button */}
      <div className="px-[8vw] py-4">
        <Link to={backTo} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors uppercase">
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </Link>
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left - Gallery */}
        <div className="h-[60vh] lg:h-auto">
          <PropertyGallery images={property.images} />
        </div>

        {/* Right - Info */}
        <div className="px-[8vw] lg:px-12 py-12 lg:py-16">
          <PropertyInfo property={property} />

          {/* CTA */}
          <div className="mt-12 pt-8 border-t structural-rule">
            {property.status === "sold" ? (
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                This property has been sold.
              </p>
            ) : (
              <Button
                onClick={() => setShowingOpen(true)}
                className="h-14 px-10 bg-foreground text-background hover:bg-foreground/90 font-mono text-xs tracking-[0.2em] uppercase"
              >
                Request Private Showing
                <ArrowRight className="w-4 h-4 ml-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <ShowingRequest
        property={property}
        isOpen={showingOpen}
        onClose={() => setShowingOpen(false)}
      />
    </div>
  );
}

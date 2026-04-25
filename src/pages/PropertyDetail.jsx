import { useState, useEffect } from "react";
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
  const [imageUrls, setImageUrls] = useState([]);

  const pathParts = window.location.pathname.split("/");
  const slug = pathParts[pathParts.length - 1];

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // === FIXED IMAGE FETCHING ===
  useEffect(() => {
    async function fetchImages() {
      if (!property?.slug) {
        console.log("⏳ Waiting for property data to load...");
        return;
      }

      console.log("🔍 Fetching images for:", property.slug);

      const { data: files, error } = await supabase
        .storage
        .from('properties')
        .list(property.slug, {
          limit: 100,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) {
        console.error("❌ Storage list error:", error);
        const fallbackUrl = `https://lvuqqlvbuspfkakzxrsi.supabase.co/storage/v1/object/public/properties/${property.slug}/image1.jpg`;
        setImageUrls([fallbackUrl]);
        return;
      }

      const urls = files
        .filter(file => !file.name.startsWith('.'))
        .map(file => 
          `https://lvuqqlvbuspfkakzxrsi.supabase.co/storage/v1/object/public/properties/${property.slug}/${file.name}`
        );

      console.log(`✅ Loaded ${urls.length} images for ${property.slug}`);
      setImageUrls(urls);
    }

    fetchImages();
  }, [property]); // ← Changed back to full `property` (safer in this case)

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
      <div className="px-[8vw] py-4">
        <Link to={backTo} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors uppercase">
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="h-[60vh] lg:h-auto">
          <PropertyGallery images={imageUrls} />
        </div>

        <div className="px-[8vw] lg:px-12 py-12 lg:py-16">
          <PropertyInfo property={property} />
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

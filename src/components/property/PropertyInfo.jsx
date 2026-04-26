import { MapPin, Maximize, BedDouble, Bath, Calendar } from "lucide-react";

export default function PropertyInfo({ property }) {
  if (!property) return null;

  const formatPrice = (price) => {
    const numPrice = Number(price || property.price || 0);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const address = property.location || property.address || property.title || "";
  const encodedAddress = encodeURIComponent(address);
  const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    /* We are using mt-[40vh] to force the content to start 40% down the screen, 
       ensuring it clears the hero image and thumbnails entirely. */
    <div className="relative w-full mt-[45vh] md:mt-0 px-6 pb-20 bg-white">
      
      {/* Header */}
      <div className="py-8">
        <p className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-2">
          {property.property_type?.replace('_', ' ') || "Residence"}
        </p>
        <h1 className="text-4xl md:text-6xl font-light text-black mb-4">
          {property.title}
        </h1>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5 flex-shrink-0" />
          <span className="text-lg">{address}</span>
        </div>
      </div>

      {/* Price */}
      <div className="border-y border-gray-200 py-8 my-8">
        <p className="text-4xl font-light text-black">
          {formatPrice(property.price)}
        </p>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {[
          { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
          { icon: Bath, label: "Bathrooms", value: property.bathrooms },
          { icon: Maximize, label: "Sq. Ft.", value: property.sq_ft || property.sqft },
          { icon: Calendar, label: "Year Built", value: property.year_built },
        ].map(({ icon: Icon, label, value }) => (
          value && (
            <div key={label}>
              <Icon className="w-6 h-6 text-gray-400 mb-2" />
              <p className="text-2xl font-light">{value}</p>
              <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">{label}</p>
            </div>
          )
        ))}
      </div>

      {/* Description */}
      {property.description && (
        <div className="mt-12 pt-12 border-t border-gray-100">
          <p className="text-gray-800 leading-relaxed text-lg font-light whitespace-pre-wrap">
            {property.description}
          </p>
        </div>
      )}

      {/* Map */}
      <div className="mt-12 rounded-xl overflow-hidden h-[300px] border border-gray-200">
        <iframe width="100%" height="100%" src={embedUrl} style={{ border: 0 }}></iframe>
      </div>
    </div>
  );
}

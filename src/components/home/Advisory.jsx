import { motion } from "framer-motion";

export default function Advisory() {
  return (
    <section className="py-24 md:py-32 px-[8vw]">
      <div className="w-full h-px structural-rule border-t mb-16" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Left - Image */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          
          <div className="relative aspect-[3/4] overflow-hidden max-w-xs mx-auto lg:max-w-none">
            <img src="https://media.base44.com/images/public/69e9765ab76b60a63d59c206/c8438e106_adamlester.png"

            alt="Elegant modern office with natural light and marble surfaces" className="w-full h-full object-cover object-top" />

            
            <div className="absolute bottom-4 left-4">
              

              
            </div>
          </div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6">
            About Adam
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-[0.95] mb-8">
            Full-time.
            <br />
            <span className="italic">365 days a year.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mb-6">
            Realtor® in MidWest Florida, servicing Manatee, Sarasota, Pinellas, and Hillsborough County. I work primarily as a listing agent, but I take on a few qualified buyers at a time.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-lg mb-8">
            Contact me today for a free home evaluation — I'm available 7 days a week and committed to delivering results for every client.
          </p>

          {/* Contact */}
          <div className="grid grid-cols-1 gap-3 pt-8 border-t structural-rule">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Phone</span>
              <a href="tel:9415801655" className="font-heading text-xl font-light text-foreground hover:text-primary transition-colors">(941) 580-1655</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Email</span>
              <a href="mailto:Contact.AdamLester@gmail.com" className="font-heading text-xl font-light text-foreground hover:text-primary transition-colors">Contact.AdamLester@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Instagram</span>
              <a href="https://www.instagram.com/FL_Realtor_Adam" target="_blank" rel="noopener noreferrer" className="font-heading text-xl font-light text-foreground hover:text-primary transition-colors">@FL_Realtor_Adam</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}
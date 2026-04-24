import DiscoveryQuestionnaire from "../components/home/DiscoveryQuestionnaire";

export default function Inquiry() {
  return (
    <div className="pt-28 pb-24 px-[8vw]">

      <DiscoveryQuestionnaire />
    </div>
    
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
  );
}

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-[8vw] py-16 border-t structural-rule">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <h3 className="font-heading text-3xl font-light mb-4">Estate</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Curating exceptional living spaces for discerning clients who understand that a home is more than an address.
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-6">
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Navigate
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-sm text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/properties" className="text-sm text-foreground hover:text-primary transition-colors">Portfolio</Link>
            <Link to="/#discovery" className="text-sm text-foreground hover:text-primary transition-colors">Inquiry</Link>
          </div>
        </div>

        <div className="md:col-span-3 md:col-start-10">
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Contact
          </p>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>hello@estate.com</p>
            <p>+1 (212) 555-0100</p>
            <p>New York, NY</p>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t structural-rule flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
          © {new Date().getFullYear()} ESTATE. ALL RIGHTS RESERVED.
        </p>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
          CURATOR OF LIVING SPACES
        </p>
      </div>
    </footer>
  );
}
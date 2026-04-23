import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-[8vw] py-6 flex items-center justify-between transition-colors duration-500 ${isHome ? "text-white" : "text-foreground bg-background/80 backdrop-blur-md border-b structural-rule"}`}>
        <Link to="/" className="font-heading text-2xl tracking-wide">
          Estate
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="font-mono text-[11px] tracking-[0.2em] uppercase hover:opacity-60 transition-opacity"
          >
            Home
          </Link>
          <Link
            to="/properties"
            className="font-mono text-[11px] tracking-[0.2em] uppercase hover:opacity-60 transition-opacity"
          >
            Portfolio
          </Link>
          <Link
            to="/#discovery"
            className="font-mono text-[11px] tracking-[0.2em] uppercase hover:opacity-60 transition-opacity"
          >
            Inquiry
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col px-[8vw] py-6"
          >
            <div className="flex items-center justify-between mb-16">
              <Link to="/" className="font-heading text-2xl text-foreground" onClick={() => setMobileOpen(false)}>
                Estate
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {[
                { to: "/", label: "Home" },
                { to: "/properties", label: "Portfolio" },
                { to: "/#discovery", label: "Inquiry" },
              ].map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-5xl font-light text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
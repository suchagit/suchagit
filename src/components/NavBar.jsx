{/*
  //import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

import { useParams, Link } from "react-router-dom";

export default function NavBar() {
  const [invite, setInvite] = useState(null);

  const { inviteId: urlInviteId } = useParams(); // optional URL parameter
  const [inviteId, setInviteId] = useState(null); // actual validated inviteId
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
  async function validateInvite(id) {
      const { data, error } = await supabase
      .from("invites")
      .select("*")
      .eq("token", id)
      .single();

      if (error || !data) {
      console.error(error);
      return null;
      }
      return data;
  }

  async function initInvite() {
      let idToUse = urlInviteId || localStorage.getItem("inviteId");

      if (!idToUse) {
          setUnauthorized(true);
          setLoading(false);
          return;
      }

      const inviteData = await validateInvite(idToUse);

      if (!inviteData) {
          // invalid token
          setUnauthorized(true);
          setLoading(false);
          return;
      }

      // valid token, store it
      setInviteId(inviteData.token);
      localStorage.setItem("inviteId", inviteData.token);
      setInvite(inviteData);
      setUnauthorized(false);
      setLoading(false);
  }
  initInvite();
  }, [urlInviteId]);

  if (loading) return (
    <nav className="bg-peach text-brown shadow-md sticky top-0 z-50" />
  );
  if (unauthorized) return (
    <nav className="bg-peach text-brown shadow-md sticky top-0 z-50" />
  );
  if (!invite) return (
    <nav className="bg-peach text-brown shadow-md sticky top-0 z-50" />
  );


  return (
    <nav className="bg-peach text-brown shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="font-bold text-2xl tracking-wide">B&R</div>
        <div className="space-x-6 hidden sm:flex">
          <Link className="hover:text-copper transition-colors" to="/">Home</Link>
          <Link className="hover:text-copper transition-colors" to="/invite">Invitation</Link>
          <Link className="hover:text-copper transition-colors" to="/registry">Gifts</Link>
          <Link className="hover:text-copper transition-colors" to="/gallery">Gallery</Link>
          
          <a
            href="https://www.google.com/maps?q=Your+Wedding+Location"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-copper transition-colors"
          >
            Directions
          </a>
          
          <Link className="hover:text-copper transition-colors" to="/directions">Directions</Link>
        </div>
      </div>
    </nav>
  );
}

*/}

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [invite, setInvite] = useState(null);
  const { inviteId: urlInviteId } = useParams();
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function validateInvite(id) {
      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("token", id)
        .single();
      if (error || !data) {
        console.error(error);
        return null;
      }
      return data;
    }

    async function initInvite() {
      let idToUse = urlInviteId || localStorage.getItem("inviteId");
      if (!idToUse) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      const inviteData = await validateInvite(idToUse);
      if (!inviteData) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      localStorage.setItem("inviteId", inviteData.token);
      setInvite(inviteData);
      setUnauthorized(false);
      setLoading(false);
    }

    initInvite();
  }, [urlInviteId]);

  if (loading || unauthorized || !invite) {
    return <nav className="bg-peach text-brown shadow-md sticky top-0 z-50" />;
  }

  const links = [
    { label: "Home", to: "/" },
    { label: "Invitation", to: "/invite" },
    { label: "Gifts", to: "/registry" },
    { label: "Gallery", to: "/gallery" },
    { label: "Directions", to: "/directions" },
  ];

  // Dropdown link animation variants
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.25 },
    }),
  };

  return (
    <nav className="bg-peach text-brown shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">
        {/* Logo */}
        <div className="font-bold text-2xl tracking-wide">B&R</div>

        {/* Desktop links */}
        <div className="hidden sm:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.to}
              className="hover:text-copper transition-colors"
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger with hover & rotate */}
        <motion.button
          className="sm:hidden text-2xl z-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          animate={{ rotate: isOpen ? 90 : 0 }}
          whileHover={{ scale: 1.2, color: "#B87333" }} // scale + color on hover
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-label="Toggle menu"
        >
          ☰
        </motion.button>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="sm:hidden absolute top-full left-0 w-full bg-peach flex flex-col items-center space-y-4 py-4 shadow-md z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={linkVariants}
                  className="w-full text-center"
                >
                  <Link
                    className="text-lg font-semibold hover:text-copper transition-colors block py-2"
                    onClick={() => setIsOpen(false)}
                    to={link.to}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

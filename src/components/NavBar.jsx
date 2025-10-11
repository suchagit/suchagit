{/*
  import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInvite } from "../context/InviteContext";
import { supabase } from "../supabaseClient";

export default function NavBar() {
  const { invite, setInvite, unauthorized, setUnauthorized } = useInvite();
  const { inviteId: urlInviteId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [validated, setValidated] = useState(false); // new state

  useEffect(() => {
    async function validate(id) {
      if (!id) {
        setUnauthorized(true);
        setInvite(null);
        setValidated(true);
        return;
      }

      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("token", id)
        .single();

      if (error || !data) {
        setUnauthorized(true);
        setInvite(null);
      } else {
        setInvite(data);
        setUnauthorized(false);
        localStorage.setItem("inviteId", data.token);
      }

      setValidated(true); // mark validation complete
    }

    const tokenToCheck = urlInviteId || localStorage.getItem("inviteId");
    validate(tokenToCheck);
  }, [urlInviteId, setInvite, setUnauthorized]);

  // Hide NavBar until validation finishes
  if (!validated || unauthorized || !invite) return null;

  const links = [
    { label: "Home", to: "/" },
    { label: "Invitation", to: "/invite" },
    { label: "Gifts", to: "/registry" },
    { label: "Gallery", to: "/gallery" },
    { label: "Directions", to: "/directions" },
  ];

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
<div className="flex-1 flex justify-center md:justify-start">
      <img
        src="/assets/Logo.png"
        alt="Logo"
        className="h-8 w-auto object-contain ml-5 md:ml-4"
      />
    </div>


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

        <motion.button
          className="sm:hidden text-2xl z-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          animate={{ rotate: isOpen ? 90 : 0 }}
          whileHover={{ scale: 1.2, color: "#B87333" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-label="Toggle menu"
        >
          ☰
        </motion.button>

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
*/}

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInvite } from "../context/InviteContext";
import logo from "../assets/LogoLeaf.png";

export default function NavBar() {
  const { invite, unauthorized } = useInvite();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const logoRef = useRef(null);

  // ✅ Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        logoRef.current &&
        !logoRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (unauthorized || !invite) return null;

  const links = [
    { label: "Home", to: "/" },
    { label: "Invitation", to: "/invite" },
    { label: "Gifts", to: "/registry" },
    { label: "Gallery", to: "/gallery" },
    { label: "Directions", to: "/directions" },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.25 },
    }),
  };

  // ✅ Toggle logo click (mobile only)
  const handleLogoClick = () => {
    if (window.innerWidth < 640) setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-peach text-brown shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">

        {/* Logo (rotates when menu opens) */}
        <div className="flex-1 flex justify-center md:justify-start relative">
  {/* Container for click and scaling */}
  <motion.div
    ref={logoRef}
    onClick={handleLogoClick}
    className="relative inline-block cursor-pointer hover:scale-110 transition-transform duration-300"
  >
    {/* Rotating Logo Image (slow, 90 degrees) */}
    <motion.img
      src={logo}
      alt="Logo"
      animate={{ rotate: isOpen ? 120 : 0 }} // ✅ rotate 90° when open
      transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }} // ✅ slower rotation
      className="h-12 w-auto object-contain ml-6 md:ml-4 -my-2 drop-shadow-xl select-none"
    />

    {/* Overlay Text (upright, centered) */}
    <span className="absolute inset-0 flex items-center justify-center 
                 text-darkbrown text-lg sm:text-xl md:text-2xl 
                 font-wedding tracking-wide
                 pointer-events-none select-none ml-6 font-bold">
      B&R
    </span>
  </motion.div>
</div>


        {/* Desktop Links */}
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

        {/* Mobile Menu Toggle */}
        <motion.button
          ref={buttonRef}
          className="sm:hidden text-2xl z-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          animate={{ rotate: isOpen ? 90 : 0 }}
          whileHover={{ scale: 1.2, color: "#B87333" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-label="Toggle menu"
        >
          ☰
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
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

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
          {/* Removed /rsvp link */}
          <Link className="hover:text-copper transition-colors" to="/invite">Invitation</Link>
          <Link className="hover:text-copper transition-colors" to="/registry">Gifts</Link>
          <Link className="hover:text-copper transition-colors" to="/gallery">Gallery</Link>
          {/*<Link className="hover:text-copper transition-colors" to="/info">Info</Link>*/}
          {/*}
          <a
            href="https://www.google.com/maps?q=Your+Wedding+Location"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-copper transition-colors"
          >
            Directions
          </a>
          */}
          <Link className="hover:text-copper transition-colors" to="/directions">Directions</Link>
        </div>
      </div>
    </nav>
  );
}


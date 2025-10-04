{/*
// src/context/InviteContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const InviteContext = createContext();

export function InviteProvider({ children }) {
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    async function loadInvite() {
      let idToUse = localStorage.getItem("inviteId");

      if (!idToUse) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      // ✅ Use cached invite data first for instant rendering
      const cachedInvite = localStorage.getItem("inviteData");
      if (cachedInvite) {
        setInvite(JSON.parse(cachedInvite));
        setLoading(false);
      }

      // ✅ Validate in background (only once)
      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("token", idToUse)
        .single();

      if (!error && data) {
        setInvite(data);
        localStorage.setItem("inviteData", JSON.stringify(data));
        setUnauthorized(false);
      } else {
        setUnauthorized(true);
      }
      setLoading(false);
    }

    loadInvite();
  }, []);

  // Export helper actions (e.g., RSVP update)
  async function updateRsvpStatus(token, value) {
    const { data, error } = await supabase
      .from("invites")
      .update({ rsvp_status: value })
      .eq("token", token);

    if (!error && data) {
      const updatedInvite = { ...invite, rsvp_status: value };
      setInvite(updatedInvite);
      localStorage.setItem("inviteData", JSON.stringify(updatedInvite));
    }

    return { data, error };
  }

  return (
    <InviteContext.Provider value={{ invite, loading, unauthorized, updateRsvpStatus }}>
      {children}
    </InviteContext.Provider>
  );
}

export function useInvite() {
  return useContext(InviteContext);
}
*/}

import { createContext, useContext, useState } from "react";

const InviteContext = createContext();

export function InviteProvider({ children }) {
  const [invite, setInvite] = useState(null); // validated invite
  const [unauthorized, setUnauthorized] = useState(false); // tracks invalid token

  return (
    <InviteContext.Provider value={{ invite, setInvite, unauthorized, setUnauthorized }}>
      {children}
    </InviteContext.Provider>
  );
}

// Custom hook for easy access
export function useInvite() {
  return useContext(InviteContext);
}

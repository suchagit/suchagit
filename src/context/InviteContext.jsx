import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const InviteContext = createContext();

export function InviteProvider({ children }) {
  const [invite, setInvite] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);

  // Load invite from localStorage on startup
  useEffect(() => {
    async function loadInvite() {
      const storedToken = localStorage.getItem("inviteId");
      if (!storedToken) {
        setUnauthorized(true);
        return;
      }

      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("token", storedToken)
        .single();

      if (error || !data) {
        setUnauthorized(true);
      } else {
        setInvite(data);
        setUnauthorized(false);
      }
    }

    loadInvite();
  }, []);

  // Wrapper to update invite AND save token to localStorage
  function saveInvite(inviteData) {
    setInvite(inviteData);
    setUnauthorized(false);
    if (inviteData?.token) {
      localStorage.setItem("inviteId", inviteData.token);
    }
  }

  return (
    <InviteContext.Provider value={{ invite, saveInvite, unauthorized, setUnauthorized }}>
      {children}
    </InviteContext.Provider>
  );
}

export function useInvite() {
  return useContext(InviteContext);
}

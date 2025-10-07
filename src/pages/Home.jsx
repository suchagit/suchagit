{/*
    import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import heroImg from "../assets/SoftTulipsCropped4.png"//"../assets/br-hero.jpg";
import NavButton from "../components/NavButton";
import { useInvite } from "../context/InviteContext";

export default function Home() {
    const groomName = import.meta.env.VITE_NAME_GROOM;
    const brideName = import.meta.env.VITE_NAME_BRIDE; 

    const { invite, setInvite, unauthorized, setUnauthorized } = useInvite();
    const { inviteId: urlInviteId } = useParams();
    const navigate = useNavigate();

  useEffect(() => {
    async function validateInvite(id) {
      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("token", id)
        .single();
      if (error || !data) return null;
      return data;
    }

    async function init() {
      let idToUse = urlInviteId || localStorage.getItem("inviteId");
      if (!idToUse) {
        setUnauthorized(true);
        return;
      }

      const inviteData = await validateInvite(idToUse);
      if (!inviteData) {
        setUnauthorized(true);
        return;
      }

      // valid token → save to context and localStorage
      setInvite(inviteData);
      setUnauthorized(false);
      localStorage.setItem("inviteId", inviteData.token);
    }

    init();
  }, [urlInviteId, setInvite, setUnauthorized]);

  // Optionally, handle loading/unauthorized UI here
  //if (!invite && !unauthorized)
  //  return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  //if (unauthorized)
  //  return (
  //    <div className="min-h-screen flex items-center justify-center">
  //      <h2>Unauthorized access</h2>
  //    </div>
  //  );

    if (!invite && !unauthorized) return (
        <div className="min-h-screen bg-olive text-darkbrown font-body flex flex-col items-center">
            <div className="max-w-xl w-full bg-peach rounded-lg p-6 mt-8 shadow-lg text-center">
                <h2 className="text-2xl font-heading mb-4">Loading...</h2>
            </div>
        </div>
    );
    if (unauthorized) return (
        <div className="min-h-screen bg-olive text-darkbrown font-body flex flex-col items-center">
            <div className="max-w-xl w-full bg-peach rounded-lg p-6 mt-8 shadow-lg text-center">
                <h2 className="text-2xl font-heading mb-4">Unauthorised access</h2>
            </div>
        </div>
    );
    //if (!invite) return (
    //    <div className="min-h-screen bg-olive text-darkbrown font-body flex flex-col items-center">
    //        <div className="max-w-xl w-full bg-peach rounded-lg p-6 mt-8 shadow-lg text-center">
    //            <h2 className="text-2xl font-heading mb-4">Loading invitation...</h2>
    //        </div>
    //    </div>
    //);
    */}

    import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import heroImg from "../assets/SoftTulipsCropped4.png";
import NavButton from "../components/NavButton";
import { useInvite } from "../context/InviteContext";
import { supabase } from "../supabaseClient";

export default function Home() {
  const groomName = import.meta.env.VITE_NAME_GROOM;
  const brideName = import.meta.env.VITE_NAME_BRIDE;

  const { invite, saveInvite, unauthorized, setUnauthorized } = useInvite();
  const { inviteId: urlInviteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function validateInvite(id) {
      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("token", id)
        .single();
      if (error || !data) return null;
      return data;
    }

    async function init() {
      // Only run if we don't already have an invite
      if (invite || unauthorized) return;

      const idToUse = urlInviteId || localStorage.getItem("inviteId");
      if (!idToUse) {
        setUnauthorized(true);
        return;
      }

      const inviteData = await validateInvite(idToUse);
      if (!inviteData) {
        setUnauthorized(true);
        return;
      }

      // Save invite to context and localStorage
      saveInvite(inviteData);
    }

    init();
  }, [urlInviteId, invite, unauthorized, saveInvite, setUnauthorized]);

  // Loading / Unauthorized / Ready states
  if (unauthorized)
    return (
      <div className="min-h-screen bg-olive text-darkbrown font-body flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Unauthorized access</h2>
        </div>
      </div>
    );

  if (!invite)
    return (
      <div className="min-h-screen bg-olive text-darkbrown font-body flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Loading invitation...</h2>
        </div>
      </div>
    );
    
    return (
        <div className="text-brown">
            <div
                className="relative h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                <div className="bg-peach bg-opacity-80 p-8 rounded-xl text-center shadow-lg animate-fade-in mx-4 sm:mx-8">
                    <h1 className="text-6xl font-bold mb-4 tracking-wide text-center">
                        <span className="block sm:inline">{groomName}</span>{" "}
                        <span className="block sm:inline">&</span>{" "}
                        <span className="block sm:inline">{brideName}</span>
                    </h1>
                    <p className="text-2xl text-center flex flex-wrap justify-center items-center">
                        {/* Leading heart on wide screens */}
                        <span className="hidden sm:inline mr-1">💕</span>
                        {/* Main text */}
                        <span className="break-words">We can’t wait to celebrate with you</span>
                        {/* Trailing hearts */}
                        <span className="ml-1 mt-1 sm:mt-0">
                            {/* Wide screen: single trailing heart, narrow: both hearts */}
                            <span className="hidden sm:inline">💕</span>
                            <span className="sm:hidden">💕 💕</span>
                        </span>
                    </p>

                    {/*<p className="mt-4 text-lg">Explore your invitation, RSVP, and more</p>*/}
                    <div className="flex flex-col items-center gap-4 mt-6">
                        <NavButton to="/invite">Open Your Invitation</NavButton>
                    </div>
                </div>
            </div>
        </div>
    );
}


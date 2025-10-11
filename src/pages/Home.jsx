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

{/*    
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
                {/*
                <div className="bg-peach bg-opacity-80 p-8 rounded-xl text-center shadow-lg animate-fade-in mx-4 sm:mx-8">
                    {/*<h1 className="text-6xl font-bold mb-4 tracking-wide text-center">
                        <span className="block sm:inline">{groomName}</span>{" "}
                        <span className="block sm:inline">&</span>{" "}
                        <span className="block sm:inline">{brideName}</span>
                    </h1>
                    */}
{/*                    
                    <h1 className="text-6xl font-bold mb-4 tracking-wide text-center">
                        {invite.name}
                    </h1>
                    {/*<p className="text-2xl text-center flex flex-wrap justify-center items-center">
                        <span className="hidden sm:inline mr-1">💕</span>
                        <span className="break-words">we can't wait to celebrate with you</span>
                        <span className="ml-1 mt-1 sm:mt-0">
                            <span className="hidden sm:inline">💕</span>
                            <span className="sm:hidden">💕 💕</span>
                        </span>
                    </p>*/}
{/*                    

                    {/*<p className="mt-4 text-lg">Explore your invitation, RSVP, and more</p>*/}
{/*                    
                    <div className="flex flex-col items-center gap-4 mt-6">
                        <NavButton to="/invite">Open Your Invitation</NavButton>
                    </div>
                </div>
                */}
{/*                
            </div>
        </div>
    );
}
*/}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import heroImg from "../assets/SoftTulipsCropped4.png";
import NavButton from "../components/NavButton";
import { useInvite } from "../context/InviteContext";
import { supabase } from "../supabaseClient";
import envelopeFront from "../assets/EnvelopeFront.png";
import envelopeBack from "../assets/EnvelopeBack.png";
import "../Home.css";
import logoImg from "../assets/LogoLeaf.png"; // adjust path

function isSafari() {
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome/.test(ua);
}

export default function Home() {
  const groomName = import.meta.env.VITE_NAME_GROOM;
  const brideName = import.meta.env.VITE_NAME_BRIDE;

  const { invite, saveInvite, unauthorized, setUnauthorized } = useInvite();
  const { inviteId: urlInviteId } = useParams();
  const navigate = useNavigate();

  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  const safari = isSafari();


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
        {/* Envelope */}
        <div
          style={{
            width: "80%",
            maxWidth: "500px",
            aspectRatio: "1188 / 978",
            perspective: safari ? "none" : "1000px", // no perspective on Safari
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => {
            if (safari) {
              navigate("/invite"); // Just navigate on Safari
            } else {
              setFlipped(!flipped);
            }
          }}
          onMouseEnter={() => !safari && setHovered(true)}
          onMouseLeave={() => !safari && setHovered(false)}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transformStyle: safari ? "flat" : "preserve-3d",
              transition: "transform 0.8s ease-in-out",
              transform: safari ? "none" : flipped || hovered ? "rotateY(180deg)" : "none",
              position: "relative",
            }}
          >
            {/* Front */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backfaceVisibility: "hidden",
                backgroundImage: `url(${envelopeFront})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  color: "#8b3f05",
                  fontFamily: "Playfair Display, serif",
                  fontSize: "3rem",
                  fontWeight: 600,
                  textAlign: "center",
                  zIndex: 2,
                  pointerEvents: "none",
                  margin: 0,
                }}
              >
                {invite.name}
              </h1>

              <div
                style={{
                  position: "absolute",
                  top: "12%",
                  right: "4%",
                  width: "25%",
                  height: "auto",
                  zIndex: 3,
                }}
                className="relative inline-flex items-center justify-center pt-4"
              >
                <img
                  src={logoImg}
                  alt="Logo"
                  className="h-12 w-auto object-contain drop-shadow-xl select-none block"
                />

                <span
                  className="absolute flex items-center justify-center
                             text-darkbrown text-lg sm:text-xl md:text-2xl
                             font-wedding font-bold tracking-wide
                             pointer-events-none select-none"
                >
                  B&R
                </span>
              </div>
            </div>

            {/* Back */}
            {!safari && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  backfaceVisibility: "hidden",
                  backgroundImage: `url(${envelopeBack})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: "rotateY(180deg)",
                  borderRadius: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NavButton to="/invite" style={{ zIndex: 2 }}>
                  Open
                </NavButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}

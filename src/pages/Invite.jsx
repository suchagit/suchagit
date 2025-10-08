import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useInvite } from "../context/InviteContext";
import RsvpMessage from "../components/RsvpMessage";
import heroImg from "../assets/SoftTulipsCropped4.png";

export default function InvitePage() {
  const { invite, unauthorized, saveInvite } = useInvite();
  const [rsvpStatus, setRsvpStatus] = useState(invite?.rsvp_status || null);
  const navigate = useNavigate();

  const groomName = import.meta.env.VITE_NAME_GROOM;
  const brideName = import.meta.env.VITE_NAME_BRIDE;
  const rsvpDate = import.meta.env.VITE_RSVP_BY;
  const ceremonyAddress = import.meta.env.VITE_CEREMONY_ADDRESS;
  const weddingDate = import.meta.env.VITE_WEDDING_DATE;
  const ceremonyTime = import.meta.env.VITE_CEREMONY_TIME;
  const receptionLocation = import.meta.env.VITE_RECEPTION_LOCATION;
  const receptionTime = import.meta.env.VITE_RECEPTION_TIME;


// Only set once on initial invite load
useEffect(() => {
  if (invite && rsvpStatus === null) {
    setRsvpStatus(invite.rsvp_status || null);
  }
}, [invite]);

const handleRsvp = async (status) => {
  if (!invite?.token) return;

  // Immediately update UI
  setRsvpStatus(status);

  const { data, error } = await supabase
    .from("invites")
    .update({ rsvp_status: status })
    .eq("token", invite.token)
    .select()
    .single();

  if (error) {
    console.error(error);
    // Optional: revert state if backend fails
    setRsvpStatus(invite.rsvp_status);
    return;
  }

  // Update context safely, don't let it overwrite UI
  saveInvite({ ...invite, rsvp_status: status });
};

  // UI states
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
        <div className="relative min-h-screen bg-olive text-darkbrown font-body flex flex-col items-center px-4 sm:px-0">
<div
    className="absolute inset-0 w-full h-full bg-center bg-cover opacity-50 pointer-events-none"
    style={{ backgroundImage: `url(${heroImg})` }}
  ></div>

        {/* Main container */}
        <div className="relative max-w-xl w-full bg-peach rounded-lg shadow-lg text-center mt-6 mb-6 overflow-hidden pt-[70px] pb-[110px]">

            {/* Top frame */}
            <img
            src="/assets/RedClusterFrameTop.png"
            alt="Top Frame"
            className="absolute top-0 left-0 right-0 w-full z-10"
            />

            {/* Bottom frame */}
            <img
            src="/assets/RedClusterFrameBottom.png"
            alt="Bottom Frame"
            className="absolute bottom-0 left-0 right-0 w-full z-10"
            />

            {/* Side frames (repeating) */}
            <div
            className="absolute top-[70px] bottom-[120px] left-0 right-0 z-5 pointer-events-none"
            style={{
                backgroundImage: "url(/assets/RedClusterFrameSides.png)",
                backgroundRepeat: "repeat-y",
                backgroundPosition: "left top, right top",
                backgroundSize: "contain",
            }}
            >
            </div>

            {/* Content */}
            <div className="relative z-20 px-6 py-6 flex flex-col items-center">

                {/* Invite heading */}
                <h2 className="text-2xl sm:text-4xl font-serif mb-4 text-darkbrown italic tracking-wide drop-shadow-sm">
                    Dear {invite.name}
                </h2>

                {/* Central image with text overlay */}
                <div className="relative mx-auto mb-6">
                    {/* Background image */}
                    <img
                    src="/assets/RedCluster.png"
                    alt="Wedding Icon"
                    className="h-60 md:h-80 w-auto mx-auto object-contain"
                    />

                    {/* Overlayed text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
<h1
  className="
    text-5xl md:text-5xl font-heading text-white drop-shadow-md 
    flex flex-col md:flex-row items-center justify-center 
    leading-tight md:leading-normal
  "
>
  <span className="md:mr-2">{groomName}</span>
  <span className="md:mx-2">&</span>
  <span className="md:ml-2">{brideName}</span>
</h1>


                    <h2 className="text-base md:text-lg font-serif text-white italic tracking-wider mt-2 max-w-[16rem] drop-shadow-sm">
                        invite you to join them as they celebrate their wedding
                    </h2>
                    </div>
                </div>

                {/* Invite details */}
                {/*
                <div className="mb-4 text-darkbrown font-serif w-full">
                    <div className="w-full bg-lightbrown p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 bg-opacity-60">
                    <p className="text-lg mb-2 italic tracking-wide">
                        <span className="font-semibold">Date & Time:</span> Nth November 2025 at 10:30AM
                    </p>
                    <p className="text-lg mb-2 italic tracking-wide">
                        <span className="font-semibold">Address:</span> Somewhere or Other
                    </p>
                    {invite.reception && (
                        <p className="text-lg mb-2 italic tracking-wide">
                        Join us for a casual reception with grazing tables and drinks at the same location at 6:00PM
                        </p>
                    )}
                    </div>
                </div>
                */}
                {/* Invite details */}
                <div className="mb-4 text-darkbrown font-serif w-full max-w-[85%] mx-auto">
                    <div className="w-full bg-lightbrown p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 bg-opacity-60">
                        <p className="text-lg mb-2 italic tracking-wide">
                        <span className="font-semibold">Date & Time:</span> {weddingDate} at {ceremonyTime}
                        </p>
                        <p className="text-lg mb-2 italic tracking-wide">
                        <span className="font-semibold">Address:</span> {ceremonyAddress}
                        </p>
                        {invite.reception && (
                        <p className="text-lg mb-2 italic tracking-wide">
                            Join us for a reception at {receptionLocation} at {receptionTime}
                        </p>
                        )}
                    </div>
                </div>

                {/* RSVP */}
                <div className="mb-2 text-center font-serif italic tracking-wide">
                    <p className="mb-2 font-semibold">Will you be attending?</p>
                    <div className="flex justify-center gap-4">
                    <button
                        className={`btn ${rsvpStatus === "yes" ? "btn-copper" : "btn-lightbrown"}`}
                        onClick={() => handleRsvp("yes")}
                    >
                        Yes
                    </button>
                    <button
                        className={`btn ${rsvpStatus === "no" ? "btn-copper" : "btn-lightbrown"}`}
                        onClick={() => handleRsvp("no")}
                    >
                        No
                    </button>
                    </div>
                    <p className="text-lg mb-1 mt-1">Please RSVP by {rsvpDate}</p>
                </div>

                {/* RsvpMessage */}
                <div className="w-full max-w-[85%] mx-auto">
                    <RsvpMessage invite={invite} />
                </div>
            </div> {/* End content */}
        </div> {/* End main container */}
    </div> // End page container
);
}
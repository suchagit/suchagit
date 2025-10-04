import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PhotoUpload from "../components/PhotoUpload";
import RsvpMessage from "../components/RsvpMessage";

export default function InvitePage() {
    const [invite, setInvite] = useState(null);
    const [rsvpStatus, setRsvpStatus] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const { inviteId: urlInviteId } = useParams(); // optional URL parameter
    const [inviteId, setInviteId] = useState(null); // actual validated inviteId
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
    async function loadInvite() {
    const storedId = localStorage.getItem("inviteId");
    if (!storedId) {
        // No stored invite — maybe user navigated here directly without validation
        navigate("/"); // redirect back to Home or show unauthorized message
        return;
    }
    // Optionally re-fetch full invite details (if not already passed via props)
    const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("token", storedId)
        .single();
    if (error || !data) {
        console.error("Invalid stored invite");
        navigate("/");
        return;
    }
    setInvite(data);
    }
    loadInvite();
    }, []);

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
    };

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
        // valid token, store it
        setInviteId(inviteData.token);
        localStorage.setItem("inviteId", inviteData.token);
        setInvite(inviteData);
        setRsvpStatus(inviteData.rsvp_status);
        setUnauthorized(false);
        setLoading(false);
    }
    initInvite();
    }, [urlInviteId]);

    const handleRsvp = async (value) => {
        setRsvpStatus(value);
        const { data, error } = await supabase
            .from("invites")
            .update({ rsvp_status: value })
            .eq("token", inviteId);
            console.log("data: ", data);
            console.log("error: ", error);
        if (error) console.error(error);
    };

    if (loading) return (
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
    if (!invite) return (
        <div className="min-h-screen bg-olive text-darkbrown font-body flex flex-col items-center">
            <div className="max-w-xl w-full bg-peach rounded-lg p-6 mt-8 shadow-lg text-center">
                <h2 className="text-2xl font-heading mb-4">Loading invitation...</h2>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-olive text-darkbrown font-body flex flex-col items-center px-4 sm:px-0">

            {/* Main container */}
            <div className="relative max-w-xl w-full bg-peach rounded-lg shadow-lg text-center mt-6 overflow-hidden pt-[120px] pb-[120px]"> {/* padding top/bottom same as frame height */}

                {/* Top frame */}
                <img
                    src="/assets/FloralFrameTop.png"
                    alt="Top Frame"
                    className="absolute top-0 left-0 right-0 w-full z-10"
                />

                {/* Bottom frame */}
                <img
                    src="/assets/FloralFrameBottom.png"
                    alt="Bottom Frame"
                    className="absolute bottom-0 left-0 right-0 w-full z-10"
                />

                {/* Content */}
                <div className="relative z-20 px-6 py-6 flex flex-col items-center">

                    {/* Invite heading */}
                    <h2 className="text-4xl font-heading mb-4">Dear {invite.name}</h2>
                    <div className="text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-heading mb-2">Boyd & Rejoice</h1>
                    </div>
                    <h2 className="text-lg mb-6 text-darkbrown font-body text-white mx-auto max-w-[16rem]">
                    invite you to join them as they celebrate their wedding
                    </h2>

                    {/*Central image*/}
                    <img
                    src="/assets/InviteImage.png"
                    alt="Wedding Icon"
                    className="h-40 mx-auto mb-6"
                    />

                    {/* Invite details */}
                    <div className="mb-4 text-darkbrown font-body w-full">
                        <div className="w-full bg-lightbrown p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 bg-opacity-60">
                            <p className="text-lg mb-2">
                            <span className="font-semibold">Date & Time:</span> Nth November 2025 at 10:30AM
                            </p>
                            <p className="text-lg mb-2">
                            <span className="font-semibold">Address:</span> Somewhere or Other
                            </p>
                            {invite.reception && (
                            <p className="text-lg mb-2">
                                Join us for a casual reception with grazing tables and drinks at the same location at 6:00PM
                            </p>
                            )}
                        </div>
                    </div>

                    {/* RSVP */}
                    <div className="mb-6">
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
                        <p className="text-lg mb-2">Please RSVP by 15th November</p>
                    </div>

                    <RsvpMessage invite={invite} />

                </div> {/* End content */}
            </div> {/* End main container */}
        </div> // End page container
    );
}
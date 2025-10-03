import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import heroImg from "../assets/br-hero.jpg";
import NavButton from "../components/NavButton";

export default function Home() {
    //const inviteId = localStorage.getItem("inviteId");
    //console.log("HOMEPAGE INVIDE ID: ", inviteId);

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
    <div className="text-brown">
        <div
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImg})` }}
        >
        <div className="bg-peach bg-opacity-80 p-8 rounded-xl text-center shadow-lg animate-fade-in">
            <h1 className="text-6xl font-bold mb-4 tracking-wide">Boyd & Rejoice </h1>
            <p className="text-2xl">💕 We can’t wait to celebrate with you 💕</p>
            {/*<p className="mt-4 text-lg">Explore your invitation, RSVP, and more</p>*/}
            <div className="flex flex-col items-center gap-4 mt-6">
                <NavButton to="/invite">Open Your Invitation</NavButton>
            </div>
        </div>
        </div>
    </div>
    );
    }


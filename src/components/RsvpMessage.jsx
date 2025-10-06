import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function RsvpNotes({ invite }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch the existing message from Supabase
  useEffect(() => {
    const fetchMessage = async () => {
      if (!invite?.id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("invites")
          .select("rsvp_notes")
          .eq("id", invite.id)
          .single();

        if (error) console.error("Fetch error:", error);
        else if (data) setMessage(data.rsvp_notes || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [invite]);

  const handleSave = async () => {
    if (!invite?.id) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("invites")
        .update({ rsvp_notes: message })
        .eq("id", invite.id);

      if (error) console.error("Update error:", error);
      else alert("Message saved!");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4 text-center text-sm">Loading…</p>;

  return (
    <div className="mt-4 w-full max-w-lg bg-lightbrown p-3 rounded-lg shadow-md hover:shadow-lg transition transform animate-fadeIn bg-opacity-60 mx-auto overflow-hidden">
        <div className="flex items-center gap-2 w-full">
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Optional RSVP note"
                className="flex-1 min-w-0 p-2 rounded border border-gray-300 bg-peach/30 text-sm placeholder-darkbrown/50 focus:outline-none focus:ring-2 focus:ring-copper"
            />
            <button
                onClick={handleSave}
                disabled={saving || !message.trim()}
                className={`btn btn-copper text-sm px-3 py-1 ${!saving && "btn-hover-scale"}`}
            >
                {saving ? "Saving…" : message ? "Update" : "Send"}
            </button>
        </div>
    </div>
  );
}

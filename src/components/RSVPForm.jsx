{/*
  import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function RSVPForm({ invite }) {
  const [status, setStatus] = useState(invite.rsvp_status || "");
  const [notes, setNotes] = useState(invite.rsvp_notes || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("invites")
      .update({
        rsvp_status: status,
        rsvp_notes: notes,
        rsvp_updated_at: new Date(),
      })
      .eq("id", invite.id);

    if (error) console.error(error);
    else alert("RSVP updated!");

    setSaving(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-peach p-6 rounded-lg shadow-lg max-w-md mx-auto
                 transition transform hover:-translate-y-1 hover:shadow-xl animate-fadeIn"
    >
      <label className="block mb-2 font-semibold">Will you attend?</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
      >
        <option value="">Select</option>
        <option value="yes">Yes 🎉</option>
        <option value="no">No 😢</option>

      </select>

      <label className="block mb-2 font-semibold">
        Notes / Dietary info (optional)
      </label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
      />

      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 bg-copper text-white rounded"
      >
        {saving ? "Saving…" : "Submit RSVP"}
      </button>
    </form>
  );
}
*/}
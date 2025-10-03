import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Registry() {
  const inviteId = localStorage.getItem("inviteId");

  const [invite, setInvite] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch invite info
  useEffect(() => {
    const fetchInvite = async () => {
      const { data, error } = await supabase
        .from("invites")
        .select("*")
        .eq("token", inviteId)
        .single();

      if (error) {
        alert("Error fetching invite info");
        return;
      }

      setInvite(data);
    };

    fetchInvite();
  }, [inviteId]);

  // Fetch registry items
  useEffect(() => {
    const fetchItems = async () => {
        console.log("Fetching all items");
      const { data, error } = await supabase
        .from("registry_items")
        .select("*")
        .order("item");//.order("item", { ascending: true });
      if (error) {
        alert("Error fetching registry items");
        setLoading(false);
        return;
      }
      console.log("Fetched all items");

      setItems(data);
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading || !invite)
    return <p className="p-8 text-center">Loading registry…</p>;

  // Toggle reserve/unreserve
  const toggleReservation = async (itemId, isMine) => {
    console.log("Toggling the reservation");
    console.log("Invited: ", invite);
    const { error } = await supabase
      .from("registry_items")
      .update({
        reserved_by: isMine ? null : invite.token,
      })
      .eq("id", itemId)
      .or(`reserved_by.is.null,reserved_by.eq.${invite.token}`);
    if (error) {
        console.log("Couldn't togtle the item");
      alert("Error updating reservation");
    } else {
        console.log("Toggled the item");
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? { ...item, reserved_by: isMine ? null : invite.token }
            : item
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-olive p-6 text-white flex flex-col items-center">
      <h1 className="text-4xl font-heading font-bold mb-6">Gift Registry</h1>
      <p className="mb-6 text-center font-bold">
        Gifts are completely optional.<br />Please do not feel that you need to give a gift - your presence at our wedding is what truly matters. However if you would like to give something, our registry has a few suggestions to keep things simple and avoid duplicates, and monetary gifts are also very welcome.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {items.map((item) => {
          const isMine = item.reserved_by === invite.token;
          const isReservedByOther = item.reserved_by && !isMine;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg shadow-md border flex flex-col ${
                isReservedByOther
                  ? "bg-copper cursor-not-allowed"//"bg-lightbrown line-through cursor-not-allowed"
                  : isMine
                  ? "bg-copper text-white border-4 border-darkbrown"
                  : "bg-peach"
              }`}
            >
                <div className={`${isReservedByOther ? "line-through" : ""}`}>
              <h3 className="font-semibold text-lg mb-2">{item.item}</h3>
              <p className="mb-4">{item.description}</p>
              </div>
              <button
                onClick={() => toggleReservation(item.id, isMine)}
                disabled={isReservedByOther}
                className={`px-4 py-2 rounded text-white w-full mt-auto ${
                  isReservedByOther
                    ? "bg-copper cursor-not-allowed"//"bg-lightbrown line-through cursor-not-allowed"//"bg-lightbrown cursor-not-allowed"
                    : isMine
                    ? "bg-peach/80 hover:bg-darkbrown transition"//"bg-peach/80 hover:bg-darkbrown transition"//"bg-copper hover:bg-copper/90 transition"//"bg-darkbrown hover:bg-copper transition"
                    : "bg-lightbrown hover:bg-copper transition"//"bg-peach hover:bg-lightbrown transition"//"bg-copper hover:bg-darkbrown transition"
                }`}
              >
                {isReservedByOther
                  ? "Reserved"
                  : isMine
                  ? "Unreserve"
                  : "Reserve"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

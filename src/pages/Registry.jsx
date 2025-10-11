{/*
  import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import heroImg from "../assets/SoftTulipsCropped4.png";
import { useInvite } from "../context/InviteContext";

export default function Registry() {
  const inviteId = localStorage.getItem("inviteId");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { invite, unauthorized } = useInvite();

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("registry_items")
        .select("*")
        .order("item");
      if (error) {
        alert("Error fetching registry items");
        setLoading(false);
        return;
      }
      setItems(data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  if (unauthorized)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Unauthorized access</h2>
        </div>
      </div>
    );

  if (!invite)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Loading invitation...</h2>
        </div>
      </div>
    );

  const toggleReservation = async (itemId, isMine) => {
    const { error } = await supabase
      .from("registry_items")
      .update({ reserved_by: isMine ? null : invite.token })
      .eq("id", itemId)
      .or(`reserved_by.is.null,reserved_by.eq.${invite.token}`);
    if (error) {
      alert("Error updating reservation");
    } else {
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
    <div className="relative min-h-screen w-full">

      <div
        className="fixed inset-0 w-full h-full bg-center bg-cover bg-fixed opacity-50 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${heroImg})` }}
      />

      <div className="relative min-h-screen text-darkbrown font-body p-6 flex flex-col items-center">
        <h1 className="text-4xl font-heading font-bold mb-6 text-white">
          Gift Registry
        </h1>
        <p className="mb-6 text-center font-bold text-white max-w-2xl">
          Gifts are completely optional.<br />
          Please do not feel that you need to give a gift - your presence at our
          wedding is what truly matters. However if you would like to give
          something, our registry has a few suggestions to keep things simple
          and avoid duplicates, and monetary gifts are also very welcome.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {items.map((item) => {
  const isUnlimited = item.unlimited;
  const isMine = item.reserved_by === invite.token;
  const isReservedByOther = item.reserved_by && !isMine;

  return (
    <div
      key={item.id}
      className={`p-4 rounded-lg shadow-md border flex flex-col ${
        isUnlimited === true
          ? "bg-peach"
          : isReservedByOther
          ? "bg-copper cursor-not-allowed"
          : isMine
          ? "bg-copper text-white border-4 border-darkbrown"
          : "bg-peach"
      }`}
    >
      <div className={`${isReservedByOther ? "line-through" : ""}`}>
        <h3 className="font-semibold text-lg mb-2">{item.item}</h3>
        <p className="mb-4">{item.description}</p>
      </div>

      {isUnlimited === true ? (
        <div className="px-4 py-2 rounded text-white w-full mt-auto bg-lightbrown text-center">
          Non-reservable (Multiple OK)
        </div>
      ) : (
        <button
          onClick={() => toggleReservation(item.id, isMine)}
          disabled={isReservedByOther}
          className={`px-4 py-2 rounded text-white w-full mt-auto ${
            isReservedByOther
              ? "bg-copper cursor-not-allowed"
              : isMine
              ? "bg-peach/80 hover:bg-darkbrown transition"
              : "bg-lightbrown hover:bg-copper transition"
          }`}
        >
          {isReservedByOther ? "Already picked" : isMine ? "Release me" : "I'm getting this"}
        </button>
      )}
    </div>
  );
})}

        </div>
      </div>
    </div>
  );
}
*/}

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import heroImg from "../assets/SoftTulipsCropped4.png";
import { useInvite } from "../context/InviteContext";

export default function Registry() {
  const inviteId = localStorage.getItem("inviteId");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { invite, unauthorized } = useInvite();

  // Fetch items + reservation data
  useEffect(() => {
    const fetchItems = async () => {
      const { data: itemsData, error: itemsError } = await supabase
        .from("registry_items")
        .select("*")
        .order("item");

      if (itemsError) {
        alert("Error fetching registry items");
        setLoading(false);
        return;
      }

      const { data: reservationsData, error: resError } = await supabase
        .from("registry_reservations")
        .select("item_id,reserved_by");

      if (resError) {
        alert("Error fetching reservations");
        setLoading(false);
        return;
      }

      // Attach reservation info
      const mappedItems = itemsData.map((item) => {
        const itemReservations = reservationsData.filter(
          (r) => r.item_id === item.id
        );
        return {
          ...item,
          reservations: itemReservations,
          reservationCount: itemReservations.length,
        };
      });

      setItems(mappedItems);
      setLoading(false);
    };

    fetchItems();
  }, []);

  // Toggle reservation (reserve or release)
  const toggleReservation = async (item) => {
    const isMine = item.reservations.some(
      (r) => r.reserved_by === invite.token
    );
    const isUnlimited = item.unlimited;
    const isFull = item.reservationCount >= item.limit; //&& !isUnlimited;

    if (!isMine && isFull) {
      alert("This item has reached its reservation limit.");
      return;
    }

    if (isMine) {
      // User releases reservation
      const { error } = await supabase
        .from("registry_reservations")
        .delete()
        .eq("item_id", item.id)
        .eq("reserved_by", invite.token);

      if (error) {
        alert("Error releasing reservation");
        return;
      }

      // Update local state
      setItems((prev) =>
        prev.map((i) => {
          if (i.id === item.id) {
            const updatedReservations = i.reservations.filter(
              (r) => r.reserved_by !== invite.token
            );
            return {
              ...i,
              reservations: updatedReservations,
              reservationCount: updatedReservations.length,
            };
          }
          return i;
        })
      );
    } else {
      // User reserves item
      const { error } = await supabase
        .from("registry_reservations")
        .insert([{ item_id: item.id, reserved_by: invite.token }]);

      if (error) {
        alert("Error reserving item");
        return;
      }

      // Update local state
      setItems((prev) =>
        prev.map((i) => {
          if (i.id === item.id) {
            const updatedReservations = [
              ...i.reservations,
              { item_id: item.id, reserved_by: invite.token },
            ];
            return {
              ...i,
              reservations: updatedReservations,
              reservationCount: updatedReservations.length,
            };
          }
          return i;
        })
      );
    }
  };

  // Unauthorized or loading views
  if (unauthorized)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Unauthorized access</h2>
        </div>
      </div>
    );

  if (!invite || loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Loading...</h2>
        </div>
      </div>
    );

  // Main render
  return (
    <div className="relative min-h-screen w-full">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 w-full h-full bg-center bg-cover bg-fixed opacity-50 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${heroImg})` }}
      />

      {/* Content */}
      <div className="relative min-h-screen text-darkbrown font-body p-6 flex flex-col items-center">
        <h1 className="text-4xl font-heading font-bold mb-6 text-white">
          Gift Registry
        </h1>
        <p className="mb-6 text-center font-bold text-white max-w-2xl">
          Gifts are completely optional.
          <br />
          Please do not feel that you need to give a gift — your presence at our
          wedding is what truly matters. However, if you would like to give
          something, our registry has a few suggestions to keep things simple
          and avoid duplicates, and monetary gifts are also very welcome.
        </p>

        {/* Item grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {items.map((item) => {
            const isUnlimited = item.unlimited;
            const isMine = item.reservations.some(
              (r) => r.reserved_by === invite.token
            );
            const isFull = item.reservationCount >= item.limit;// && !isUnlimited;
            const disableButton = isFull && !isMine;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-lg shadow-md border flex flex-col ${
                  disableButton
                    ? "bg-copper cursor-not-allowed"
                    : isMine
                    ? "bg-copper text-white border-4 border-darkbrown"
                    : "bg-peach"
                }`}
              >
                <div className={`${disableButton ? "line-through" : ""}`}>
                  <h3 className="font-semibold text-lg mb-2">{item.item}</h3>
                  <p className="mb-2">{item.description}</p>
                  { (
                    <p className="text-sm mb-2">
                      {item.reservationCount}/{item.limit} reserved
                    </p>
                  )}
                </div>


                  <button
                    onClick={() => toggleReservation(item)}
                    disabled={disableButton}
                    className={`px-4 py-2 rounded text-white w-full mt-auto ${
                      disableButton
                        ? "bg-copper cursor-not-allowed"
                        : isMine
                        ? "bg-peach/80 hover:bg-darkbrown transition"
                        : "bg-lightbrown hover:bg-copper transition"
                    }`}
                  >
                    {isMine
                      ? "Release me"
                      : disableButton
                      ? "Fully reserved"
                      : "I'm getting this"}
                  </button>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

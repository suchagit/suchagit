import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import heroImg from "../assets/SoftTulipsCropped4.png";
import { useInvite } from "../context/InviteContext";

export default function Responses() {
  const { invite, unauthorized } = useInvite();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const ceremonyLocation = import.meta.env.VITE_CEREMONY_LOCATION;
  const ceremonyAddress = import.meta.env.VITE_CEREMONY_ADDRESS;
  const ceremonyMapUrl = import.meta.env.VITE_CEREMONY_MAP;
  const receptionLocation = import.meta.env.VITE_RECEPTION_LOCATION;
  const receptionAddress = import.meta.env.VITE_RECEPTION_ADDRESS;
  const receptionMapUrl = import.meta.env.VITE_RECEPTION_MAP;

  console.log("INVITATION: ", invite);






  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("invites")
        .select("id,name,qty,reception,rsvp_status,rsvp_notes")
        .order("rsvp_status", { ascending: false, nullsLast: true })
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching data:", error);
        setErrorMsg("Error loading data");
        setLoading(false);
        return;
      }

      setRows(data || []);
      setLoading(false);
    };

    fetchData();
  }, []);


  
  if (unauthorized)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Unauthorized access</h2>
        </div>
      </div>
    );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Loading...</h2>
        </div>
      </div>
    );

  if (errorMsg)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">{errorMsg}</h2>
        </div>
      </div>
    );

  if (invite.name !== "Admin")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Admin Only</h2>
        </div>
      </div>
    );

  // Split rows
  const receptionRows = rows.filter((row) => row.reception);
  const ceremonyOnlyRows = rows.filter((row) => !row.reception);

  // Helper function to render table and calculate totals
  const renderTable = (title, data) => {
    const totalInvited = data.reduce((sum, row) => sum + (row.qty || 0), 0);
    const totalRSVPYes = data.reduce(
      (sum, row) => sum + ((row.rsvp_status === "yes" ? row.qty : 0) || 0),
      0
    );
    const totalRSVPNo = data.reduce(
      (sum, row) => sum + ((row.rsvp_status === "no" ? row.qty : 0) || 0),
      0
    );
    const totalYetToRSVP = data.reduce(
      (sum, row) => sum + ((!row.rsvp_status ? row.qty : 0) || 0),
      0
    );

    return (
      <div className="overflow-x-auto bg-peach rounded-lg shadow-lg p-4 w-full max-w-5xl mb-8">
        <h2 className="text-2xl font-heading font-bold mb-4">{title}</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-lightbrown text-white">
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Qty</th>
              <th className="p-2 border-b">RSVP</th>
              <th className="p-2 border-b">Comment</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-copper/30">
                <td className="p-2 border-b">{row.name}</td>
                <td className="p-2 border-b">{row.qty}</td>
                <td className="p-2 border-b">{row.rsvp_status || ""}</td>
                <td className="p-2 border-b">{row.rsvp_notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <p className="text-center text-darkbrown mt-4">No data found.</p>
        )}
        <p className="mt-2 text-darkbrown font-semibold">
          Total Invited: {totalInvited} | RSVP Yes: {totalRSVPYes} | RSVP No: {totalRSVPNo} | Yet to RSVP: {totalYetToRSVP}
        </p>
      </div>
    );
  };

  // Grand totals
  const grandTotalInvited =
    receptionRows.reduce((sum, row) => sum + (row.qty || 0), 0) +
    ceremonyOnlyRows.reduce((sum, row) => sum + (row.qty || 0), 0);

  const grandTotalRSVPYes =
    receptionRows.reduce((sum, row) => sum + ((row.rsvp_status === "yes" ? row.qty : 0) || 0), 0) +
    ceremonyOnlyRows.reduce((sum, row) => sum + ((row.rsvp_status === "yes" ? row.qty : 0) || 0), 0);

  const grandTotalRSVPNo =
    receptionRows.reduce((sum, row) => sum + ((row.rsvp_status === "no" ? row.qty : 0) || 0), 0) +
    ceremonyOnlyRows.reduce((sum, row) => sum + ((row.rsvp_status === "no" ? row.qty : 0) || 0), 0);

  const grandTotalYetToRSVP =
    receptionRows.reduce((sum, row) => sum + ((!row.rsvp_status ? row.qty : 0) || 0), 0) +
    ceremonyOnlyRows.reduce((sum, row) => sum + ((!row.rsvp_status ? row.qty : 0) || 0), 0);

  return (
    <div className="relative min-h-screen w-full">
      <div
        className="fixed inset-0 w-full h-full bg-center bg-cover bg-fixed opacity-50 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="relative min-h-screen text-darkbrown font-body p-6 flex flex-col items-center">
        <h1 className="text-4xl font-heading font-bold mb-6 text-white">
          RSVP List
        </h1>

        {renderTable("Reception Guests", receptionRows)}
        {renderTable("Ceremony Only Guests", ceremonyOnlyRows)}

        {/* Grand total */}
        <div className="bg-peach rounded-lg shadow-lg p-4 w-full max-w-5xl mb-8 text-center">
          <p className="text-xl font-heading font-semibold">
            Grand Total Invited: {grandTotalInvited} | RSVP Yes: {grandTotalRSVPYes} | RSVP No: {grandTotalRSVPNo} | Yet to RSVP: {grandTotalYetToRSVP}
          </p>
        </div>
      </div>
    </div>
  );
}


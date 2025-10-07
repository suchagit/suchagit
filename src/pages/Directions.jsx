import heroImg from "../assets/SoftTulipsCropped4.png"//"../assets/br-hero.jpg";
import { useInvite } from "../context/InviteContext";

export default function Directions() {
  const ceremonyLocation = import.meta.env.VITE_CEREMONY_LOCATION;
  const ceremonyAddress = import.meta.env.VITE_CEREMONY_ADDRESS;
  const ceremonyMapUrl = import.meta.env.VITE_CEREMONY_MAP;
  const receptionLocation = import.meta.env.VITE_RECEPTION_LOCATION;
  const receptionAddress = import.meta.env.VITE_RECEPTION_ADDRESS;
  const receptionMapUrl = import.meta.env.VITE_RECEPTION_MAP;

  const { invite, unauthorized } = useInvite();

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
    <div className="min-h-screen bg-[#979f8a] p-6 text-white relative">
        
      <h1 className="text-4xl font-heading font-bold mb-6 text-center">Directions</h1>

      <div className="max-w-4xl mx-auto bg-peach p-6 rounded-lg shadow-md mb-6">
        {/* Venue Location */}
        <h2 className="text-2xl font-semibold mb-4">{ceremonyLocation}</h2>
        <p className="mb-4">{ceremonyAddress}</p>

        <div className="w-full h-80 mb-4 rounded overflow-hidden shadow">
          <iframe
            title="Wedding Venue"
            src={ceremonyMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Directions Sections */}
        <h2 className="text-xl font-semibold mb-2">Parking</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Park somewhere</li>
          <li>Don't park on the grass</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Additional Notes</h2>
        <ul className="list-disc list-inside">
          <li>Bus routes available</li>
        </ul>
      </div>
    </div>
  );
}

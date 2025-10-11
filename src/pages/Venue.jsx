import heroImg from "../assets/SoftTulipsCropped4.png";
import { useInvite } from "../context/InviteContext";

export default function Venue() {
  const ceremonyLocation = import.meta.env.VITE_CEREMONY_LOCATION;
  const ceremonyAddress = import.meta.env.VITE_CEREMONY_ADDRESS;
  const ceremonyMapUrl = import.meta.env.VITE_CEREMONY_MAP;
  const receptionLocation = import.meta.env.VITE_RECEPTION_LOCATION;
  const receptionAddress = import.meta.env.VITE_RECEPTION_ADDRESS;
  const receptionMapUrl = import.meta.env.VITE_RECEPTION_MAP;

  const { invite, unauthorized } = useInvite();

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

  return (
    <div className="relative min-h-screen w-full text-darkbrown font-body p-6">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 w-full h-full bg-center bg-cover bg-fixed opacity-50 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${heroImg})` }}
      />

      <h1 className="text-4xl font-heading font-bold mb-6 text-center text-white drop-shadow-md">
        Venue
      </h1>

      <div className="max-w-4xl mx-auto bg-peach p-6 rounded-lg shadow-md mb-6">
        {/* Ceremony */}
        <h1 className="text-3xl font-semibold mb-4 text-center">Ceremony</h1>
        <h2 className="text-2xl font-semibold mb-4">{ceremonyLocation}</h2>
        <p className="mb-4">{ceremonyAddress}</p>

        <div className="w-full h-80 mb-4 rounded overflow-hidden shadow">
          <iframe
            title="Ceremony Venue"
            src={ceremonyMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <h2 className="text-xl font-semibold mb-2">Parking</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Follow the parking instructions given upon arrival</li>
          <li>Please carpool if possible</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Additional Notes</h2>
        <ul className="list-disc list-inside">
          <li>The venue is a grassy outdoor setting</li>
        </ul>

        {invite.reception === true && (
          <>
            <h1 className="text-3xl font-semibold mb-4 text-center pt-4">Reception</h1>
            <h2 className="text-2xl font-semibold mb-4">{receptionLocation}</h2>
            <p className="mb-4">{receptionAddress}</p>

            <div className="w-full h-80 mb-4 rounded overflow-hidden shadow">
              <iframe
                title="Reception Venue"
                src={receptionMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <h2 className="text-xl font-semibold mb-2">Additional Notes</h2>
            <ul className="list-disc list-inside">
              <li>The reception will be held in the Duke and Duchess Dining Room</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

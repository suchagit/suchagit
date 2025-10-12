import heroImg from "../assets/SoftTulipsCropped4.png";
import { useInvite } from "../context/InviteContext";

export default function About() {
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

      <div className="max-w-4xl mx-auto bg-peach p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-semibold mb-4 text-center">Our Story</h1>
        <h2 className="text-2xl font-semibold mb-4">header</h2>
        <p className="mb-4">This is our story</p>
      </div>
    </div>
  );
}

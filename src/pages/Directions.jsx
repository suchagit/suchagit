export default function Directions() {
  const venueAddress = "123 Wedding Lane, Perth, WA, Australia"; // You can update if needed
  const mapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.1316515387753!2d115.94375421120608!3d-31.90302017393289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32ba029c7f00b1%3A0x545ffb6f303a166!2sCaff%20on%20Broadway!5e0!3m2!1sen!2sau!4v1759558639395!5m2!1sen!2sau";

  return (
    <div className="min-h-screen bg-[#979f8a] p-6 text-white relative">
      <h1 className="text-4xl font-heading font-bold mb-6 text-center">Directions</h1>

      <div className="max-w-4xl mx-auto bg-peach p-6 rounded-lg shadow-md mb-6">
        {/* Venue Location */}
        <h2 className="text-2xl font-semibold mb-4">Venue Location</h2>
        <p className="mb-4">{venueAddress}</p>

        <div className="w-full h-80 mb-4 rounded overflow-hidden shadow">
          <iframe
            title="Wedding Venue"
            src={mapsEmbedUrl}
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

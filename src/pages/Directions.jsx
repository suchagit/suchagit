export default function Directions() {
  const venueAddress = "123 Wedding Lane, Perth, WA, Australia"; // Replace with your venue
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
    venueAddress
  )}`;

  return (
    <div className="min-h-screen bg-[#979f8a] p-6 text-white relative">
      <h1 className="text-4xl font-heading font-bold mb-6 text-center">Directions</h1>

      <div className="max-w-4xl mx-auto bg-peach p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Venue Location</h2>
        <p className="mb-4">{venueAddress}</p>

        <div className="w-full h-80 mb-4 rounded overflow-hidden shadow">
          <iframe
            title="Wedding Venue"
            src={googleMapsEmbedUrl}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <h2 className="text-xl font-semibold mb-2">Parking</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Free guest parking available on-site.</li>
          <li>Additional street parking along Wedding Lane.</li>
          <li>Please avoid parking in private driveways nearby.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Transport Tips</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Taxi/Uber drop-off is easiest at the front entrance.</li>
          <li>Public transport: nearest bus stop is 200m away.</li>
          <li>Walking paths are well-lit and accessible.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Additional Notes</h2>
        <ul className="list-disc list-inside">
          <li>The venue entrance is clearly marked with signage.</li>
          <li>Please follow the event staff directions for parking and access.</li>
          <li>Consider carpooling if possible to minimize congestion.</li>
        </ul>
      </div>
    </div>
  );
}

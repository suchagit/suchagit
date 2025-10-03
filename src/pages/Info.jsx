export default function Info() {
  const latitude = -33.8688; // example: Sydney
  const longitude = 151.2093;

  const inviteId = localStorage.getItem("inviteId");
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Event Info & Location</h2>
      <p>Date: 1st Jan 2026</p>
      <p>Location: Sydney Opera House</p>
      <iframe
        width="100%"
        height="400"
        frameBorder="0"
        src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`}
        allowFullScreen
        title="Wedding Location"
      ></iframe>
    </div>
  );
}

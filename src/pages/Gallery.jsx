{/*
  import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PhotoUpload from "../components/PhotoUpload";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const inviteId = localStorage.getItem("inviteId");

  const [showAddPhotos, setShowAddPhotos] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase.storage
        .from("uploads")
        .list("", { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } });

      if (error) console.error(error);
      else {
        console.log("PHOTO DATA: ", data);
        // Get public URLs for each photo
        //const urls = data.map((file) =>
        //  supabase.storage.from("uploads").getPublicUrl(file.name).data.publicUrl
        //);
        const urls = await Promise.all(
  data.map((file) =>
    supabase.storage
      .from("uploads")
      .createSignedUrl(file.name, 60) // URL valid for 60 seconds
      .then(res => res.data.signedUrl)
  )
);
        setPhotos(urls);
      }
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  if (loading) return <p className="p-8 text-center">Loading gallery…</p>;

  return (
    <div className="min-h-screen bg-[#979f8a] p-6 text-white relative">

  <div className="relative mb-6 text-center">
    <h1 className="text-4xl font-bold inline-block">
      Photo Gallery
    </h1>

    <button
      onClick={() => setShowAddPhotos(true)}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/20 text-white px-3 py-1 rounded hover:bg-white/40 transition text-base"
    >
      Please upload your photos from the wedding!!
    </button>
  </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.length === 0 && <p>No photos uploaded yet.</p>}
        {photos.map((url, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow-md">
            <img
                src={url}
                alt={`Wedding Photo ${idx + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md
                transform transition hover:scale-105 hover:shadow-xl"
/>

          </div>
        ))}
      </div>

      {showAddPhotos && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-full max-w-md">
            <button
              onClick={() => setShowAddPhotos(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <PhotoUpload />
          </div>
        </div>
      )}

    </div>
  );
}
*/}

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PhotoUpload from "../components/PhotoUpload";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const inviteId = localStorage.getItem("inviteId");
  const [showAddPhotos, setShowAddPhotos] = useState(false);

  // Load photos
  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase.storage
        .from("uploads")
        .list("", { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } });

      if (error) {
        console.error(error);
      } else {
        // Create signed URLs + track filenames
        const photosWithUrls = await Promise.all(
          data.map(async (file) => {
            const { data: signed } = await supabase.storage
              .from("uploads")
              .createSignedUrl(file.name, 300); // valid for 5 min
            return { name: file.name, url: signed.signedUrl };
          })
        );
        setPhotos(photosWithUrls);
        await fetchLikes(photosWithUrls.map((p) => p.name));
      }
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  // Load like counts for all photos
  const fetchLikes = async (photoNames) => {
    const { data, error } = await supabase
      .from("likes")
      .select("photo_name, invite_id");

    if (error) {
      console.error("Error fetching likes:", error);
      return;
    }

    // Count likes + check if current user liked
    const likeData = {};
    photoNames.forEach((name) => {
      const photoLikes = data.filter((row) => row.photo_name === name);
      likeData[name] = {
        count: photoLikes.length,
        likedByUser: photoLikes.some((row) => row.invite_id === inviteId),
      };
    });

    setLikes(likeData);
  };

  // Toggle like/unlike
  const toggleLike = async (photoName) => {
    if (!inviteId) return;

    const alreadyLiked = likes[photoName]?.likedByUser;

    if (alreadyLiked) {
      // Unlike
      const { error } = await supabase
        .from("likes")
        .delete()
        .match({ photo_name: photoName, invite_id: inviteId });

      if (error) console.error("Error unliking:", error);
    } else {
      // Like
      const { error } = await supabase
        .from("likes")
        .insert([{ photo_name: photoName, invite_id: inviteId }]);

      if (error) console.error("Error liking:", error);
    }

    // Refresh likes
    fetchLikes(photos.map((p) => p.name));
  };

  if (loading) return <p className="p-8 text-center">Loading gallery…</p>;

  return (
    <div className="min-h-screen bg-[#979f8a] p-6 text-white relative">
      <div className="mb-6 text-center">
  <h1 className="text-4xl font-bold mb-2">Photo Gallery</h1>

  <button
    onClick={() => setShowAddPhotos(true)}
    className="block mx-auto bg-white/20 text-white px-3 py-1 rounded hover:bg-white/40 transition text-base"
  >
    Please upload your photos from the wedding!!
  </button>
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.length === 0 && <p>No photos uploaded yet.</p>}
        {photos.map((photo, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow-md p-2 bg-white/10">
            <div className="relative">
              <img
                src={photo.url}
                alt={`Wedding Photo ${idx + 1}`}
                className="w-full h-64 object-contain rounded-lg shadow-md bg-black
                          transform transition hover:scale-105 hover:shadow-xl"
              />
              {/* Floating like button */}
              <button
                onClick={() => toggleLike(photo.name)}
                className={`absolute top-2 right-2 flex items-center gap-1 px-3 py-1 rounded text-sm
                ${likes[photo.name]?.likedByUser
                  ? "bg-pink-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
                } backdrop-blur-sm transition`}
              >
                <span className="text-lg">{likes[photo.name]?.likedByUser ? "♥" : "♡"}</span>
                <span>{likes[photo.name]?.count || 0}</span>
              </button>
            </div>
            
          </div>
        ))}
      </div>

      {showAddPhotos && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative inline-block">
            {/* Overlay wrapper to hold PhotoUpload and button */}
            <div className="relative">
              <PhotoUpload className="opacity-90" invite={{ token: inviteId }} />
              <button
                onClick={() => setShowAddPhotos(false)}
                className="absolute top-2 right-2 z-10 text-white text-2xl font-bold hover:text-gray-300"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

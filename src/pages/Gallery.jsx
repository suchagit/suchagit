{/*import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PhotoUpload from "../components/PhotoUpload";
import heroImg from "../assets/SoftTulipsCropped4.png"//"../assets/br-hero.jpg";
import { useInvite } from "../context/InviteContext";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const inviteId = localStorage.getItem("inviteId");
  const [showAddPhotos, setShowAddPhotos] = useState(false);

  const { invite, unauthorized } = useInvite();
  

  // Load photos
  useEffect(() => {
    const deleteEmpty = async () => {
      const { error } = await supabase
        .storage
        .from("uploads")
        .remove([".emptyFolderPlaceholder"])
      if (error) {
        console.error('Error deleting placeholder:', error)
      } else {
        console.log('Placeholder deleted successfully')
      }
    };
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
    //deleteEmpty(); Un-comment to delete the auto-generated .emptyFolderPlaceholder file
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
        {photos.length === 0 && <p>No photos uploaded yet</p>}
        {photos.map((photo, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow-md p-2 bg-white/10">
            <div className="relative">
              <img
                src={photo.url}
                alt={`Wedding Photo ${idx + 1}`}
                className="w-full h-64 object-contain rounded-lg shadow-md bg-black
                          transform transition hover:scale-105 hover:shadow-xl"
              />

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
*/}

import { useEffect, useState } from "react";
// Swap storage here to change provider
import * as storage from "../services/storageSupabase";
import * as likesAPI from "../services/likesSupabase";
import PhotoUpload from "../components/PhotoUpload";
import heroImg from "../assets/SoftTulipsCropped4.png";
import { useInvite } from "../context/InviteContext";


export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const inviteId = localStorage.getItem("inviteId");
  const [showAddPhotos, setShowAddPhotos] = useState(false);
  const { invite, unauthorized } = useInvite();

  const [enlargedPhoto, setEnlargedPhoto] = useState(null);

  // Load photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const files = await storage.listPhotos();
        const photosWithUrls = await Promise.all(
          files.map(async (file) => ({
            name: file.name,
            url: await storage.getPhotoUrl(file.name),
          }))
        );
        setPhotos(photosWithUrls);

        // Load likes via abstracted API
        const likeData = await likesAPI.fetchLikes(
          photosWithUrls.map((p) => p.name),
          inviteId
        );
        setLikes(likeData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Load like counts for all photos
  const fetchLikes = async (photoNames) => {
    try {
      const { data, error } = await storageSupabaseLikeFetch(); 
      // Keep likes in Supabase for now. 
      // You could also abstract likes in future if needed
      if (error) throw error;

      const likeData = {};
      photoNames.forEach((name) => {
        const photoLikes = data.filter((row) => row.photo_name === name);
        likeData[name] = {
          count: photoLikes.length,
          likedByUser: photoLikes.some((row) => row.invite_id === inviteId),
        };
      });

      setLikes(likeData);
    } catch (err) {
      console.error("Error fetching likes:", err);
    }
  };

const handleToggleLike = async (photoName) => {
  if (!inviteId) return;

  // 1. Optimistically update UI
  setLikes((prevLikes) => {
    const alreadyLiked = prevLikes[photoName]?.likedByUser;
    const count = prevLikes[photoName]?.count || 0;
    return {
      ...prevLikes,
      [photoName]: {
        likedByUser: !alreadyLiked,
        count: alreadyLiked ? count - 1 : count + 1,
      },
    };
  });

  try {
    // 2. Update backend asynchronously, no need to wait
    await likesAPI.toggleLike(photoName, inviteId);
  } catch (err) {
    console.error("Error toggling like:", err);
    // Optional: revert UI if backend fails
    setLikes((prevLikes) => {
      const alreadyLiked = prevLikes[photoName]?.likedByUser;
      const count = prevLikes[photoName]?.count || 0;
      return {
        ...prevLikes,
        [photoName]: {
          likedByUser: !alreadyLiked,
          count: alreadyLiked ? count - 1 : count + 1,
        },
      };
    });
  }
};


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

  if (invite.name === "Lynnette")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-peach rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-heading mb-4">Unauthorised</h2>
        </div>
      </div>
  );

  if (loading) return <p className="p-8 text-center">Loading gallery…</p>;

  return (
    <div className="relative min-h-screen w-full">
    {/*<div className="min-h-screen bg-[#979f8a] p-6 text-white relative">*/}
      {/* Fixed background image */}
      <div
        className="fixed inset-0 w-full h-full bg-center bg-cover bg-fixed opacity-50 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Photo Gallery</h1>

        <button
          onClick={() => setShowAddPhotos(true)}
          className="block mx-auto bg-white/20 text-white px-3 py-1 rounded hover:bg-white/40 transition text-base"
        >
          Please upload your photos from the wedding!!
        </button>
      </div>


<div className="max-w-4xl mx-auto bg-peach p-6 rounded-lg shadow-md">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {photos.length === 0 && (
        <p className="text-center col-span-full">No photos uploaded yet</p>
      )}

      {photos.map((photo, idx) => (
        <div
          key={idx}
          className="relative w-full rounded-lg overflow-hidden flex items-center justify-center"
          style={{ aspectRatio: '4/3' }} // uniform frame
        >
          {/* Photo fills frame */}
          <img
            src={photo.url}
            alt={`Wedding Photo ${idx + 1}`}
            className="w-full h-full object-contain cursor-pointer transition-transform duration-300"
            onClick={(e) => {
              e.stopPropagation(); // prevent like button from triggering enlarge
              setEnlargedPhoto(photo.url);
            }}
          />

          {/* Like button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent enlarging
              handleToggleLike(photo.name);
            }}
            className={`absolute top-1 right-1 flex items-center gap-1 px-2 py-1 rounded text-sm
              ${likes[photo.name]?.likedByUser
                ? "bg-pink-500 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
              } backdrop-blur-sm transition`}
          >
            <span className="text-lg">{likes[photo.name]?.likedByUser ? "♥" : "♡"}</span>
            <span>{likes[photo.name]?.count || 0}</span>
          </button>
        </div>
      ))}
    </div>
    {enlargedPhoto && (
  <div
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer"
    onClick={() => setEnlargedPhoto(null)}
  >
    <img
      src={enlargedPhoto}
      alt="Enlarged"
      className="max-w-[90%] max-h-[90%] object-contain shadow-2xl rounded-lg"
      //onClick={(e) => e.stopPropagation()} // clicking photo itself doesn’t close immediately
    />
  </div>
)}
    </div>

      {showAddPhotos && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative inline-block">
            <div className="relative">
              <PhotoUpload className="opacity-90" invite={{ token: inviteId }} storage={storage}/>
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

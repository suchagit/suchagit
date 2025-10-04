import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function PhotoUpload({ invite }) {
  const [photoFiles, setPhotoFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!photoFiles || photoFiles.length === 0) return;
    setUploading(true);
    try {
      let anyErrors = false;
      let numErrors = 0;
      for (const file of photoFiles) {
        const fileName = `${invite.token}_${Date.now()}_${file.name}`;
        const { error } = await supabase.storage
          .from("uploads")
          .upload(fileName, file);
        if (error) {
          anyErrors = true;
          numErrors = numErrors + 1;
          console.log("Upload error:", error);
        }
      }
      if(numErrors > 1) {
        alert("Upload completed with " + numErrors + " failures");
      } else {
        alert("Upload complete!");
      }
      setPhotoFiles([]);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    setPhotoFiles(Array.from(event.target.files)); // store all selected files
  };

  return (
    <div className="mt-6 w-full bg-lightbrown p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 animate-fadeIn bg-opacity-60">
      <h3 className="text-xl font-semibold mb-2">Share your memories to the gallery</h3>
      <input
        name="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
        multiple
      />
      {/* Preview of selected images */}
      {photoFiles.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {photoFiles.map((file, idx) => (
            <div key={idx} className="w-24 h-24 overflow-hidden rounded">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`btn btn-copper ${!uploading && "btn-hover-scale"}`}
      >
        {uploading ? "Uploading…" : "Upload"}
      </button>
    </div>
  );
}

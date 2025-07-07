// src/components/CreatePost.jsx
import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    fileInputRef.current.value = "";
  };

  const handlePost = () => {
    // Submit logic here
    console.log("Post content:", text);
    console.log("Attached image:", fileInputRef.current.files[0]);
    setText("");
    handleRemoveImage();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex items-start gap-3">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1">
          <textarea
            rows="2"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white rounded-md p-3 resize-none focus:outline-none"
          />

          {/* Image Preview */}
          {image && (
            <div className="relative mt-3">
              <img
                src={image}
                alt="Preview"
                className="w-full max-h-80 rounded-lg object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black bg-opacity-50 p-1 rounded-full text-white"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center mt-3">
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ImagePlus size={18} /> Add Image
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />

            <button
              onClick={handlePost}
              disabled={!text && !image}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/components/Feed.jsx
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Image,
  Video,
  Smile,
} from "lucide-react";
import { posts, users } from "../data/dummyData";
import { useState } from "react";

export default function Feed() {
  const [postContent, setPostContent] = useState("");

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Create Post Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://i.pravatar.cc/150?img=1" // Current user's avatar
            alt="Your profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
          <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md">
            <Image size={18} />
            <span>Photo</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md">
            <Video size={18} />
            <span>Video</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md">
            <Smile size={18} />
            <span>Feeling</span>
          </button>
        </div>
      </div>

      {/* Scrollable Feed */}
      <div className="flex flex-col gap-6 pb-4 overflow-y-auto">
        {posts.map((post) => {
          const user = users.find((u) => u.id === post.userId);

          return (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.name}
                      {user.isVerified && (
                        <span className="ml-1 text-blue-500">✓</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {post.timestamp} · {post.location}
                    </p>
                  </div>
                </div>
                <MoreHorizontal className="text-gray-500" />
              </div>

              {/* Content */}
              <div className="mt-4 text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                {post.content}
              </div>

              {/* Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="mt-4 rounded-lg w-full max-h-96 object-cover"
                />
              )}

              {/* Actions */}
              <div className="flex justify-between items-center mt-4 text-gray-500 dark:text-gray-400">
                <button className="flex items-center gap-1 hover:text-pink-500">
                  <Heart size={18} /> <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500">
                  <MessageCircle size={18} /> <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-green-500">
                  <Share2 size={18} /> <span>{post.shares}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// src/components/ProfileCard.jsx
import { MapPin, Briefcase, Calendar } from "lucide-react";

export default function ProfileCard({ user, darkMode }) {
  const cardBg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const textMain = darkMode ? "text-white" : "text-gray-900";
  const textSub = darkMode ? "text-gray-400" : "text-gray-600";
  const border = darkMode ? "border-gray-700" : "border-gray-300";

  const avatar = user.avatar || "https://i.pravatar.cc/150?img=1";
  const name = user.name || "Alex Johnson";
  const location = user.location || "New York, USA";
  const profession = user.profession || "Software Engineer";
  const dob = user.dob || "March 10, 1995";
  const age = user.age || 29;
  const posts = user.posts || 34;
  const friends = user.friends || 9;

  return (
    <div
      className={`relative rounded-xl shadow-sm pt-20 px-6 pb-6 mb-6 ${cardBg} border ${border} text-center z-0`}
    >
      {/* Profile Image (overlaps card, but not navbar) */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <img
          src={avatar}
          alt={name}
          className="w-24 h-24 object-cover rounded-lg border-4 border-blue-500"
        />
      </div>

      {/* Name & Title */}
      <h2 className={`text-xl font-bold ${textMain}`}>{name}</h2>
      <p className={`text-sm mb-1 ${textSub}`}>{profession}</p>

      {/* Details with Icons */}
      <div className="mt-3 space-y-2 text-sm text-left">
        <div className="flex items-center gap-2 justify-center">
          <Briefcase size={16} className="text-green-500" />
          <span className={textSub}>Works at Acme Inc.</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <MapPin size={16} className="text-blue-500" />
          <span className={textSub}>Lives in {location}</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <Calendar size={16} className="text-red-500" />
          <span className={textSub}>
            Born on {dob} ({age} years)
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around mt-5 text-sm border-t pt-3 border-gray-300 dark:border-gray-600">
        <div>
          <p className={`font-bold ${textMain}`}>{posts}</p>
          <p className={`text-xs ${textSub}`}>Posts</p>
        </div>
        <div>
          <p className={`font-bold ${textMain}`}>{friends}</p>
          <p className={`text-xs ${textSub}`}>Friends</p>
        </div>
      </div>
    </div>
  );
}

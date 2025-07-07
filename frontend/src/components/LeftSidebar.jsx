// src/components/LeftSidebar.jsx
import { users } from "../data/dummyData";
import ProfileCard from "./ProfileCard";
import FriendsCard from "./FriendsCard";

export default function LeftSidebar({ darkMode }) {
  const user = users[0];
  const friends = users.slice(1, 10); // top 9 friends

  return (
    <div
      className={`p-4 h-full overflow-y-auto ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <ProfileCard user={user} darkMode={darkMode} />
      <FriendsCard friends={friends} darkMode={darkMode} />
    </div>
  );
}

// src/components/RightSidebar.jsx
import ActivityCard from "./ActivityCard";
import ChatCard from "./ChatCard";
import { users } from "../data/dummyData";

export default function RightSidebar({ darkMode }) {
  const activities = [
    { user: users[1], action: "liked your post", time: "5 min ago" },
    { user: users[2], action: "commented on your photo", time: "12 min ago" },
    { user: users[3], action: "shared your story", time: "1 hr ago" },
  ];

  const onlineFriends = users.filter((u) => u.isOnline).slice(0, 5);
  const recentChats = users.slice(3, 6);

  return (
    <div
      className={`p-4 h-full overflow-y-auto ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <ActivityCard activities={activities} darkMode={darkMode} />
      <ChatCard
        onlineFriends={onlineFriends}
        recentChats={recentChats}
        darkMode={darkMode}
      />
    </div>
  );
}

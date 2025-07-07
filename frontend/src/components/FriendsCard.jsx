// src/components/FriendsCard.jsx
export default function FriendsCard({ friends, darkMode }) {
  const cardBg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const textMain = darkMode ? "text-white" : "text-gray-900";
  const border = darkMode ? "border-gray-700" : "border-gray-300";

  return (
    <div className={`rounded-xl shadow-sm p-4 ${cardBg} border ${border}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className={`font-semibold text-sm ${textMain}`}>Friends</h3>
        <button
          className={`text-xs ${darkMode ? "text-blue-400" : "text-blue-500"}`}
        >
          See all
        </button>
      </div>
      <div className="grid grid-cols-3 gap-x-3 gap-y-4">
        {friends.map((friend) => (
          <div key={friend.id} className="text-center">
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-14 h-14 rounded-lg object-cover mx-auto mb-1"
            />
            <p className={`text-xs font-medium truncate ${textMain}`}>
              {friend.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// src/components/ChatCard.jsx
export default function ChatCard({ onlineFriends, recentChats, darkMode }) {
  const bg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const textMain = darkMode ? "text-white" : "text-gray-900";
  const textSub = darkMode ? "text-gray-400" : "text-gray-600";
  const border = darkMode ? "border-gray-700" : "border-gray-300";

  return (
    <div>
      <div className={`rounded-xl shadow-sm p-4 border ${border} ${bg}`}>
        {/* Online Friends */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className={`font-semibold ${textMain}`}>Online Friends</h3>
            <button className={`text-sm text-blue-500`}>See All</button>
          </div>
          <div className="space-y-3">
            {onlineFriends.map((f) => (
              <div key={f.id} className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border ${
                      darkMode ? "border-gray-800" : "border-white"
                    }`}
                  ></div>
                </div>
                <div>
                  <p className={`font-medium ${textMain}`}>{f.name}</p>
                  <p className={`text-xs ${textSub}`}>Online now</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={` mt-5 rounded-xl shadow-sm p-4 border ${border} ${bg}`}>
        <h3 className={`font-semibold mb-3 ${textMain}`}>Recent Chats</h3>
        <div className="space-y-3">
          {recentChats.map((chat) => (
            <div key={chat.id} className="flex items-center gap-3">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className={`font-medium ${textMain}`}>{chat.name}</p>
                <p className={`text-xs ${textSub}`}>
                  {chat.isOnline ? "Online" : "Last seen today"}
                </p>
              </div>
              <button className="ml-auto text-lg">💬</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

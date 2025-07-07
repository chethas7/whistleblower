// src/components/ActivityCard.jsx
export default function ActivityCard({ activities, darkMode }) {
  const bg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const textMain = darkMode ? "text-white" : "text-gray-900";
  const textSub = darkMode ? "text-gray-400" : "text-gray-600";
  const border = darkMode ? "border-gray-700" : "border-gray-300";

  return (
    <div className={`rounded-xl shadow-sm p-4 mb-6 border ${border} ${bg}`}>
      <h3 className={`font-semibold mb-4 ${textMain}`}>Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((a, index) => (
          <div key={index} className="flex items-start gap-3">
            <img
              src={a.user.avatar}
              alt={a.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className={`text-sm ${textMain}`}>
                <span className="font-medium">{a.user.name}</span> {a.action}
              </p>
              <p className={`text-xs ${textSub}`}>{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

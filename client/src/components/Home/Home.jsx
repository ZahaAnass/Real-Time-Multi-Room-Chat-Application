import { useState } from "react";
import { FaMusic, FaGamepad, FaLaptopCode } from "react-icons/fa";

export default function ChatRooms() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Gaming", "Tech", "Music", "Movies", "Sports", "Travel"];

  const rooms = [
    {
      id: 1,
      category: "Gaming",
      name: "League of Legends",
      image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee",
      members: 1200,
      online: 25,
      trending: true,
    },
    {
      id: 2,
      category: "Gaming",
      name: "Fortnite",
      image: "https://images.unsplash.com/photo-1606813902915-df6f0b44c98d",
      members: 987,
      online: 18,
    },
    {
      id: 3,
      category: "Tech",
      name: "AI & Machine Learning",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      members: 2100,
      online: 150,
      trending: true,
    },
    {
      id: 4,
      category: "Tech",
      name: "Web Development",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      members: 1800,
      online: 112,
    },
    {
      id: 5,
      category: "Music",
      name: "Pop Music",
      image: "https://images.unsplash.com/photo-1511376777868-611b54f68947",
      members: 3200,
      online: 210,
    },
    {
      id: 6,
      category: "Music",
      name: "Hip Hop",
      image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
      members: 2500,
      online: 180,
    },
  ];

  const filteredRooms =
    activeTab === "All" ? rooms : rooms.filter((r) => r.category === activeTab);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chat Rooms</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search rooms..."
            className="px-3 py-2 bg-[#1E293B] rounded-md focus:outline-none text-sm"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            + Create Room
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/10 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`pb-2 text-sm ${
              activeTab === cat
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Room Categories */}
      <div className="space-y-10">
        {["Gaming", "Tech", "Music"].map((section) => {
          const sectionRooms = filteredRooms.filter(
            (room) => room.category === section
          );
          if (sectionRooms.length === 0) return null;

          const icon =
            section === "Gaming"
              ? <FaGamepad className="text-blue-400" />
              : section === "Tech"
              ? <FaLaptopCode className="text-blue-400" />
              : <FaMusic className="text-blue-400" />;

          return (
            <div key={section}>
              <div className="flex items-center gap-2 mb-4">
                {icon}
                <h2 className="text-xl font-semibold">{section}</h2>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
                {sectionRooms.map((room) => (
                  <div
                    key={room.id}
                    className="relative rounded-xl overflow-hidden bg-[#1E293B] hover:scale-[1.02] transition transform duration-200 cursor-pointer"
                  >
                    <img
                      src={room.image}
                      alt={room.name}
                      className="h-40 w-full object-cover"
                    />
                    {room.trending && (
                      <span className="absolute top-3 right-3 bg-red-500 text-xs px-2 py-1 rounded-full">
                        Trending
                      </span>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{room.name}</h3>
                      <div className="flex items-center text-sm text-gray-400 mt-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        {room.online} online · {room.members} members
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

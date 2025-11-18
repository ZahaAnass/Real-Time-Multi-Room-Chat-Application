import { FaRegFile, FaRegFolderOpen } from "react-icons/fa6";
import { BiMessageAltDetail } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { PiGearBold } from "react-icons/pi";
import { HiHashtag } from "react-icons/hi";
import ProfileItem from "./ProfileItem";
import ToggleOption from "./ToggleOption";
export default function Settings() {
  const Menu = [
    { id: 1, link: "#", icon: <PiGearBold />, title: "Preferences" },
    { id: 2, link: "#", icon: <IoHomeOutline />, title: "Home" },
    { id: 3, link: "#", icon: <HiHashtag />, title: "Threads" },
    { id: 4, link: "#", icon: <BiMessageAltDetail />, title: "Mentions & reactions" },
    { id: 5, link: "#", icon: <FaRegFile />, title: "Drafts" },
    { id: 6, link: "#", icon: <MdOutlineAlternateEmail />, title: "All DMs" },
    { id: 7, link: "#", icon: <FaRegFolderOpen />, title: "Files" },
  ];

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <div className="w-64 border-r border-gray-700 p-4">
        <div
        className="flex relative pb-2">
          <div
          className="w-10 h-10 bg-gray-800 rounded-full">
            <img src="" alt="" />
          </div>
          <h1 className="text-xl font-bold mb-6 absolute left-13 top-1">ChatApp</h1>
        </div>
        <ul className="flex flex-col gap-3">
          {Menu.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
                item.id === 1
                  ? "bg-blue-900/50 text-blue-400"
                  : "hover:bg-gray-800"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-base">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Preferences</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Profile</h2>
          <hr className="border-gray-700 mb-4" />
          <div className="space-y-4">
            <ProfileItem label="Username" value="Ethan Harper" />
            <ProfileItem label="Email" value="ethan.harper@email.com" />
            <ProfileItem label="Bio" value="Software Engineer at Acme Co" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
              Upload Image
            </button>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Status</h2>
          <hr className="border-gray-700 mb-4" />
          <div className="flex gap-4">
            {["Online", "Away", "Busy", "Offline"].map((status, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-md border border-gray-700 ${
                  status === "Online"
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-10">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Appearance</h2>
            <hr className="border-gray-700 mb-4" />
            <ToggleOption label="Dark Mode" defaultOn />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
            <hr className="border-gray-700 mb-4" />
            <ToggleOption label="Enable Notifications" defaultOn />
          </section>
        </div>

        <div className="grid grid-cols-2 gap-10 mt-10">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Privacy</h2>
            <hr className="border-gray-700 mb-4" />
            <ToggleOption label="Private Profile" />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Account</h2>
            <hr className="border-gray-700 mb-4" />
            <button className="text-red-500 hover:text-red-400 border border-red-500 px-4 py-2 rounded-md">
              Sign Out
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}






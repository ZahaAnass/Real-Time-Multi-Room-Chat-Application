import { FaPhoneSlash ,FaRegCircleStop ,FaSearchengin } from "react-icons/fa6";

export default function RoomManagement(){
    const Menu = [
        {
            id:1,
            name:"Sophie Clark",
            clic:"Klick",
        },
        {
            id:2,
            name:"Ethan Bennett",
            clic:"Klick",
        },
        {
            id:3,
            name:"Olivia Carter",
            clic:"Klick",
        },
    ]
    return(
        <div
        className="flex flex-col justify-center items-center h-[90vh]">
            {/* */}
            <div
            className="flex md:gap-60 sm:gap-5">
                <div>
                    <h1
                    className="text-white font-bold text-4xl">Room Management</h1>
                    <p 
                    className="text-white/60 font-bold">Manage members and control chat flow</p>
                </div>
                <div
                className="flex gap-2">
                    <button
                    className="flex items-center gap-1 bg-red-500/20 text-red-400 rounded-[10px] px-3 ">
                        <i 
                        className="text-xl "><FaPhoneSlash/></i>
                        <p 
                        className="text-xl font-bold ">End Chat</p>
                    </button>
                    <button
                    className="flex items-center gap-1 bg-amber-500/20 text-amber-400 rounded-[10px] px-3">
                        <i
                        className="text-xl"><FaRegCircleStop/></i>
                        <p
                        className="text-xl font-bold">Pause Chat</p>
                    </button>
                </div>
            </div>
            {/**/}
            <div
            className="border-2 border-white/60 p-3 mt-6 rounded-[10px]">
                {/* */}
                <div
                className="flex md:gap-122  sm:gap-69">
                    <h1
                    className="font-bold text-xl text-white">Memnbers(5)</h1>
                    <div
                    className="flex items-center gap-2 border-2 border-white/60 p-1 rounded-[10px]">
                        <i 
                        className="text-xl text-white/60"><FaSearchengin/></i>
                        <input type="search" placeholder="Search members..."
                        className="text-white/60 focus:outline-none"/>
                    </div>
                </div>
                {/* */}
                <div
                className="flex md:gap-168 sm:gap-115 mt-2 text-xl">
                    <h1 
                    className="text-white/60">MEMBER</h1>
                    <h1 
                    className="text-white/60">ACTIONS</h1>
                </div>
                {/* */}
                <div
                className="mt-2 space-y-4">
                    {
                        Menu.map((data)=>(
                            <div
                            key={data.id}
                            className={`${data.id === 2 ? "md:gap-155 sm:gap-102":"md:gap-158 sm:gap-105"} flex `}>
                                <div
                                className="flex items-center gap-2 font-bold text-white">
                                    <img src="#" alt="" 
                                    className="w-10 h-10 bg-gray-800 rounded-full"/>
                                    <p>{data.name}</p>
                                </div>
                                <button
                                className="font-bold text-red-400 bg-red-500/20 px-3 rounded-[10px]">
                                    {data.clic}
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
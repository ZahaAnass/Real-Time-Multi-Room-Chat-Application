import Navbar from "../Navbar/Navbar";
import { MdOutlineNotifications } from "react-icons/md";
export default function Room(){
    const Menu = [
        {
            id:0,
            title:"Home",
            link:"",
        },
        {
            id:1,
            title:"Rooms",
            link:"",
        },
        {
            id:2,
            title:"Profile",
            link:"",
        },
    ]
    return(
        <div>
            <div
            className="flex items-center">
                <Navbar showLine={false} fontline={false}/>
                <div
                className="flex items-center gap-7 px-3">
                    <ul
                    className="sm:flex gap-3 font-bold hidden">
                        {
                            Menu.map((data)=>(
                                <li key={data.id} 
                                className={`${data.id == 1 ? "text-white":"text-white/60 hover:text-white"} `}>
                                    <a href={data.link}>{data.title}</a>
                                </li>
                            ))
                        }
                    </ul>
                    
                    <div
                    className="flex items-center gap-2">
                        <i
                        className="text-2xl text-white/60"><MdOutlineNotifications /></i>
                        <div
                        className="w-10 h-10 bg-gray-800 rounded-full">
                            <img src="" alt="" 
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
            <div
            className="flex flex-col justify-center items-center h-[80vh]">
                <div
                className="flex flex-col items-center gap-3 bg-gray-700 px-2 py-8 rounded-[5px]">
                    <h1
                    className="font-bold text-4xl text-white w-[80%] text-center">Join Room: #desing-<span>critique</span></h1>
                    <p
                    className="text-white/60 font-bold w-[80%] text-center">Share your work and get feetdback from the <span>community</span></p>
                    <button
                    className="bg-blue-500 text-white font-bold py-1 px-30 rounded-[5px]">
                        Request to Join
                    </button>
                </div>
                <div
                className="flex gap-1 mt-4">
                    <p className="text-gray-500 font-bold">Already a member?</p>
                    <a href="#" className="text-blue-600 font-bold">Log in</a>
                </div>
            </div>
        </div>
    );
}
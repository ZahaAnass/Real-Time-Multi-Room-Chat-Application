import { BsFillChatLeftTextFill } from "react-icons/bs";

export default function Navbar({ showLine = true,fontline = true }){
    return(
        <header className="flex flex-col justify-center h-[10vh]  gap-1 w-full">
            <div className={`${fontline ? "text-2xl":"text-4xl"} flex items-center font-bold text-white gap-3 px-5`}>
                <i className="text-blue-600"><BsFillChatLeftTextFill /></i>
                <h1>ChatApp</h1>
            </div>
            
            {showLine && <hr className="text-white/60 w-full mt-2" />}
        </header>
    );
}

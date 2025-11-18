export default function PendingRequests(){
    const Menu = [
        {
            id:1,
            name:"Sophia Clark",
            namebtn:"Approve",
            namebtn2:"Reject",
        },
        {
            id:2,
            name:"Sophia Clark",
            namebtn:"Approve",
            namebtn2:"Reject",
        },
        {
            id:3,
            name:"Sophia Clark",
            namebtn:"Approve",
            namebtn2:"Reject",
        },
        {
            id:4,
            name:"Sophia Clark",
            namebtn:"Approve",
            namebtn2:"Reject",
        },
    ]
    return(
        <div
        className="flex flex-col justify-center items-center">
            <div
            className="-translate-x-62">
                <h1
                className="font-bold text-4xl text-white">Pending Join Requests</h1>
                <p className="text-white/60 font-bold">Approve or reject requests from users to join chat rooms</p>
            </div>
            <div
            className="border border-white/60 rounded-[10px] mt-8">
                <div
                className="flex gap-[804px] text-white/60 font-bold px-4 py-3">
                    <p>USER</p>
                    <p>ROOM</p>
                </div>
                <hr className="text-white/60"/>
                {Menu.map((data, index) => (
                <div key={data.id}>
                    <div className="flex items-center justify-between px-4 py-3">
                    <p className="text-white font-semibold">{data.name}</p>
                    <div className="flex gap-3">
                        <button className="font-bold bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-[5px]">
                        {data.namebtn}
                        </button>
                        <button className="font-bold bg-gray-700 hover:bg-gray-500  text-white px-3 py-1 rounded-[5px]">
                        {data.namebtn2}
                        </button>
                    </div>
                    </div>
                    {index !== Menu.length - 1 && (
                    <hr className="text-white/60" />
                    )}
                </div>
                ))}
            </div>
        </div>
    );
}
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
export default function Login(){
    const [Myform,SetForm] = useState({
        emil:"",
        password:"",
    })
    return(
        <div>
            <Navbar showLine={false}></Navbar>
            <div
            className="flex flex-col justify-center items-center h-[90vh] gap-14 -mt-8">
                <h1
                className="font-bold text-4xl text-white">Welcome back</h1>

                <form action="#"
                onSubmit={(event)=>{
                    event.preventDefault();
                    SetForm({
                        emil:"",
                        password:"",
                    })
                }}
                className="border border-white/60 p-10 rounded-[10px]
                flex flex-col gap-4">

                    <div
                    className="flex flex-col">
                        <label htmlFor="#"
                        className="text-white/60">Eamil address</label>
                        <input type="email" 
                        value={Myform.emil}
                        onChange={(event)=>{
                            SetForm({...Myform,emil:event.target.value});
                        }  
                        }
                        className="bg-gray-500 border border-gray-600 rounded-[5px] px-16 py-1 text-white focus:border-gray-600"/>
                    </div>

                    <div
                    className="flex flex-col">
                        <label htmlFor="#"
                        className="text-white/60">Password</label>
                        <input type="password" 
                        value={Myform.password}
                        onChange={(event)=>{
                            SetForm({...Myform,password:event.target.value});
                        }  
                        }
                        className="bg-gray-500 border border-gray-600 rounded-[5px] px-16 py-1 text-white"/>
                    </div>
                    
                    <button
                    type="submit"
                    className="flex justify-center bg-blue-600 py-1 rounded-[5px] text-white font-bold">
                        Login
                    </button>
                    
                    <div
                    className="flex justify-center gap-1">
                        <p className="text-white/60">Don't have an account?</p>
                        <a href="#"className="text-blue-500">Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
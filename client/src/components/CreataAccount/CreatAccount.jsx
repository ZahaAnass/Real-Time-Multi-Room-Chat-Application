import { useState } from "react";
import Navbar from "../Navbar/Navbar";
export default function Register() {
  const colors = ["#3b82f6", "#22c55e", "#ef4444", "#f59e0b", "#8b5cf6", "#374151"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div>
      <Navbar showLine={false} fontline={true}></Navbar>
      <div className="min-h-screen  flex flex-col items-center justify-center text-white -mt-9">
     
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-gray-400">
            Join the conversation and start chatting in real-time.
          </p>
        </div>

      
        <form
          action="#"
          className="w-full max-w-sm flex flex-col gap-4 bg-transparent"
        >
        
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-white text-black p-3 rounded-md outline-none"
          />

          
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-white text-black p-3 rounded-md outline-none"
          />

          
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white text-black p-3 rounded-md outline-none"
          />

          
          <textarea
            placeholder="Bio (max 150 chars)"
            maxLength={150}
            className="w-full bg-white text-black p-3 rounded-md outline-none resize-none h-24"
          ></textarea>

        
          <div className="mt-2">
            <p className="text-sm text-gray-300 mb-2">
              Choose your avatar color
            </p>
            <div className="flex gap-3">
              {colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? "border-white scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

        
          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition-all"
          >
            Register
          </button>

          
          <p className="text-center text-sm text-gray-400 mt-3">
            Already have an account?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
      </div>
  );
}

export default function NewRoom() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create a New Chat Room</h1>
        <p className="text-gray-400">
          Fill in the details below to start a new conversation.
        </p>
      </div>

      <form
        action="#"
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-5"
      >

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Room Name
          </label>
          <input
            type="text"
            placeholder="e.g., #general"
            className="bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            placeholder="A brief description of the room's purpose."
            className="bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 placeholder-gray-500 h-28 resize-none focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">Category</label>
          <select
            className="bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:outline-none focus:border-blue-500"
          >
            <option value="">General</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-medium py-3 rounded-md"
        >
          Create Room
        </button>
      </form>
    </div>
  );
}

export default function ProfileItem({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
      <button className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">
        Edit
      </button>
    </div>
  );
}
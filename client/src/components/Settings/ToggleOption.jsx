export default function ToggleOption({ label, defaultOn = false }) {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
      <p>{label}</p>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          defaultChecked={defaultOn}
        />
        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
      </label>
    </div>
  );
}
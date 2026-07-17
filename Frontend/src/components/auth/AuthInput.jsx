function AuthInput({ name, type, msg, value, setValue }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {name}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={msg}
        className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none transition-all focus:border-myGreenMD focus:bg-white focus:ring-1 focus:ring-myGreenMD/30 text-gray-900 placeholder-gray-400"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default AuthInput;

function AuthInput({ name, type, msg, value, setValue }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>
        {name}
        <span className="text-[8px] text-red-500 align-super">★</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={msg}
        className="outline-none p-3 bg-white/15 rounded-md"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default AuthInput;

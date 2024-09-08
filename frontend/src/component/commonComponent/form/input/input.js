const CustomInput = ({
  handleChange = () => {},
  data = {},
  type = "text",
  label = "customInput",
  placeHolder = "placeHolder",
  name = "name",
  reference = null,
  valid = false,
  errorMessage = true,
}) => {
  return (
    <div className="flex flex-col gap-1 px-2 my-2 w-[300px]">
      <label htmlFor={name} className="flex items-center gap-4 text-sm">
        {label}
        <span className={!valid ? "hidden" : ""}>
          <svg
            className="block size-5 fill-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg>
        </span>
        <span className={valid || !data[name] ? "hidden" : ""}>
          <svg
            className="block size-5 fill-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </span>
      </label>
      <input
        ref={reference}
        className="px-2 text-base tracking-wider duration-100 border-b outline-none focus:border-b-blue-500"
        type={type}
        value={data[name]}
        name={name}
        id={name}
        onChange={handleChange}
        placeholder={placeHolder}
      />
      {errorMessage && (
        <p
          className={`${
            !valid && data[name] ? "block" : "hidden"
          } bg-red-700 p-2 rounded text-white my-2 flex break-words`}
        >
          {name === "password"
            ? "8 to 24 characters. Must includes upperCase and lowercase letters , a number and a special character. Allowed special character: !@#$%"
            : name === "name"
            ? "name should be greater then 3 letters"
            : "Must match the above password"}
        </p>
      )}
    </div>
  );
};
export default CustomInput;

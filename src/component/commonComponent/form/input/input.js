const CustomInput = ({
  handleChange = () => {},
  data = {},
  type = "text",
  label = "customInput",
  placeHolder = "placeHolder",
  name = "name",
}) => {
  return (
    <div className="flex  flex-col gap-1  px-2 my-2">
      <label className="text-sm capitalize">{label}</label>
      <input
        className="border-b outline-none text-base px-2 tracking-wider focus:border-b-blue-500 duration-100"
        type={type}
        value={data[name]}
        name={name}
        onChange={handleChange}
        placeholder={placeHolder}
      />
    </div>
  );
};
export default CustomInput;

const CustomButton = ({ handleSubmit, title = "button" }) => {
  return (
    <button
      className="text-base border rounded px-2 py-1 my-2 capitalize"
      type="submit"
    >
      {title}
    </button>
  );
};
export default CustomButton;

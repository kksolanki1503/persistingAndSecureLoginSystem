const CustomButton = ({ handleSubmit, title = "button" }) => {
  return (
    <button
      className="px-2 py-1 my-2 text-base capitalize border rounded"
      type="submit"
    >
      {title }
      {'jai'}
    </button>
  );
};
export default CustomButton;

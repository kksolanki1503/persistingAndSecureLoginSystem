import "./checkbox.css";
const CheckBox = ({ handleCheckBox, value, title }) => {
  return (
    <div class="checkbox-wrapper-1 ">
      <input
        id="example-1"
        class="substituted"
        type="checkbox"
        aria-hidden="true"
        checked={value}
        onChange={handleCheckBox}
      />
      <label for="example-1">{title}</label>
    </div>
  );
};
export default CheckBox;

import { FaCheck } from "react-icons/fa";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  function getClassName() {
    let className = "cursor-pointer w-6 h-6 flex items-center justify-center";
    if (checked) {
      className += "border border-2 border-blue-500 bg-blue-500";
    } else {
      className += "border border-2 hover:border-blue-500";
    }

    return className;
  }

  return (
    <div className={getClassName()} onClick={onChange}>
      <FaCheck size={16} color="#fff" />
    </div>
  );
};

export default Checkbox;
